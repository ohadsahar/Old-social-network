import { User } from './../../../shared/models/User.model';
import { UserService } from './../../services/user.service';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/actions/ui.actions';
import { ResponseMessagesService } from '../../services/error.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { map } from 'rxjs/operators';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-wall-page',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WallPageComponent implements OnInit {
  private publicKey = '&apikey=a57f69f228215bfef20b25c7ecb346ad';
  private privateKey = 'b095ec6c9017d874504c0935ad9444f60f5245aa';
  private hash = '&hash=6a5f930fec8cace1076af08658de6d76';
  private comicsUrl = 'http://gateway.marvel.com/v1/public/comics?ts=1';
  private urlComics = `${this.comicsUrl}&dateRange=2019-01-01%2C%202019-05-04${
    this.publicKey
  }${this.hash}`;

  private id: string;
  private counter: number;
  public editAble: boolean;
  public hide: boolean;
  public profileAble$: Observable<boolean>;
  public wallAble$: Observable<boolean>;
  public wallAble: boolean;

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
    this.http.get<{ data: any }>(this.urlComics).subscribe((response) => {
      this.MarvelCollection = response.data.results;
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
        this.userService.GetConnectedUser(this.id).subscribe((responseConnected) => {
            this.UserConnected = responseConnected.UserObject;
            if (responseConnected.UserObject.loggedin as any === 'true')  {
              this.router.navigate(['Wall/' + this.id]);
              } else {
                this.router.navigate(['']);
              }
            this.spinnerService.hide();
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new UI.HideTheWall());
            this.profileAble$ = this.store.pipe(map(data => {
              return data.wallRed.profileAble;
            }));
          },
          (error) => {
            this.responseMessageService.FailureMessage(error, 'Sorry');
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

      this.spinnerService.show();
      this.store.dispatch(new UI.StartLoading());
      this.userService.UpdateUser(this.UserConnected, this.id).subscribe(response => {
        this.UserConnected = response.UserObject;
        this.store.dispatch(new UI.StopLoading());
        this.spinnerService.hide();
      });
    }
  }

  Edit() {

    this.counter += 1;
    if (this.counter === 1) {
      this.editAble = true;
    } else {
      this.counter = 0;
      this.editAble = false;
    }
  }

  ShowProfile() {

    this.store.dispatch(new UI.HideTheWall());
    this.profileAble$ = this.store.pipe(map(data => {
      return data.wallRed.profileAble;
    }));
    this.wallAble$ = this.store.pipe(map(data => {
      return data.wallRed.wallAble;
    }));
  }

  ShowWall() {

    this.store.dispatch(new UI.ShowTheWall());
    this.profileAble$ = this.store.pipe(map(data => {
      return data.wallRed.profileAble;
    }));
    this.wallAble$ = this.store.pipe(map(data => {
      return data.wallRed.wallAble;
    }));
  }

  Disconnect() {

    this.spinnerService.show();
    this.store.dispatch(new UI.StartLoading());
    this.userService.UpdateLoggedIn(this.id, false).subscribe(() => {
      this.router.navigate(['']);
      this.store.dispatch(new UI.StopLoading());
      this.spinnerService.hide();
    },
    (error) => {
      this.responseMessageService.FailureMessage(error, 'Sorry');
    });
  }
}
