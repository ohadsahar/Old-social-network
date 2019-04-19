import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/actions/ui.actions';
import { ResponseMessagesService } from '../../services/error.service';
import { User } from './../../../shared/models/User.model';
import { UserService } from './../../services/user.service';

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
  public imagePreview: string;
  public isLoading$: Observable<boolean>;
  public profileAble$: Observable<boolean>;
  public wallAble$: Observable<boolean>;
  public editAble$: Observable<boolean>;
  imageFormGroup = new FormGroup({
    image: new FormControl(null, { validators: [Validators.required] })
  });

  public MarvelCollection: any[] = [];
  public UserConnected: User;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private responseMessageService: ResponseMessagesService,
    private spinnerService: Ng4LoadingSpinnerService,
    private store: Store<fromRoot.State>,
    private formBuilder: FormBuilder
  ) {
    this.hide = true;
    this.counter = 0;
    this.imageFormGroup = this.formBuilder.group({
      image: ''
    });

  }

  ngOnInit() {
    this.OnWallComponentStart();
  }

  OnWallComponentStart() {

    this.Loading();
    this.DisableWall();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
        this.userService.GetConnectedUser(this.id).subscribe(responseConnected => {
            console.log(responseConnected);
            this.UserConnected = responseConnected.UserObject;
            console.log(this.UserConnected);
            if ((responseConnected.UserObject.loggedin as any) === 'true') {
              this.router.navigate(['Wall/' + this.id]);
            } else {
              this.router.navigate(['']);
            }
            this.StopLoading();
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

      this.Loading();
      this.counter = 0;
      this.userService.UpdateUser(this.UserConnected, this.id).subscribe((response) => {
          this.UserConnected = response.UserObject;
          this.DisableWall();
          this.CancelEdit();
          this.StopLoading();
        },
        (error) => {
          this.StopLoading();
          this.responseMessageService.FailureMessage('Sorry there is a problem right now, try again later', 'Sorry');

        }
      );
    }
  }
  Edit() {
    this.counter += 1;
    if (this.counter === 1) {
      this.EnableEdit();
      this.DisableWall();

    } else {
      this.CancelEdit();
      this.counter = 0;
    }
  }
  Disconnect() {

    this.Loading();
    this.userService.UpdateLoggedIn(this.id, false).subscribe(
      () => {
        this.StopLoading();
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


  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageFormGroup.patchValue({ image: file });
    this.imageFormGroup.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ShowProfile() {

    this.DisableWall();

  }
  ShowWall() {
    this.EnableWall();

  }
  AfterError() {
    this.store.dispatch(new UI.HideTheWall());
    this.store.dispatch(new UI.StopLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
    this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
    this.spinnerService.hide();
  }
  Loading() {


    this.spinnerService.show();
    this.store.dispatch(new UI.StartLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }
  StopLoading() {

    this.spinnerService.hide();
    this.store.dispatch(new UI.StopLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

  }
  EnableEdit() {

    this.store.dispatch(new UI.EditAble());
    this.editAble$ = this.store.select(fromRoot.getIsEditAble);

  }
  CancelEdit() {

    this.store.dispatch(new UI.CancelEdit());
    this.editAble$ = this.store.select(fromRoot.getIsEditAble);
  }
  EnableWall() {

    this.store.dispatch(new UI.ShowTheWall());
    this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
    this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
  }
  DisableWall() {


    this.store.dispatch(new UI.HideTheWall());
    this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
    this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);

  }

}
