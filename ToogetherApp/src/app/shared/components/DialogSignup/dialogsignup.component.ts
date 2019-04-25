import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ResponseMessagesService } from 'src/app/core/services/error.service';
import { UserService } from 'src/app/core/services/user.service';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../actions/ui.actions';
import { User } from '../../models/User.model';
import { ResultUser } from './../../models/Result-user';

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
  public resultUserObject: ResultUser;
  private userObject: User;
  private quoteObject: Quote;
  public imagePreview: string;
  imageFormGroup = new FormGroup({
    image: new FormControl(null, { validators: [Validators.required] })
  });

  constructor(private userService: UserService, private snackBar: MatSnackBar,
              private responseMessageService: ResponseMessagesService,
              private spinnerService: Ng4LoadingSpinnerService,private formBuilder: FormBuilder,
              private store: Store<fromRoot.State>) {
    this.hide = true;

    this.imageFormGroup = this.formBuilder.group({
      image: ''
    });
  }

  DoneSignup(form: NgForm) {


    if (form.invalid) {
      return;
    } else {

      this.spinnerService.show();
      this.store.dispatch(new UI.StartLoading());
      const userData = new FormData();
      userData.append('email', form.value.email);
      userData.append('password', form.value.password);
      userData.append('firstname', form.value.firstname);
      userData.append('lastname', form.value.lastname);
      userData.append('superhero', form.value.userhero);
      userData.append('loggedin', 'false');
      userData.append('image', this.imageFormGroup.controls.image.value);
      userData.append('quote', JSON.stringify(this.selectedValue as any));
      userData.append('role', null);

      this.userService.RegisterUser(userData).subscribe((response) => {
        if (response.userData.success) {
            this.responseMessageService.SuccessMessage('Hurray, you signed up successfully!', 'Yay!');
            // form.resetForm();
            this.spinnerService.hide();
            this.store.dispatch(new UI.StopLoading());
        } else {
          this.responseMessageService.FailureMessage('Hi buddy, There was a problem during registration, please try again.', 'Sorry');
        }
      },
      (error) => {
        this.responseMessageService.FailureMessage(error, 'Sorry');
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
