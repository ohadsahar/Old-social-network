export interface User {

  email: string;
  password: string;
  firstname: string;
  lastname: string;
  superhero: string;
  loggedin: boolean;
  Image: File;
  quote: [{
    name: string;
    icon: string;
  }];
  Images: any;
  role: string;
}
