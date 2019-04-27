import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

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


