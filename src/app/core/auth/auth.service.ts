import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class AuthService {

  constructor() { }

  public isLogged$: Subject<boolean> = new Subject<boolean>();
  private isLogged = false;

  logIn(): void {
    this.isLogged = true;
    this.isLogged$.next(this.isLogged);
  }

  logOut(): void {
    this.isLogged$.next(this.isLogged);
    this.isLogged = false;
  }

  getToken() {
    return 'test';
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }
}
