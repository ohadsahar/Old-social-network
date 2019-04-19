export interface User {

  email: string;
  password: string;
  firstname: string;
  lastname: string;
  superhero: string;
  loggedin: boolean;
  image: File;
  quote: [{
    name: string;
    icon: string;
  }];
  role: string;
}
