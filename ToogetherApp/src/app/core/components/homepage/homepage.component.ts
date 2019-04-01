import { Component, ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material';
import { DialogSignUpComponent } from 'src/app/shared/components/DialogSignup/dialogsignup.component';


@Component({

    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css'],
    encapsulation: ViewEncapsulation.None,
})

export class HomePageComponent {

  constructor(public dialog: MatDialog) {}




  SignUp() {
    console.log('Hi');
    const dialogRef = this.dialog.open(DialogSignUpComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


