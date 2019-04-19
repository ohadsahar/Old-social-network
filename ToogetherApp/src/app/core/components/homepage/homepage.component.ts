import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogLoginComponent } from 'src/app/shared/components/DialogLogin/dialoglogin.component';
import { DialogSignUpComponent } from 'src/app/shared/components/DialogSignup/dialogsignup.component';

@Component({

    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css'],
    encapsulation: ViewEncapsulation.None,
})

export class HomePageComponent  {

  constructor(public dialog: MatDialog) {}


  SignUp() {

    this.dialog.open(DialogSignUpComponent);
  }

  Login() {

    this.dialog.open(DialogLoginComponent);
  }
}


