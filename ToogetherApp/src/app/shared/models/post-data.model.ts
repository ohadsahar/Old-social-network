export interface Post {

    id: string;
    email: string;
    firstname: string;
    lastname: string;
    icon: string;
    postimage: File;
    postdate: string;
    postinfo: string;
    numberoflikes: number;
    comments: [{
      firstname: string;
      lastname: string;
      icon: string;
      commentinfo: string;
      subcomments: [{
        firstname: string;
        lastname: string;
        icon: string;
        subcommentinfo: string;
      }];
    }];
}
