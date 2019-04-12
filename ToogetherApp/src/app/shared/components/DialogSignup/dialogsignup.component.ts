import { ResultUser } from './../../models/Result-user';
import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/User.model';
import { UserService } from 'src/app/core/services/user.service';
import {MatSnackBar} from '@angular/material';
import { Store } from '@ngrx/store';


export interface Quote {

  name: string;
  icon: string;

}

@Component({

  // tslint:disable-next-line:component-selector
  selector: 'app-dialogSignup',
  templateUrl: './dialogsignup.component.html',
  styleUrls: ['./dialogsignup.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DialogSignUpComponent {



  QuoteCtrl = new FormControl();
  selectedValue: Quote[] ;

  quotes: Quote[] = [
    {
      name: 'Your friendly neighborhood spider man',
      icon: '../../../../assets/images/icons/emotion-spiderman-icon.png'
    },
    {
      name: 'I am iron man',
      icon: '../../../../assets/images/icons/iconfinder_ironman_III_52378.png'
    },
    {
      name: 'I am angry',
      icon: '../../../../assets/images/icons/iconfinder_Happy_Hulk_73375.png'
    },
    {
      name: 'I am groot',
      icon: '../../../../assets/images/icons/groot.jpg'
    }
  ];
  public hide: boolean;
  public ResultUserObject: ResultUser;
  private UserObject: User;
  private quoteObject: Quote;
  public imagePreview: string;
  imageFormGroup = new FormGroup({
    image: new FormControl(null, { validators: [Validators.required] })
  });

  constructor(private userService: UserService, private snackBar: MatSnackBar,
              ) {

    this.hide = true;


  }

  DoneSignup(form: NgForm) {

    console.log(form.value.quote);
    if (form.invalid)
    {
      return;
    } else {
      this.UserObject = {email: form.value.email, password: form.value.password,
      firstname: form.value.firstname, lastname: form.value.lastname, superhero: form.value.userhero,
      loggedin: false, quote: this.selectedValue as any, image: this.imageFormGroup.value, role: null};

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
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }
}
