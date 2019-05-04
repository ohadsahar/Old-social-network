import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';
import { WallPageComponent } from '../wall/wall.component';
import { User } from 'src/app/shared/models/User.model';
import * as fromRoot from '../../../app.reducer';
import * as UI from '../../../shared/actions/ui.actions';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ResponseMessagesService } from '../../services/error.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})

export class PostsComponent implements OnInit {

  public superHeroImage: string;
  private innerWidth: number;
  public totalImages: number;
  public pageSizeOptions: any;
  public imagesPerPage: number;
  public currentPage: number;
  public id: string;
  public userConnected: User;
  public isLoading$: Observable<boolean>;
  public mobile$: Observable<boolean>;

  constructor(private userService: UserService, public wallComponent: WallPageComponent,
              private route: ActivatedRoute, private responseMessagesService: ResponseMessagesService,
              private spinnerService: Ng4LoadingSpinnerService, private authService: AuthService,
              private store: Store<fromRoot.State>, private responseMessageService: ResponseMessagesService) {
                this.currentPage = 1;
                this.pageSizeOptions = [3, 5, 7];
                this.imagesPerPage = 3;
}

  ngOnInit() {
    if (this.authService.getIsLogged()) {
         this.onLoadWall();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.phoneOrComputer(this.innerWidth);
  }

  onLoadWall() {
    this.loading();
    this.phoneOrComputer(this.innerWidth);
    this.wallComponent.disableWall();
    this.innerWidth = window.innerWidth;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
          if (paramMap.has('id')) {
            this.id = paramMap.get('id');
            this.userService.getCurrentUser(this.id).subscribe((responseConnected) => {
                this.userConnected = responseConnected.message.userData;
                this.superHeroImage = responseConnected.message.userData.quote.map(superHeroProfileImage => {
                  return superHeroProfileImage.icon;
                });
                if (responseConnected.message.userImages) {
                  this.totalImages = responseConnected.message.userImages.length;
                }
              },
              (error) => {
                this.responseMessagesService.FailureMessage(error, 'Sorry');
                this.afterError(error, 'Sorry');
              }
            );
          }
        });
    }

  afterError(error, message: string): void {

    this.stopLoading();
    this.store.dispatch(new UI.HideTheWall());
    this.store.dispatch(new UI.StopLoading());
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.spinnerService.hide();
    this.responseMessageService.FailureMessage(error, message);
  }
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
  phoneOrComputer(innerWidth: number): void {

    if (innerWidth <= 800) {
      this.store.dispatch(new UI.Mobile());
      this.mobile$ = this.store.select(fromRoot.getMobileOrDesktop);
    } else if (innerWidth >= 1000) {
      this.store.dispatch(new UI.Desktop());
      this.mobile$ = this.store.select(fromRoot.getMobileOrDesktop);
    }
  }

}
