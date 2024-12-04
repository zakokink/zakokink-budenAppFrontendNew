import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Uebung, User } from 'src/app/classes/trainingClasses';
import { TrainingRestService } from 'src/app/services/training-rest.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {
  public userOptionen: User[] = [];
  public selectedUser : string | null= null;
  constructor(private trainingRestService: TrainingRestService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.trainingRestService.getAllUsers().subscribe(data => {
      this.userOptionen = data;
      });
  }

  changeUser(inputType: string){
    this.selectedUser = inputType;
  }

  pushStartButton(){
    this.router.navigate(['newTraining/'+this.selectedUser]);
  }
  pushAlleTrainingEinheitenButton(){
    this.router.navigate(['alleTrainingseinheiten/'+this.selectedUser]);
  }

}
