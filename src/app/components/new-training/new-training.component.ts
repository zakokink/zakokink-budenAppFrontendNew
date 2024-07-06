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
    //this.uebungenArray.push(new TrainingsSet);

    this.trainingRestService.getTrainingsEinheitDesHeutigenDatumsFuerUser(this.userId).subscribe(
       data => {  
        if(data.length > 0){
          this.trainingsEinheit = data[0];
          if(this.trainingsEinheit.trainingsSets != null && this.trainingsEinheit.trainingsSets.length > 0){
            this.uebungenArray = this.trainingsEinheit.trainingsSets;
            console.log('uebungenArray: ' , this.uebungenArray)        
          
            for(let i = 0; i<this.uebungenArray.length; i++ ){

              console.log('this.uebungenArray[i]: ', this.uebungenArray[i])
              console.log('this.uebungenArray[i].uebung: ',this.uebungenArray[i].uebung )
              console.log('this.uebungenArray[i].uebung?.name!: ', this.uebungenArray[i].uebung?.name)
              let uebName : string = this.uebungenArray[i].uebung?.name!;

              //this.formGericht.addControl('zutatName'+i, new FormControl(this.rezept.gerichtZutaten[i].zutat?.name),{});
              this.formUebung.addControl('uebungName'+i, new FormControl(uebName),{});
              this.formUebung.addControl('gewicht'+i, new FormControl(this.uebungenArray[i].gewicht),{});
              this.formUebung.addControl('wiederholungen'+i, new FormControl(this.uebungenArray[i].wiederholungen),{});
              this.formUebung.addControl('comment'+i, new FormControl(this.uebungenArray[i].comment),{});

              this.formUebung.get('uebungName'+i)?.setValue(this.uebungenArray[i].uebung?.idUebung);
              this.formUebung.get('gewicht'+i)?.setValue(this.uebungenArray[i].gewicht);
              this.formUebung.get('wiederholungen'+i)?.setValue(this.uebungenArray[i].wiederholungen);
              this.formUebung.get('comment'+i)?.setValue(this.uebungenArray[i].comment);
            }
            this.addNewUebung(null);
          } else {
            this.uebungenArray.push(new TrainingsSet());
            this.addFControl();
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

  addNewUebung(elementIndex : number | null){

    if(elementIndex != null &&   elementIndex != this.uebungenArray.length-1){
      let uebungId : number = this.formUebung.get('uebungName'+elementIndex)?.value;  
      let gewicht : string = this.formUebung.get('gewicht'+elementIndex)?.value;  
      let wiederholungen : string = this.formUebung.get('wiederholungen'+elementIndex)?.value; 
      let comment : string = this.formUebung.get('comment'+elementIndex)?.value; 

      this.uebungenArray[elementIndex].idTrainingeinheit = this.trainingsEinheit?.idTrainingeinheit!;
      
      let result : Uebung[] = this.uebungenOptionen.filter(x => x.idUebung == uebungId);
      if(result.length != 1){
        return;
      }
    
      this.uebungenArray[elementIndex].uebung = result[0];       
      this.uebungenArray[elementIndex].gewicht = gewicht;
      this.uebungenArray[elementIndex].wiederholungen = wiederholungen;
      this.uebungenArray[elementIndex].comment = comment;

      if(this.checkIfFieldsAreFilled(elementIndex) && this.trainingsEinheit != null){
        this.trainingsEinheit.trainingsSets = this.uebungenArray;
        this.trainingRestService.saveTrainingsEinheit(this.trainingsEinheit).subscribe(data => {this.trainingsEinheit = data;
      
      });
    
      }

      return;
    } 


    let currentLastPosition = this.uebungenArray.length-1
   
    // write HTML to Uebung Object
    let uebungId : number = this.formUebung.get('uebungName'+currentLastPosition)?.value;  
    let gewicht : string = this.formUebung.get('gewicht'+currentLastPosition)?.value;  
    let wiederholungen : string = this.formUebung.get('wiederholungen'+currentLastPosition)?.value; 
    let comment : string = this.formUebung.get('comment'+currentLastPosition)?.value; 

    let uebung: Uebung = new Uebung;
    uebung.idUebung = uebungId;

    let result: Uebung[] = this.uebungenOptionen.filter(x => x.idUebung == uebungId);
    if(result.length == 1){
      uebung.name = result[0].name;
      uebung.maxWiederholungen = result[0].maxWiederholungen;
      uebung.minWiederholungen = result[0].minWiederholungen;
      uebung.comment = result[0].comment;        
    }

    this.uebungenArray[currentLastPosition].uebung = uebung;
    this.uebungenArray[currentLastPosition].gewicht = gewicht;
    this.uebungenArray[currentLastPosition].wiederholungen = wiederholungen;
    this.uebungenArray[currentLastPosition].comment = comment;
    
    if(this.checkIfFieldsAreFilled(currentLastPosition)){
    
        this.addFControl();      
        this.saveBisherigeUebungenAndAddNewTrainingsSet()
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


  saveBisherigeUebungenAndAddNewTrainingsSet(){

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
    this.trainingRestService.saveTrainingsEinheit(this.trainingsEinheit).subscribe(data => {
      this.trainingsEinheit = data;
    });
  }
}
