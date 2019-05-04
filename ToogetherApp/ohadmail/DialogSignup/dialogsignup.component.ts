import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ResponseMessagesService } from 'src/app/core/services/error.service';
import { UserService } from 'src/app/core/services/user.service';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../actions/ui.actions';
import { AuthService } from '../../../core/services/auth.service';


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
      name: 'Coming from your friendly neighborhood Spider-Man!',
      icon: '../../../../assets/images/icons/emotion-spiderman-icon.png'
    },
    {
      name: 'With great hotness comes great responsibility.',
      icon: '../../../../assets/images/icons/emotion-spiderman-icon.png'
    },
    {
      name: `Then don't take my stuff`,
      icon: '../../../../assets/images/icons/iconfinder_ironman_III_52378.png'
    },
    {
      name: 'I am iron man',
      icon: '../../../../assets/images/icons/iconfinder_ironman_III_52378.png'
    },
      {
      name: `sometimes you gotta Run before you can Walk.`,
      icon: '../../../../assets/images/icons/iconfinder_ironman_III_52378.png'
    },
    {
      name: 'I am angry',
      icon: '../../../../assets/images/icons/iconfinder_Happy_Hulk_73375.png'
    },
    {
      name: 'Leave me alone.',
      icon: '../../../../assets/images/icons/iconfinder_Happy_Hulk_73375.png'
    },
    {
      name: 'HULK SMASH!',
      icon: '../../../../assets/images/icons/iconfinder_Happy_Hulk_73375.png'
    },

    {
      name: 'Do not touch me again',
      icon: '../../../../assets/images/icons/Thor.png'
    },
    {
      name: `You have no idea what you're dealing with.`,
      icon: '../../../../assets/images/icons/Thor.png'
    },
    {
      name: ` I must go back to Asgard, but I give you my word. I will return for you.`,
      icon: '../../../../assets/images/icons/Thor.png'
    },

    {
      name: 'I am groot',
      icon: '../../../../assets/images/icons/groot.jpg'
    },
  ];
  public hide: boolean;
  public resultUserObject: any;
  public imagePreview: string;
  public userData = new FormData();
  imageFormGroup = new FormGroup({
    image: new FormControl(null, { validators: [Validators.required] })
  });

  constructor(private authService: AuthService,
              private responseMessageService: ResponseMessagesService,
              private spinnerService: Ng4LoadingSpinnerService, private formBuilder: FormBuilder,
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
      this.createUserObject(form);
      this.authService.registerUser(this.userData).subscribe((response) => {
        if (response.message.success) {
            this.responseMessageService.SuccessMessage('Hurray, you signed up successfully!', 'Yay!');
            form.resetForm();
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
  createUserObject(form: NgForm) {

    this.userData.append('email', form.value.email);
    this.userData.append('password', form.value.password);
    this.userData.append('firstname', form.value.firstname);
    this.userData.append('lastname', form.value.lastname);
    this.userData.append('superhero', form.value.userhero);
    this.userData.append('loggedin', 'false');
    this.userData.append('image', this.imageFormGroup.controls.image.value);
    this.userData.append('quote', JSON.stringify(this.selectedValue as any));
    this.userData.append('role', null);

  }
}
