import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule} from '@ngrx/store';
import { Reducers } from './app.reducer';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
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
  MatAutocompleteModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatCheckboxModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './core/components/homepage/homepage.component';
import { DialogSignUpComponent } from './shared/components/DialogSignup/dialogsignup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogLoginComponent } from './shared/components/DialogLogin/dialoglogin.component';
import { DialogDeleteComponent } from './shared/components/DialogDelete/dialog-delete.component';
import { WallPageComponent } from './core/components/wall/wall.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent, DialogSignUpComponent,
    DialogLoginComponent, WallPageComponent, DialogDeleteComponent],
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
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCheckboxModule,
    Ng4LoadingSpinnerModule.forRoot(),
    StoreModule.forRoot(Reducers)
  ],
  entryComponents: [DialogSignUpComponent, DialogLoginComponent, DialogDeleteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
