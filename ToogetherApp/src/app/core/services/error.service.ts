import {MatSnackBar} from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ResponseMessagesService {


  constructor(private snackBar: MatSnackBar) {

  }

  SuccessMessage(message: string, action: string) {

      this.snackBar.open(message, action, {
        duration: 6000,
      });

  }

  FailureMessage(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 6000,
      });

  }
}


