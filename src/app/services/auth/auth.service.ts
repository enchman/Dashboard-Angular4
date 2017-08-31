import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  
  constructor() { }

  // Doing Authentication Request to Identity server
  public login(username: string, password: string, isPersistent?: boolean): void{

  }

  public isAuthorized(): boolean{
    return false;
  }

  private get(key: string): any{
    var data = localStorage.getItem(key);
    if(data){
      return JSON.parse(data);
    }
    return data;
  }

  private save(key: string, value: any): void{
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  private remove(key: string){
    localStorage.removeItem(key);
  }

}
