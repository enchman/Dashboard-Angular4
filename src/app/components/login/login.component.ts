import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private static minPassLength: number = 3;
  private loginBox: HTMLElement;
  private boxState: string = null;
  constructor(
    private auth: AuthService
  ) {}

  ngOnInit() {
  }

  login(username: string, password: string): void{
    this.auth.signIn(username, password, this.onSuccess, this.onError);
    // this.auth.test({username: username, password: password})
    //   .then(x => console.log(x), x => console.log("Failed"));
  }


  validateEmail(value: string, e: Event): void{
    if(!this.isEmail(value)){
      let target = this.getElement(e);
      if(target){
        $(target).addClass("error");
      }
    }
  }

  validatePassword(value: string, e: Event): void{
    if(this.isPassword(value)){
      // Do something when password is valid
    }
    else{
      // Do something when password is invalid
    }
  }

  private onSuccess(data: any){
    console.log(data);
  }

  private onError(data: any){
    console.log(data);
  }

  private onLogin(){
    //this.router.navigate(["./dashboard"]);
  }

  private isEmail(value: string): boolean{
    return value && value.length > 4 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  }

  private isPassword(value: string): boolean{
    return value && value.length >= LoginComponent.minPassLength;
  }

  private getElement(e: Event): HTMLElement{
    if(e && e.target){
      return e.target as HTMLElement;
    }
    return null;
  }

}
