import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../../app.reducer';
import { ResponseMessagesService } from '../../../core/services/error.service';
import * as UI from '../../actions/ui.actions';
import { UserLogin } from '../../models/UserLogin.model';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialoglogin.component.html',
  styleUrls: ['./dialoglogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogLoginComponent {
  public token: string;
  public hide: boolean;
  public Connected: boolean;
  public isLoading$: Observable<boolean>;
  public profileAble$: Observable<boolean>;
  public wallAble$: Observable<boolean>;
  public editAble$: Observable<boolean>;
  public id: string;
  private authListenerSub: Subscription;
  private userAuthorized: boolean;
  public data: UserLogin;

  constructor(private authService: AuthService, private router: Router,
              private responseMessageService: ResponseMessagesService,
              private store: Store<fromRoot.State>, private spinnerService: Ng4LoadingSpinnerService) {
    this.hide = true;
    this.Connected = false;
  }

  DoneLogin(form: NgForm) {
    this.data = {email: form.value.email, password: form.value.password};
    if (form.invalid) {return; } else {
      this.Connected = true;
      this.Loading();
      this.authService.login(form.value);
    }
  }

  Loading() {
    this.spinnerService.show();
    this.store.dispatch(new UI.StartLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  getToken() {
    return this.token;
  }
}
