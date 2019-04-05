import { ResultUser } from './../../models/Result-user';
import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/User.model';
import { UserService } from 'src/app/core/services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({

  // tslint:disable-next-line:component-selector
  selector: 'app-dialogSignup',
  templateUrl: './dialogsignup.component.html',
  styleUrls: ['./dialogsignup.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DialogSignUpComponent {

  public hide: boolean;
  public ResultUserObject: ResultUser;
  private UserObject: User;


  constructor(private userService: UserService, private snackBar: MatSnackBar) {

    this.hide = true;

  }

  DoneSignup(form: NgForm) {

    if (form.invalid)
    {
      return;
    } else {
      this.UserObject = {email: form.value.email, password: form.value.password,
      firstname: form.value.firstname, lastname: form.value.lastname, superhero: form.value.userhero,
      loggedin: false, role: null};
      this.userService.RegisterUser(this.UserObject).subscribe((response) => {

        if (response.success) {

            this.ResultUserObject = response;
            this.openSnackBar(this.ResultUserObject.message, '');
            form.resetForm();
        }
      },
      (error) => {
        this.ResultUserObject = error;
        this.openSnackBar(this.ResultUserObject.message, '');
      });
    }
  }



  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }
}
