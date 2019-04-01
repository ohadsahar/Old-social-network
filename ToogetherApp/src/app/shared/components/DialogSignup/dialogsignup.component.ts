import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({

  selector: 'app-dialogSignup',
  templateUrl: './dialogsignup.component.html',
  styleUrls: ['./dialogsignup.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DialogSignUpComponent {

  hide = true;

  constructor() {}

  DoneSignup(form: NgForm) {

    console.log(form.value);

  }

}
