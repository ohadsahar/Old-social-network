import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, PageEvent } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/actions/ui.actions';
import { DialogDeleteComponent } from '../../../shared/components/DialogDelete/dialog-delete.component';
import { ResponseMessagesService } from '../../services/error.service';
import { Quote } from './../../../shared/components/DialogSignup/dialogsignup.component';
import { User } from './../../../shared/models/User.model';
import { UserService } from './../../services/user.service';


@Component({
  selector: 'app-wall-page',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class WallPageComponent implements OnInit {

  private id: string;
  private counter: number;
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


  imageFormGroup = new FormGroup({image: new FormControl(null,
     { validators: [Validators.required] })});

  imageFormArray = new FormGroup({image: new FormControl(null,
      { validators: [Validators.required] })});

  public MarvelCollection: any[] = [];
  public UserConnected: User;
  public ImagesArray: File [] = [];

  QuoteCtrl = new FormControl();
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
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
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
    this.OnWallComponentStart();
  }

  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth;
  this.PhoneOrComputer(this.innerWidth);
}

  OnWallComponentStart() {

    this.Loading();
    this.PhoneOrComputer(this.innerWidth);
    this.DisableWall();
    this.innerWidth = window.innerWidth;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
        this.userService.GetConnectedUser(this.id).subscribe(responseConnected => {
            this.UserConnected = responseConnected.userData.UserObject;
            if (responseConnected.userData.allImages.Images) {
            this.totalImages = responseConnected.userData.allImages.Images.length;
            }
            if ((responseConnected.userData.UserObject.loggedin as any) === 'true') {
              this.router.navigate(['Wall/' + this.id]);
            } else {
              this.router.navigate(['']);
            }
            this.userService.GetImagesViaPaginator(this.imagesPerPage, this.currentPage , this.id).subscribe(response => {
              this.UserConnected.Images = response.userData.userImage;
              this.StopLoading();
          });
          },
          (error) => {
            this.responseMessageService.FailureMessage(
              'Yuston we have problem, try again later',
              'Sorry'
            );
            this.AfterError();
          }
        );
      }
    });
  }
  DialogDeleteCollectionImages() {
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
    this.userService.GetImagesViaPaginator(this.imagesPerPage, this.currentPage , this.id).subscribe(response => {
        this.UserConnected.Images = response.userData.userImage;
    });
  }
  EditUser(form: NgForm) {

    if (form.invalid) {
      return;
    } else {

      this.ValidateForm(form);
      const UserConnectedUpdate = new FormData();
      UserConnectedUpdate.append('email', this.UserConnected.email);
      UserConnectedUpdate.append('password', this.UserConnected.password);
      UserConnectedUpdate.append('firstname', this.UserConnected.firstname);
      UserConnectedUpdate.append('lastname', this.UserConnected.lastname);
      UserConnectedUpdate.append('superhero', this.UserConnected.superhero);
      UserConnectedUpdate.append('loggedin', 'true');

      if (this.imageFormGroup.controls.image.value) {

        UserConnectedUpdate.append('image', this.imageFormGroup.controls.image.value);
      } else {

        UserConnectedUpdate.append('image', this.UserConnected.Image);
      }
      UserConnectedUpdate.append('quote', JSON.stringify(this.UserConnected.quote as any));
      UserConnectedUpdate.append('role', this.UserConnected.role);
      if (this.UserConnected.Images) {

        UserConnectedUpdate.append('Images', JSON.stringify(this.UserConnected.Images));
      }

      this.imagePreview = null;

      this.Loading();
      this.counter = 0;
      this.userService.updateUser(UserConnectedUpdate, this.id).subscribe((response) => {
        this.UserConnected = response.message.userData;
        this.DisableWall();
        this.CancelEdit();
        this.StopLoading();
        this.responseMessageService.SuccessMessage('Details updated successfully!', 'Yay!');
        },
        (error) => {
          this.StopLoading();
          this.responseMessageService.FailureMessage('Sorry there is a problem right now, try again later', 'Sorry');

        }
      );
    }
  }
  Edit() {
    this.counter += 1;
    if (this.counter === 1) {

      this.EnableEdit();
      this.DisableWall();

    } else {
      this.CancelEdit();
      this.counter = 0;
    }
  }
  Disconnect() {

    this.Loading();
    this.userService.updateStatusLogged(this.id, false).subscribe(
      () => {
        this.StopLoading();
        this.router.navigate(['']);
      },
      error => {
        this.responseMessageService.FailureMessage(
          'Yuston we have problem, try again later',
          'Sorry'
        );
        this.AfterError();
      }
    );
  }
  ValidateForm(form: NgForm) {

    if (form.value.email) {
      this.UserConnected.email = form.value.email;
    }
    if (form.value.firstname) {
      this.UserConnected.firstname = form.value.firstname;
    }

    if (form.value.lastname) {
      this.UserConnected.lastname = form.value.lastname;
    }

    if (form.value.password) {
      this.UserConnected.password = form.value.password;
    }
    if (form.value.superhero) {
      this.UserConnected.superhero = form.value.superhero;
    }

    if (this.selectedValue !== undefined) {

      this.UserConnected.quote = [] as any;
      this.UserConnected.quote.push(this.selectedValue as any);
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
  upload() {

    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    let i;
    // tslint:disable-next-line:prefer-for-of
    for ( i = 0; i < files.length; i++) {
        // tslint:disable-next-line:no-string-literal
        formData.append('uploads[]', files[i], files[i]['name']);
        if (i >= files.length) {
          this.Loading();
        }
    }
    this.userService.UpdateUserCollectionImages(formData, this.id).subscribe(response => {
      if (response.userData.success) {
      this.UserConnected.Images = response.userData.Images;
      this.totalImages = response.userData.Images.length;
      this.responseMessageService.SuccessMessage('Your album has been successfully updated.', 'Yay!');
      } else {
        this.responseMessageService.FailureMessage('There was a problem updating your album, please try again.', 'Sorry');
      }
      this.StopLoading();
    });
  }
  fileChangeEvent(fileInput: any) {
      this.filesToUpload =  fileInput.target.files as Array<File>;

  }
  PhoneOrComputer(innerWidth: number) {
    if (innerWidth <= 800) {
      this.store.dispatch(new UI.Mobile());
      this.mobile$ = this.store.select(fromRoot.getMobileOrDesktop);
    }  else if (innerWidth >= 1000) {
      this.store.dispatch(new UI.Desktop());
      this.mobile$ = this.store.select(fromRoot.getMobileOrDesktop);
    }
  }
  ShowProfile() {

    this.DisableWall();

  }
  ShowWall() {
    this.EnableWall();
  }
  AfterError() {
    this.store.dispatch(new UI.HideTheWall());
    this.store.dispatch(new UI.StopLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
    this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
    this.spinnerService.hide();
  }
  Loading() {
    this.spinnerService.show();
    this.store.dispatch(new UI.StartLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }
  StopLoading() {

    this.spinnerService.hide();
    this.store.dispatch(new UI.StopLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

  }
  EnableEdit() {

    this.store.dispatch(new UI.EditAble());
    this.editAble$ = this.store.select(fromRoot.getIsEditAble);

  }
  CancelEdit() {

    this.store.dispatch(new UI.CancelEdit());
    this.editAble$ = this.store.select(fromRoot.getIsEditAble);
  }
  EnableWall() {

    this.store.dispatch(new UI.ShowTheWall());
    this.store.dispatch(new UI.CancelEdit());
    this.editAble$ = this.store.select(fromRoot.getIsEditAble);
    this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
    this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);
  }
  DisableWall() {


    this.store.dispatch(new UI.HideTheWall());
    this.wallAble$ = this.store.select(fromRoot.getIsWallAble);
    this.profileAble$ = this.store.select(fromRoot.getIsProfileAble);

  }

}
