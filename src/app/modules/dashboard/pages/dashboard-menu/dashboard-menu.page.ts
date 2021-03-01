import { Component, OnInit } from '@angular/core';
import {CoreService} from '../../../../core/services/core.service';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.page.html',
  styleUrls: ['./dashboard-menu.page.scss'],
})
export class DashboardMenuPage implements OnInit {
  public menuOpts = [];

  constructor(public coreService: CoreService) { }

  ngOnInit() {
    this.coreService.getMenuOpts().subscribe((menuOpts) => {
      console.log(menuOpts);
      this.menuOpts = menuOpts;
    });
  }

}
