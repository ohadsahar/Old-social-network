export interface User {

  email: string;
  password: string;
  firstname: string;
  lastname: string;
  superhero: string;
  loggedin: boolean;
  quote: [{
    name: string;
    icon: string;
  }],
  image:File;
  role: string;
}
