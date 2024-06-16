import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/trainingClasses';
import { TrainingRestService } from 'src/app/services/training-rest.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  constructor(private restService : TrainingRestService) { }
  public usersArray : User[] = [];

  ngOnInit(): void {
  this.restService.getAllUsers().subscribe((data : User[]) => {
    this.usersArray = data;
    console.log(data[0]);

  });
  }

}
