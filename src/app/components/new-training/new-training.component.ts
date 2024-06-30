import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingsEinheit, TrainingsSet, Uebung, User } from 'src/app/classes/trainingClasses';
import { TrainingRestService } from 'src/app/services/training-rest.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  formUebung: FormGroup;
  uebungenArray : TrainingsSet[] = [];
  trainingsEinheit : TrainingsEinheit | null = null;
  public uebungenOptionen: Uebung[] = [];
  userId : number | null = null;

  constructor(private trainingRestService: TrainingRestService,private route: ActivatedRoute, private router: Router ) { 
    this.formUebung = new FormGroup({
      uebungName0: new FormControl(''),
      gewicht0: new FormControl(''),
      wiederholungen0: new FormControl(''),
      comment0: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!
    this.trainingRestService.getAlleUebungen().subscribe(data => {
      this.uebungenOptionen = data;
    })
    this.uebungenArray.push(new TrainingsSet);

    this.trainingRestService.getTrainingsEinheitDesHeutigenDatumsFuerUser(this.userId).subscribe(
       data => {  
        if(data.length > 0){
          this.trainingsEinheit = data[0];
          if(this.trainingsEinheit.trainingsSets != null){
            this.uebungenArray = this.trainingsEinheit.trainingsSets;
            console.log('uebungenArray: ' , this.uebungenArray)
          }
          
        } else {
          this.createNewTrainingseinheit();
        }
      }
    );
  }

  addFControl(){
    this.formUebung.addControl('uebungName'+this.uebungenArray.length, new FormControl(''),{});
    this.formUebung.addControl('gewicht'+this.uebungenArray.length, new FormControl(''),{});
    this.formUebung.addControl('wiederholungen'+this.uebungenArray.length, new FormControl(''),{});
    this.formUebung.addControl('comment'+this.uebungenArray.length, new FormControl(''),{});
  }

  addNewUebung(index : number){
    let currentLastPosition = this.uebungenArray.length-1
   
    // write HTML to Uebung Object
    let uebungId : number = this.formUebung.get('uebungName'+currentLastPosition)?.value;  
    let gewicht : string = this.formUebung.get('gewicht'+currentLastPosition)?.value;  
    let wiederholungen : string = this.formUebung.get('wiederholungen'+currentLastPosition)?.value; 
    let comment : string = this.formUebung.get('comment'+currentLastPosition)?.value; 

    let uebung: Uebung = new Uebung;
    uebung.idUebung = uebungId;

    this.uebungenArray[currentLastPosition].uebung = uebung;
    this.uebungenArray[currentLastPosition].gewicht = gewicht;
    this.uebungenArray[currentLastPosition].wiederholungen = wiederholungen;
    this.uebungenArray[currentLastPosition].comment = comment;
    
    if(this.checkIfFieldsAreFilled(currentLastPosition)){
    
        this.addFControl();      
        this.saveBisherigeUebungen()
        console.log('array: ', this.uebungenArray)
      
        console.log('array: ', this.uebungenArray)

      }
      //this.addFControl();
     

  }

  checkIfFieldsAreFilled(position: number): boolean{
    let uebungId : number = this.formUebung.get('uebungName' + position)?.value;  
    let gewicht : string = this.formUebung.get('gewicht' + position)?.value;  
    let wiederholungen : string = this.formUebung.get('wiederholungen' + position)?.value; 
 
    return uebungId != undefined && 
    gewicht.trim().length > 0 &&
    wiederholungen.trim().length > 0       
  } 


  saveBisherigeUebungen(){

    console.log('saveBisherigeUebungen trainingsEinheit: ', this.trainingsEinheit);
    if(this.trainingsEinheit != null && this.trainingsEinheit.idTrainingeinheit != null){
      this.uebungenArray.forEach(x => x.idTrainingeinheit = this.trainingsEinheit?.idTrainingeinheit!);
      this.trainingsEinheit.trainingsSets = this.uebungenArray;
      this.trainingRestService.saveTrainingsEinheit(this.trainingsEinheit).subscribe(data => {this.trainingsEinheit = data;
        this.uebungenArray.push(new TrainingsSet);
      });
    
    }
    //this.trainingRestService.
  }

  createNewTrainingseinheit(){
    let user = new User(); 
    user.userId = this.userId;
    this.trainingsEinheit = new TrainingsEinheit();
    
    this.trainingsEinheit.user = user;
    //this.trainingsEinheit.trainingsSets = this.uebungenArray;
    this.trainingRestService.saveTrainingsEinheit(this.trainingsEinheit).subscribe(data => {
      this.trainingsEinheit = data;
      console.log('ID: ', this.trainingsEinheit.idTrainingeinheit);
    });
    

    //console.log('new trainingsEinheit: ', this.trainingsEinheit);
  }
}
