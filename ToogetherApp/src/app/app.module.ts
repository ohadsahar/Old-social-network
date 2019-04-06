import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  MatMenuModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSnackBarModule,
  MatDividerModule,
  MatListModule,
  MatInput
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './core/components/homepage/homepage.component';
import { DialogSignUpComponent } from './shared/components/DialogSignup/dialogsignup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogLoginComponent } from './shared/components/DialogLogin/dialoglogin.component';
import { WallPageComponent } from './core/components/wall/wall.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent, DialogSignUpComponent, DialogLoginComponent, WallPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [DialogSignUpComponent, DialogLoginComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
