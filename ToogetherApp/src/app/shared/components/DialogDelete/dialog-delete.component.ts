import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../app.reducer';
import { UserService } from '../../../core/services/user.service';
import * as UI from '../../../shared/actions/ui.actions';
@Component({

  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DialogDeleteComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public arrayOfImages: Array<string>;
  public imagesCollection: any;
  public totalImages: number;
  public pageSizeOptions: any;
  public imagesPerPage: number;
  public currentPage: number;
  public id: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              private store: Store<fromRoot.State>,
              private spinnerService: Ng4LoadingSpinnerService) {

    this.arrayOfImages = [];
    this.id = data.id;
    this.totalImages = data.totalImages;
    this.currentPage = 1;
    this.pageSizeOptions = [3, 5, 7];
    this.imagesPerPage = 3;
  }

  ngOnInit() {


    this.userService.GetImagesViaPaginator(this.imagesPerPage, this.currentPage , this.id)
    .subscribe(response => {
      console.log(response.userData.userImage);
      this.imagesCollection = response.userData.userImage;
      this.StopLoading();
  });

  }

  SelectedImagesToDelete(id: string) {

    this.arrayOfImages.push(id);
  }
  onChangePage(pageData: PageEvent) {

    this.currentPage = pageData.pageIndex + 1;
    this.imagesPerPage = pageData.pageSize;
    this.userService.GetImagesViaPaginator(this.imagesPerPage, this.currentPage , this.id)
    .subscribe(response => {
        this.imagesCollection.Images = response.userData.userImage;
    });
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

}
