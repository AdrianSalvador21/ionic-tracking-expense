import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-assignment',
  templateUrl: './users-assignment.component.html',
  styleUrls: ['./users-assignment.component.scss'],
})
export class UsersAssignmentComponent implements OnInit {
  public userImage = 'assets/images/dashboard/user-example2.jpg';

  constructor() { }

  ngOnInit() {}

}
