import { Component, HostListener, OnInit, ViewEncapsulation, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, PageEvent } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/actions/ui.actions';
import { DialogDeleteComponent } from '../../../shared/components/DialogDelete/dialog-delete.component';
import { AuthService } from '../../services/auth.service';
import { ResponseMessagesService } from '../../services/error.service';
import { Quote } from './../../../shared/components/DialogSignup/dialogsignup.component';
import { User } from './../../../shared/models/User.model';
import { UserService } from './../../services/user.service';
import { ModelQuote } from '../../../shared/models/quote.model';

@Component({
  selector: 'app-wall-page',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
  encapsulation: ViewEncapsulation.None
})

@Injectable({providedIn: 'root'})
export class WallPageComponent implements OnInit {

  public userConnectedUpdate = new FormData();
  public id: string;
  private counter: number;
  public superHeroImage: string;
  public hide: boolean;
  public innerWidth: number;
  public imagePreview: string;
  public totalImages: number;
  public pageSizeOptions: any;
  public imagesPerPage: number;
  public currentPage: number;
  public isLoading$: Observable<boolean>;
  public profileAble$: Observable<boolean>;
  public wallAble$: Observable<boolean>;
  public editAble$: Observable<boolean>;
  public mobile$: Observable<boolean>;

  public editUser = {
    firstname: '',
    lastname: '',
    password: '',
    superhero: '',
    email: ''
  };

  imageFormGroup = new FormGroup({
    image: new FormControl(null, { validators: [Validators.required] })
  });
  imageFormArray = new FormGroup({
    image: new FormControl(null, { validators: [Validators.required] })
  });

  public userConnected: User;
  public ImagesArray: File[] = [];
  selectedValue: Quote[];
  filesToUpload: Array<File> = [];
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
    }
  ];
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private responseMessageService: ResponseMessagesService,
    private spinnerService: Ng4LoadingSpinnerService,
    private store: Store<fromRoot.State>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.currentPage = 1;
    this.pageSizeOptions = [3, 5, 7];
    this.imagesPerPage = 3;
    this.hide = true;
    this.counter = 0;


    this.imageFormGroup = this.formBuilder.group({
      image: ''
    });
    this.imageFormArray = this.formBuilder.group({
      image: ''
    });
  }
  ngOnInit() {
   if (this.authService.getIsLogged()) {
     this.loadUpWall();
   }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.phoneOrComputer(this.innerWidth);
  }
  loadUpWall() {

    this.loading();
    this.phoneOrComputer(this.innerWidth);
    this.disableWall();
    this.innerWidth = window.innerWidth;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
          if (paramMap.has('id')) {
            this.id = paramMap.get('id');
            this.userService.getCurrentUser(this.id).subscribe((responseConnected) => {
                this.userConnected = responseConnected.message.userData;
                this.assignValuesEditUser(responseConnected.message.userData);
                this.superHeroImage = responseConnected.message.userData.quote.map(superHeroProfileImage => {
                  return superHeroProfileImage.icon;
                });
                if (responseConnected.message.userImages) {
                  this.totalImages = responseConnected.message.userImages.length;
                }
                this.userService.getImagesViaPaginator(this.imagesPerPage, this.currentPage, this.id)
                  .subscribe(response => {
                    this.userConnected.Images = response.message.Images;
                    this.stopLoading();
                  });
              },
              (error) => {
                this.responseMessageService.FailureMessage(error, 'Sorry');
                this.afterError(error, 'Sorry');
              }
            );
          }
        });
  }
  dialogDeleteImages() {

    this.dialog.open(DialogDeleteComponent, {
      data: {
        totalImages: this.totalImages,
        id: this.id
      }
    });
  }
  onChangePage(pageData: PageEvent) {

    this.currentPage = pageData.pageIndex + 1;
    this.imagesPerPage = pageData.pageSize;
    this.userService
      .getImagesViaPaginator(this.imagesPerPage, this.currentPage, this.id)
      .subscribe(response => {
        this.userConnected.Images = response.message.Images;
      });
  }

  assignValuesEditUser(user: User) {

    this.editUser.firstname = user.firstname;
    this.editUser.lastname = user.lastname;
    this.editUser.password = user.password;
    this.editUser.superhero = user.superhero;
    this.editUser.email = user.email;

  }

  updateUser() {

      this.validateForm();
      this.createUserObjectForUpdate();
      this.imagePreview = null;
      this.loading();
      this.counter = 0;
      console.log(this.userConnectedUpdate);
      this.userService.updateUser(this.userConnectedUpdate, this.id).subscribe((response) => {
        this.userConnected = response.message.userData;
        this.disableWall();
        this.cancelEdit();
        this.stopLoading();
        this.responseMessageService.SuccessMessage('Details updated successfully!', 'Yay!');
        }, (error) => {
          console.log(this.userConnected.quote);
          this.afterError(JSON.stringify(error), 'sorry');
        }
      );
  }

  createUserObjectForUpdate(): void {

    let quoteData: ModelQuote;
    console.log(JSON.stringify(this.userConnected.quote.map(data =>  data.name )));
    quoteData.name = this.userConnected.quote.map(data =>  data.name ) as any;
    quoteData.icon = this.userConnected.quote.map(data => data.icon) as any;
    console.log(quoteData);
    this.userConnectedUpdate.append('email', this.userConnected.email);
    this.userConnectedUpdate.append('password', this.userConnected.password);
    this.userConnectedUpdate.append('firstname', this.userConnected.firstname);
    this.userConnectedUpdate.append('lastname', this.userConnected.lastname);
    this.userConnectedUpdate.append('superhero', this.userConnected.superhero);
    if (this.imageFormGroup.controls.image.value) {
      this.userConnectedUpdate.append('image', this.imageFormGroup.controls.image.value);
    } else {this.userConnectedUpdate.append('image', this.userConnected.Image); }
    this.userConnectedUpdate.append('quote', JSON.stringify(this.userConnected.quote as any));
    this.userConnectedUpdate.append('role', this.userConnected.role);
    if (this.userConnected.Images) {
    this.userConnectedUpdate.append('Images', JSON.stringify(this.userConnected.Images));
    }
  }
  edit(): void {

    this.counter += 1;
    if (this.counter === 1) {
      this.enableEdit();
      this.disableWall();
    } else {
      this.cancelEdit();
      this.counter = 0;
    }
  }
  disconnect(): void {

    this.loading();
    this.authService.logout();
  }
  onImagePicked(event: Event): void {

    const file = (event.target as HTMLInputElement).files[0];
    this.imageFormGroup.patchValue({ image: file });
    this.imageFormGroup.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  fileChangeEvent(fileInput: any): void {

    this.filesToUpload = fileInput.target.files as Array<File>;
  }
  uploadCollection(): void {

    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    let i;
    // tslint:disable-next-line:prefer-for-of
    for (i = 0; i < files.length; i++) {
      // tslint:disable-next-line:no-string-literal
      formData.append('uploads[]', files[i], files[i]['name']);
      if (i >= files.length) {this.loading(); }
    }
    this.userService.updateImageCollection(formData, this.id).subscribe((response) => {
        if (response.userData.success) {
          this.userConnected.Images = response.userData.Images;
          this.totalImages = response.userData.Images.length;
          this.responseMessageService.SuccessMessage('Your album has been successfully updated.', 'Yay!');
          this.stopLoading();
        }
      },
      (error) => {
          this.responseMessageService.FailureMessage(error, 'Sorry');
      });
}
  afterError(error, message: string): void {

    this.stopLoading();
    this.store.dispatch(new UI.HideTheWall());
    this.store.dispatch(new UI.StopLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
    this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
    this.spinnerService.hide();
    this.responseMessageService.FailureMessage(error, message);
  }
  /* Validate functions */
  validateForm(): void {

    if (this.editUser.email) {this.userConnected.email = this.editUser.email; }
    if (this.editUser.firstname) {this.userConnected.firstname = this.editUser.firstname; }
    if (this.editUser.lastname) {this.userConnected.lastname = this.editUser.lastname; }
    if (this.editUser.password) {this.userConnected.password = this.editUser.password; }
    if (this.editUser.superhero) {this.userConnected.superhero = this.editUser.superhero; }
    if (this.selectedValue) {
      this.userConnected.quote.splice(0, 1);
      this.userConnected.quote.push(this.selectedValue as any);
     }
  }
  phoneOrComputer(innerWidth: number): void {

    if (innerWidth <= 800) {
      this.store.dispatch(new UI.Mobile());
      this.mobile$ = this.store.select(fromRoot.getMobileOrDesktop);
    } else if (innerWidth >= 1000) {
      this.store.dispatch(new UI.Desktop());
      this.mobile$ = this.store.select(fromRoot.getMobileOrDesktop);
    }
  }
  /* Ngrx functions */
  loading(): void {

    this.spinnerService.show();
    this.store.dispatch(new UI.StartLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }
  stopLoading(): void {

    this.spinnerService.hide();
    this.store.dispatch(new UI.StopLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }
  enableEdit(): void {

    this.store.dispatch(new UI.EditAble());
    this.editAble$ = this.store.select(fromRoot.getIsEditAble);
  }
  cancelEdit(): void {

    this.store.dispatch(new UI.CancelEdit());
    this.editAble$ = this.store.select(fromRoot.getIsEditAble);
  }
  enableWall(): void {

    this.store.dispatch(new UI.ShowTheWall());
    this.store.dispatch(new UI.CancelEdit());
    this.editAble$ = this.store.select(fromRoot.getIsEditAble);
    this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
    this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
  }
  disableWall(): void {

    this.store.dispatch(new UI.HideTheWall());
    this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
    this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
  }
}
