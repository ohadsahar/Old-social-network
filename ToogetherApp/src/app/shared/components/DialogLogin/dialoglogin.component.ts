import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../app.reducer';
import { ResponseMessagesService } from '../../../core/services/error.service';
import * as UI from '../../actions/ui.actions';
import { UserService } from './../../../core/services/user.service';
import { UserLogin } from '../../models/UserLogin.model';


@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialoglogin.component.html',
  styleUrls: ['./dialoglogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogLoginComponent {
  public hide: boolean;
  public Connected: boolean;
  public isLoading$: Observable<boolean>;
  public profileAble$: Observable<boolean>;
  public wallAble$: Observable<boolean>;
  public editAble$: Observable<boolean>;
  public id: string;
  public data: UserLogin;

  constructor(private userService: UserService, private router: Router,
              private responseMessageService: ResponseMessagesService,
              private store: Store<fromRoot.State>, private spinnerService: Ng4LoadingSpinnerService) {
    this.hide = true;
    this.Connected = false;
  }

  DoneLogin(form: NgForm) {
    this.data = {email: form.value.email, password: form.value.password};
    if (form.invalid) {
      return;
    } else {
      this.Connected = true;
      this.Loading();
      this.userService.LoginUser(form.value).subscribe(
        (response) => {
          if (response.userData.token) {
            this.id = response.userData.id;
            this.userService
              .UpdateLoggedIn(response.userData.id, true)
              .subscribe(responseUpdate => {
                if (responseUpdate) {
                  this.Connected = true;
                  this.responseMessageService.SuccessMessage('You have successfully logged in', 'yay');
                  this.router.navigate(['Wall/' + this.id]);
                }
              });
          } else {
            this.responseMessageService.FailureMessage('This user is not authorized in our system', 'Sorry');
          }
        },
        (error) => {
          this.responseMessageService.FailureMessage(error, 'Sorry');
        }
      );
    }
  }

  Loading() {

    this.spinnerService.show();
    this.store.dispatch(new UI.StartLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }



}
