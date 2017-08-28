import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
//import { Router } from '@angular/router';
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
  constructor(private auth: AuthService) {}

  ngOnInit() {
    if(AuthService.isAuthorized()){
      this.loginEnable(false);
      //this.router.navigate(["."]);
    }
    else{
      this.loginEnable(true);
    }
  }

  login(email: string, password: string): void{
    if(this.isPassword(password) && this.isEmail(email)){
      if(this.auth.signIn(email, password)){
        console.log("Successful")
        this.verify();
      }
      else{
        console.log("Failed to login")
      }
    }
    else{
      console.log("Failed to login")
    }
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

  private verify(){
    if(AuthService.isAuthorized()){
      //this.router.navigate(["./"]);
      this.loginEnable(false);
    }
    else{
      this.loginEnable(true);
    }
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

  private error(){

  }

  private getElement(e: Event): HTMLElement{
    if(e && e.target){
      return e.target as HTMLElement;
    }
    return null;
  }

  private loginEnable(enable?: boolean){
    if(!this.loginBox){
      let target = document.querySelector("#login");
      if(!target){
        throw {message: "Login box is not exist or selector is incorrect"}
      }
      this.loginBox = target as HTMLElement;
    }
    
    if(!this.boxState){
      this.boxState = this.loginBox.style.display;
    }

    if(enable === false){
      this.loginBox.style.display = "none";
    }
    else{
      this.loginBox.style.display = this.boxState;
    }
  }

}
