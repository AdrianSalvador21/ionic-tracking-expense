import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loggedInUserLocalStorageKey } from 'src/app/modules/security/valid-users';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public logout() {
    localStorage.removeItem(loggedInUserLocalStorageKey);
    this.router.navigateByUrl('/');
  }

}
