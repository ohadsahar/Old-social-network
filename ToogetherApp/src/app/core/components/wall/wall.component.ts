import { User } from './../../../shared/models/User.model';
import { UserService } from './../../services/user.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-wall-page',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WallPageComponent implements OnInit {
  private publicKey = '&apikey=a57f69f228215bfef20b25c7ecb346ad';
  private privateKey = 'b095ec6c9017d874504c0935ad9444f60f5245aa';
  private hash = '&hash=6a5f930fec8cace1076af08658de6d76';
  private comicsUrl = 'http://gateway.marvel.com/v1/public/comics?ts=1';
  private urlComics = `${this.comicsUrl}&dateRange=2019-01-01%2C%202019-05-04${
    this.publicKey
  }${this.hash}`;

  private id: string;
  private counter: number;
  public editAble: boolean;
  public hide: boolean;
  public profileAble: boolean;
  public wallAble: boolean;

  public MarvelCollection: any[] = [];
  public UserConnected: User;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.editAble = false;
    this.hide = true;
    this.profileAble = false;
    this.wallAble = true;
    this.counter = 0;
  }

  ngOnInit() {
    this.http.get<{ data: any }>(this.urlComics).subscribe((response) => {
      this.MarvelCollection = response.data.results;
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
        this.userService.GetConnectedUser(this.id).subscribe((responseConnected) => {
            this.UserConnected = responseConnected.UserObject;
            if (responseConnected.UserObject.loggedin as any === 'true')  {
              this.router.navigate(['Wall/' + this.id]);
              } else {
                this.router.navigate(['']);
              }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  EditUser(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
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


      this.userService.UpdateUser(this.UserConnected, this.id).subscribe(response => {
        this.UserConnected = response.UserObject;
      });
    }
  }

  Edit() {

    this.counter += 1;
    if (this.counter === 1) {
      this.editAble = true;
    } else {
      this.counter = 0;
      this.editAble = false;
    }
  }

  ShowProfile() {

    this.wallAble = false;
    this.profileAble = true;

  }

  ShowWall() {

    this.wallAble = true;
    this.profileAble = false;
    this.editAble = false;
    this.counter = 0;
  }

  Disconnect() {

    this.userService.UpdateLoggedIn(this.id, false).subscribe((response) => {
      this.router.navigate(['']);
      console.log(response);
    },
    (error) => {
      console.log(error);
    });
  }
}
