import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

interface IUserLogin{
  username: string;
  password: string;
  remember: boolean;
}

interface IUserIdentity{
  displayName: string;
  token: string;
}

@Injectable()
export class AuthService {
  private static sesIdentityKey: string = "authInfo";
  private static user: IUserIdentity;

  public static urlToken = "http://localhost:63810/connect/token";
  public static urlSignIn = "http://localhost:5000/login/";
  public static urlSignOut = "http://localhost:63810/logout";

  constructor(private http: Http) { }

  public signIn(username: string, password: string, success?: Function, error?: Function){
    // console.log("AuthService.SignIn")
    // console.log("Username: " + username)
    // console.log("Password: " + password)
    this.authorizing({
      username: username,
      password: password,
      remember: true
    }).then(x => this.successHandler(x, success), x => this.errorHandler(x, error));
  }

  public signOut(success?: Function, error?: Function){
    
  }

  public test(model: IUserLogin): Promise<any>{
    
    return this.http.get(AuthService.urlSignIn)
      .toPromise();
  }

  private successHandler(data: IUserIdentity, callback?: Function){
    if(callback){
      callback(data);
    }
    if(data){
      AuthService.user = data;
      sessionStorage.setItem(AuthService.sesIdentityKey, JSON.stringify(data));
    }
  }

  private errorHandler(data: any, callback?: Function){
    if(callback){
      callback(data);
    }
  }

  private authorizing(model: IUserLogin): Promise<IUserIdentity>{
    let options = this.getOptions(model);
    return this.http.post(AuthService.urlSignIn, model, options)
      .toPromise()
      .then(this.onAuthorizing)
      .catch(this.onAuthoringError);
  }

  private deAuthorizing(){

  }

  private onAuthorizing(response: Response){
    let context = response.json();
    return context;
  }

  private onAuthoringError(error: Response | any){

  }

  private getLocalIdentity(): IUserIdentity{
    if(!AuthService.user){
      let data = sessionStorage.getItem(AuthService.sesIdentityKey);
      if(data){
        AuthService.user = JSON.parse(data) as IUserIdentity;
        if(AuthService.user){
          return AuthService.user;
        }
      }
      return null;
    }
    else{
      return AuthService.user;
    }
  }

  private pack(model: IUserLogin): string{
    let data = null;
    for (var key in model) {
      if (model.hasOwnProperty(key)) {
        var item = model[key];
        if(data != null){
          data += "&" + key + "=" + model[key];
        }
        else{
          data = key + "=" + model[key];
        }
      }
    }
    return data;
  }

  private getOptions(model: IUserLogin): RequestOptions{
    let data = new Headers({

      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      //'Content-Type': 'application/json'
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let body = this.pack(model);
    return new RequestOptions({headers: data, body: body, method: RequestMethod.Post});
  }

}
