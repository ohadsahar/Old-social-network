export interface User {

  email: string;
  password: string;
  firstname: string;
  lastname: string;
  superhero: string;
  Image: File;
  quote: [{
    name: string;
    icon: string;
  }];
  Images: [{
    imagename: File;
  }];
  role: string;
}
