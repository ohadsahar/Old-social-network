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
      commentinfo: string;
      subcomments: [{
        subcommentinfo: string;
      }];
    }];
}
