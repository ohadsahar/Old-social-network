import { NgForm } from '@angular/forms';
import { UserService } from './../../../core/services/user.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../actions/ui.actions';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ResponseMessagesService } from '../../../core/services/error.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialoglogin.component.html',
  styleUrls: ['./dialoglogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogLoginComponent {
  public hide: boolean;
  public isLoading$: Observable<boolean>;
  public profileAble$: Observable<boolean>;
  public wallAble$: Observable<boolean>;
  public editAble$: Observable<boolean>;
  public id: string;

  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router,
              private responseMessageService: ResponseMessagesService,
              private store: Store<fromRoot.State>, private spinnerService: Ng4LoadingSpinnerService) {
    this.hide = true;
  }

  DoneLogin(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.spinnerService.show();
      this.store.dispatch(new UI.StartLoading());
      this.isLoading$ = this.store.select(fromRoot.getIsLoading);
      this.editAble$ = this.store.select(fromRoot.getIsEditAble);
      this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
      this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
      this.userService.LoginUser(form.value).subscribe(
        (response) => {
          if (response.token) {
            this.id = response.id;
            this.userService
              .UpdateLoggedIn(response.id, true)
              .subscribe(responseUpdate => {
                if (responseUpdate.success) {
                  this.openSnackBar('You have successfully logged in', '');
                  setTimeout(() => {
                  this.spinnerService.hide();
                  this.store.dispatch(new UI.StopLoading());
                  this.router.navigate(['Wall/' + this.id]);
                  }, 3000);
                }
              });
          }
        },
        (error) => {
          this.responseMessageService.FailureMessage(error, 'Sorry');
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
