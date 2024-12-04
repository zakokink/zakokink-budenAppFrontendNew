import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/trainingClasses';
import { TrainingRestService } from 'src/app/services/training-rest.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userFormGroup : FormGroup;
  constructor(private trainingService: TrainingRestService, private router: Router) {
    this.userFormGroup = new FormGroup({
      userName: new FormControl(''),     
    });
   }

  ngOnInit(): void {
  }

  saveUser(){
    let userName : string = this.userFormGroup.get('userName')?.value;  
    
    if(userName.trim().length > 0){
      let user : User = new User();
      user.name = userName;

      this.trainingService.saveUser(user).subscribe(data => 
        { console.log('Uebung : ' + data.name + 'gespeichert' )
          this.router.navigate(['']); });
      

    }
  }
}
