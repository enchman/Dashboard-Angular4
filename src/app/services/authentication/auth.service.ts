import { Injectable } from '@angular/core';

interface IProfile{
  userId: number;
  nickname: string;
  firstname: string;
  lastname: string;
}

@Injectable()
export class AuthService {
  private static identity: IProfile;
  constructor() { }

  public signIn(username:string, password: string, callback?: Function): boolean{
    console.log("Processing");
    if(AuthService.identity){
      return true;
    }

    let profile = this.pseudoAuth(username, password);
    if(profile){
      AuthService.identity = profile;
      if(callback){
        callback();
      }
      return true;
    }
    return false;
  }

  public signOut(){
    console.log("Logout");
    if(AuthService.identity && AuthService.identity.nickname){
      console.log("Bye... " + AuthService.identity.nickname)
    }

    // In this section, we can put request for logout
    AuthService.identity = null;
  }

  public static isAuthorized(): boolean{
    // Need API to validate this
    return AuthService.identity ? true : false;
  }

  private pseudoAuth(user: string, pass: string): IProfile{
    // console.log(user);
    // console.log(pass);
    if(user && pass && user.toLowerCase() === "admin@trafik.dk" && pass.toLowerCase() === "admin"){
      return {
        userId: 1,
        nickname: "Administrator",
        firstname: "Admin",
        lastname: "Adminisen"
      };
    }
    return null;
  }
  
}
