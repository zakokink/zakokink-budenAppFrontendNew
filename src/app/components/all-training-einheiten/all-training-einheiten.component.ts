import { Component, OnInit } from '@angular/core';
import { TrainingsEinheit } from '../../classes/trainingClasses';
import { ActivatedRoute } from '@angular/router';
import { TrainingRestService } from 'src/app/services/training-rest.service';


@Component({
  selector: 'app-all-training-einheiten',
  templateUrl: './all-training-einheiten.component.html',
  styleUrls: ['./all-training-einheiten.component.css']
})
export class AllTrainingEinheitenComponent implements OnInit {

  constructor(private restService : TrainingRestService,  private route: ActivatedRoute){}

  public trainingsEinheiten : TrainingsEinheit[] = [];
  private userId :  number = 0;
  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!
    this.restService.getTrainingsEinheitenByUserId(this.userId).subscribe((data : TrainingsEinheit[]) => {
      console.log("daten geholt");
      this.trainingsEinheiten = data;
      (console.log("daten auf ver geschrieben"))

    });
  }
}
