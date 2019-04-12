import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { DialogSignUpComponent } from 'src/app/shared/components/DialogSignup/dialogsignup.component';
import { DialogLoginComponent } from 'src/app/shared/components/DialogLogin/dialoglogin.component';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/actions/ui.actions';
import { Observable } from 'rxjs';


@Component({

    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css'],
    encapsulation: ViewEncapsulation.None,
})

export class HomePageComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(public dialog: MatDialog, private store: Store<fromRoot.State>,
              private spinnerService: Ng4LoadingSpinnerService) {

    this.spinnerService.show();
    this.store.dispatch(new UI.StartLoading());

  }

  ngOnInit() {

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.store.dispatch(new UI.StopLoading());
    this.spinnerService.hide();
  }
  SignUp() {

    this.dialog.open(DialogSignUpComponent);
  }

  Login() {

    this.dialog.open(DialogLoginComponent);
  }
}


