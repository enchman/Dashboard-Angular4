import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

interface IUserLogin{
  username: string;
  password: string;
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
  public static urlSignIn = "http://localhost:63810/login/";
  public static urlSignOut = "http://localhost:63810/logout";

  constructor(private http: Http) { }

  public signIn(username: string, password: string, success?: Function, error?: Function){
    this.authorizing({
      username: username,
      password: password
    }).then(x => this.successHandler(x, success), x => this.errorHandler(x, error));
  }

  public signOut(success?: Function, error?: Function){
    
  }

  public test(model: IUserLogin): Promise<any>{
    
    return this.http.post(AuthService.urlSignIn, model)
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
    let options = this.getOptions();
    console.log(options);
    return this.http.post(AuthService.urlSignIn, model, options)
      .toPromise()
      .then(this.onAuthorizing)
      .catch(this.onAuthoringError);
  }

  private deAuthorizing(){

  }

  private onAuthorizing(response: Response){
    let context = response.json();
    return context.data || {};
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

  private getOptions(): RequestOptions{
    let data = new Headers({
       'Access-Control-Allow-Origin': '*',
      // 'Http-Test-Tag': 'hello world',
      // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      //'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json'
    });
    return new RequestOptions({headers: data});
  }

}
