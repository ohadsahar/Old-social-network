import { NgForm } from '@angular/forms';
import { UserService } from './../../../core/services/user.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialoglogin.component.html',
  styleUrls: ['./dialoglogin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogLoginComponent {
  public hide: boolean;
  public id: string;

  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) {
    this.hide = true;
  }

  DoneLogin(form: NgForm) {


    if (form.invalid) {
      return;
    } else {
      this.userService.LoginUser(form.value).subscribe(
        response => {
          if (response.token) {
            this.id = response.id;
            this.userService
              .UpdateLoggedIn(response.id, true)
              .subscribe(responseUpdate => {
                if (responseUpdate.success) {
                  this.openSnackBar('You have successfully logged in', '');
                  setTimeout(() => {
                  this.router.navigate(['Wall/' + this.id]);
                  }, 3000);

                }
              });
          }
        },
        error => {
          console.log(error);
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
