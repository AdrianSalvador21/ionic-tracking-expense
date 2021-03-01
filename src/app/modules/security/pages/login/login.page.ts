import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loggedInUserLocalStorageKey, validUsers } from '../../valid-users';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginObjec = {
    user: '',
    password: ''
  };

  public invalidUser: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    const loggedInUser = localStorage.getItem(loggedInUserLocalStorageKey);

    if (loggedInUser) {
      this.router.navigateByUrl('/dashboard-tabs-menu');
    }
  }

  logIn() {
    const validUser = this.getValidUser(this.loginObjec.user, this.loginObjec.password);

    if (!validUser) {
      this.invalidUser = true;
      return;
    }

    this.invalidUser = false;

    localStorage.setItem(loggedInUserLocalStorageKey, JSON.stringify(validUser));
    this.router.navigateByUrl('/dashboard-tabs-menu');
  }

  private getValidUser(email: string, password: string) {
    for (let validUser of validUsers) {
      if (validUser.email === email && validUser.password === password) {
        return validUser;
      }
    }
    
    return null;
  }

}
