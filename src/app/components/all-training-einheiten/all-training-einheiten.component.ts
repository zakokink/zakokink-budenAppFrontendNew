import { Component, OnInit } from '@angular/core';
import { Training, TrainingEinheit, TrainingResponse, TrainingsEinheit, User } from '../../classes/trainingClasses';
import { ActivatedRoute } from '@angular/router';
import { TrainingRestService } from 'src/app/services/training-rest.service';


@Component({
  selector: 'app-all-training-einheiten',
  templateUrl: './all-training-einheiten.component.html',
  styleUrls: ['./all-training-einheiten.component.css']
})
export class AllTrainingEinheitenComponent implements OnInit {

  constructor(private restService : TrainingRestService,  private route: ActivatedRoute){}

  public trainings : Training[] = [];
  public trainingEinheit : TrainingEinheit = new TrainingEinheit();
  public trainingEinheitArray : TrainingEinheit[] = [];
  public currentUser : User | null = null;
  private userId :  number = 0;
  math = Math;

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!
    this.restService.getTrainingsByUserId(this.userId).subscribe((data : TrainingResponse) => {
      this.trainings = data.data;

      // Befuelle das trainingEinheitArray
      if(this.trainings != null && this.trainings.length > 0){
        this.befuelleTrainingEinheitArray();
        if(this.trainings[0].user != null){
          this.currentUser = this.trainings[0].user;
        }
      }
    });
  }
  
  private befuelleTrainingEinheitArray(){
    for(let training of this.trainings){
      
      // Entferne unnoetige Dezimalstellen
      if(!isNaN(Number(training.gewicht)) && (Number(training.gewicht) %1 == 0)){
        training.gewicht = String(this.math.trunc(Number(training.gewicht)));
      }

      
      // Array ist noch leer oder Gleiches Datum
      if(this.trainingEinheitArray.length < 1 || (this.trainingEinheitArray.length > 0 && this.trainingEinheitArray[this.trainingEinheitArray.length-1].date != training.date)) {
        let neueTrainingEinheit : TrainingEinheit = new TrainingEinheit();
        neueTrainingEinheit.date = training.date;

      
        neueTrainingEinheit.trainings.push(training)
        this.trainingEinheitArray.push(neueTrainingEinheit);
      }
      else if(this.trainingEinheitArray.length > 0 && this.trainingEinheitArray[this.trainingEinheitArray.length-1].date == training.date){
        // fuege das training an die TrainingsEinheit an der Position an
        this.trainingEinheitArray[this.trainingEinheitArray.length-1].trainings.push(training);
      }
    }
  }
  
}
