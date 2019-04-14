import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './../../../shared/models/User.model';
import { UserService } from './../../services/user.service';
import { ResponseMessagesService } from '../../services/error.service';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/actions/ui.actions';


@Component({
  selector: 'app-wall-page',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WallPageComponent implements OnInit {

  private id: string;
  private counter: number;
  public hide: boolean;
  public isLoading$: Observable<boolean>;
  public profileAble$: Observable<boolean>;
  public wallAble$: Observable<boolean>;
  public editAble$: Observable<boolean>;

  public MarvelCollection: any[] = [];
  public UserConnected: User;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private responseMessageService: ResponseMessagesService,
    private spinnerService: Ng4LoadingSpinnerService,
    private store: Store<fromRoot.State>
  ) {
    this.hide = true;
    this.counter = 0;
  }

  ngOnInit() {

    this.OnWallComponentStart();
  }

  OnWallComponentStart() {

    this.spinnerService.show();
    this.store.dispatch(new UI.StartLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
        this.userService.GetConnectedUser(this.id).subscribe(
          responseConnected => {
            this.UserConnected = responseConnected.UserObject;
            if ((responseConnected.UserObject.loggedin as any) === 'true') {
              this.router.navigate(['Wall/' + this.id]);
            } else {
              this.router.navigate(['']);
            }
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new UI.HideTheWall());
            this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
            this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
            this.isLoading$ = this.store.select(fromRoot.getIsLoading);
            this.spinnerService.hide();
          },
          error => {
            this.responseMessageService.FailureMessage(
              'Yuston we have problem, try again later',
              'Sorry'
            );
            this.AfterError();
          }
        );
      }
    });
  }

  EditUser(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      if (form.value.email) {
        this.UserConnected.email = form.value.email;
      }
      if (form.value.firstname) {
        this.UserConnected.firstname = form.value.firstname;
      }

      if (form.value.lastname) {
        this.UserConnected.lastname = form.value.lastname;
      }

      if (form.value.password) {
        this.UserConnected.password = form.value.password;
      }
      if (form.value.superhero) {
        this.UserConnected.superhero = form.value.superhero;
      }


      this.store.dispatch(new UI.StartLoading());
      this.spinnerService.show();
      this.isLoading$ = this.store.select(fromRoot.getIsLoading);
      this.userService.UpdateUser(this.UserConnected, this.id).subscribe((response) => {
          this.UserConnected = response.UserObject;
          this.store.dispatch(new UI.HideTheWall());
          this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
          this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
          this.store.dispatch(new UI.StopLoading());
          this.isLoading$ = this.store.select(fromRoot.getIsLoading);
          this.spinnerService.hide();
          this.store.dispatch(new UI.CancelEdit());
          this.editAble$ = this.store.select(fromRoot.getIsEditAble);

        },
        (error) => {
          this.responseMessageService.FailureMessage(
            'Yuston we have problem, try again later',
            'Sorry'
          );
          this.AfterError();
        }
      );
    }
  }
  Edit() {
    this.counter += 1;
    if (this.counter === 1) {
      this.store.dispatch(new UI.EditAble());
      this.editAble$ = this.store.select(fromRoot.getIsEditAble);
      this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
    } else {
      this.store.dispatch(new UI.CancelEdit());
      this.editAble$ = this.store.select(fromRoot.getIsEditAble);
      this.counter = 0;
    }
  }

  ShowProfile() {
    this.store.dispatch(new UI.HideTheWall());
    this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
    this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
  }

  ShowWall() {


    this.store.dispatch(new UI.ShowTheWall());
    this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
    this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
  }

  Disconnect() {
    this.spinnerService.show();
    this.store.dispatch(new UI.StartLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.userService.UpdateLoggedIn(this.id, false).subscribe(() => {
        this.store.dispatch(new UI.StopLoading());
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);
        this.spinnerService.hide();
        this.router.navigate(['']);
      },
      error => {
        this.responseMessageService.FailureMessage(
          'Yuston we have problem, try again later',
          'Sorry'
        );
        this.AfterError();
      }
    );
  }

  AfterError() {

    this.store.dispatch(new UI.HideTheWall());
    this.store.dispatch(new UI.StopLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
    this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
    this.spinnerService.hide();
  }
}
