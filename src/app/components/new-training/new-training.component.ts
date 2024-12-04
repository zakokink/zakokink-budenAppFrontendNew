import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AkutellsteLeistung, Placeholder, Training, TrainingResponse, TrainingSaveObject, TrainingsEinheit, TrainingsSet, Uebung, User } from 'src/app/classes/trainingClasses';
import { TrainingRestService } from 'src/app/services/training-rest.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  formUebung: FormGroup;
  uebungenArray : Training[] = [];
  public placeholder : Placeholder | null = null;
  math = Math;

  public uebungenOptionen: Uebung[] = [];
  public tempUebungenOptionen: Uebung[] = [];
  public trainingArray : Training[] = [];
  public currentUser : User | null = null;
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
   
    if(this.userId){
      this.trainingRestService.getUserById(this.userId).subscribe((data : User) => {
        this.currentUser = data;
      })
    }


    this.trainingRestService.getTrainingsEinheitDesHeutigenDatumsFuerUser(this.userId).subscribe(
       (data : TrainingResponse) => {
        if(data != null && data.data != null && data.data.length > 0){
          this.trainingArray = data.data;
          if(this.trainingArray  != null && this.trainingArray.length > 0){

            this.uebungenArray = this.trainingArray;
            for(let i = 0; i<this.trainingArray.length; i++){

              let uebName : string = this.uebungenArray[i].uebung?.uebung!;

              this.formUebung.addControl('uebungName'+i, new FormControl(uebName),{});

              // Entferne unnoetige Kommastellen
              if(!isNaN(Number(this.trainingArray[i].gewicht)) && (Number(this.trainingArray[i].gewicht) %1 == 0)){
                this.trainingArray[i].gewicht = String(this.math.trunc(Number(this.trainingArray[i].gewicht)));
              }

              this.formUebung.addControl('gewicht'+i, new FormControl(this.trainingArray[i].gewicht),{});
              this.formUebung.addControl('wiederholungen'+i, new FormControl(this.trainingArray[i].wiederholungen),{});
              this.formUebung.addControl('comment'+i, new FormControl(this.trainingArray[i].comment),{});

              this.formUebung.get('uebungName'+i)?.setValue(this.trainingArray[i].uebung?.id);
              this.formUebung.get('gewicht'+i)?.setValue(this.trainingArray[i].gewicht);
              this.formUebung.get('wiederholungen'+i)?.setValue(this.trainingArray[i].wiederholungen);
              this.formUebung.get('comment'+i)?.setValue(this.trainingArray[i].comment);
            }
            this.addNewUebung(null);
          } else {
            this.uebungenArray.push(new Training());
            this.addFControl();
          }
        } else {
          this.uebungenArray.push(new Training());
          this.addFControl();
        }
      }
    );
  }

  addFControl(){
    this.formUebung.addControl('uebungName'+this.trainingArray.length, new FormControl(''),{});
    this.formUebung.addControl('gewicht'+this.trainingArray.length, new FormControl(''),{});
    this.formUebung.addControl('wiederholungen'+this.trainingArray.length, new FormControl(''),{});
    this.formUebung.addControl('comment'+this.trainingArray.length, new FormControl(''),{});
  }

  addNewUebung(elementIndex : number | null){
    if(elementIndex != null && elementIndex != this.uebungenArray.length-1){
      let uebungId : number = this.formUebung.get('uebungName'+elementIndex)?.value;
      let gewicht : string = this.formUebung.get('gewicht'+elementIndex)?.value;
      let wiederholungen : string = this.formUebung.get('wiederholungen'+elementIndex)?.value;
      let comment : string = this.formUebung.get('comment'+elementIndex)?.value;

      let result : Uebung[] = this.uebungenOptionen.filter(x => x.id == uebungId);
      if(result.length != 1){
        return;
      }

      this.uebungenArray[elementIndex].uebung = result[0];
      this.uebungenArray[elementIndex].gewicht = gewicht;
      this.uebungenArray[elementIndex].wiederholungen = wiederholungen;
      this.uebungenArray[elementIndex].comment = comment;

      if(this.checkIfFieldsAreFilled(elementIndex) && this.trainingArray != null){
        if(!this.checkIfUebungenAreComplete(this.trainingArray)){ return; }
        let uebung : Uebung | null = this.getUebungById(uebungId);
        this.trainingArray[elementIndex].uebung = uebung;
        if(this.trainingArray[elementIndex].uebung && this.userId){
          let trainingSaveObject :TrainingSaveObject = this.createDto(this.uebungenArray[elementIndex]);
          this.trainingRestService.updateTraining(trainingSaveObject).subscribe(data => {console.log('Update Successful')});    
        }
        
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
    uebung.id = uebungId;

    let result: Uebung[] = this.uebungenOptionen.filter(x => x.id == uebungId);
    if(result.length == 1){
      uebung.uebung = result[0].uebung;
      uebung.maxWiederholungen = result[0].maxWiederholungen;
      uebung.minWiederholungen = result[0].minWiederholungen;
      uebung.comment = result[0].comment;
    }

    this.uebungenArray[currentLastPosition].uebung = uebung;
    this.uebungenArray[currentLastPosition].gewicht = gewicht;
    this.uebungenArray[currentLastPosition].wiederholungen = wiederholungen;
    this.uebungenArray[currentLastPosition].comment = comment;
    
    this.addFControl();
    
    if(this.checkIfFieldsAreFilled(currentLastPosition)){
        this.addFControl();
        this.saveUebung(currentLastPosition);
      }
  }

  checkIfFieldsAreFilled(position: number): boolean{
    let uebungId : number = this.formUebung.get('uebungName' + position)?.value;
    let gewicht : string = this.formUebung.get('gewicht' + position)?.value;
    let wiederholungen : string = this.formUebung.get('wiederholungen' + position)?.value;

    return uebungId != undefined &&
    gewicht.trim().length > 0 &&
    wiederholungen.trim().length > 0
  }

  saveUebung(currentLastPosition : number){
    
    let uebungToSave : Training = this.uebungenArray[currentLastPosition];
    
    if(uebungToSave != null && uebungToSave != undefined && uebungToSave.id == undefined){
      let user = new User();
      user.id = this.userId;
      var datePipe = new DatePipe("en-US");
      let newDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
      uebungToSave.uebung?.id
      uebungToSave.user = user;
      uebungToSave.date = newDate;
      let trainingSaveObject : TrainingSaveObject = this.createDto(uebungToSave);

      this.trainingRestService.saveTraining(trainingSaveObject).subscribe(data => {
        console.log('Data saved')
      });
    }
    this.uebungenArray.push(new Training);
     }

  checkIfUebungenAreComplete(trainingArray :Training[] | null) : boolean {
    if(trainingArray != null && trainingArray.length!>0){
      let result  = trainingArray.filter(x => {x.uebung?.uebung == null || x.uebung?.uebung?.trim().length < 1})
      if(result != null && result.length > 0){
        return false;
      }
    }
    return true;
  }

  
  deleteUebung(index : number){
    let uebung : Training = this.uebungenArray[index];
    if(uebung && uebung.id){
      this.trainingRestService.deleteTraining(uebung.id).subscribe(data => {
        this.uebungenArray.splice(index, 1);
      });
    }
  }

  getLatestGewichtForUebung(userId: number, uebungId: number){
    this.trainingRestService.getLatestGewichtForUebung(userId, uebungId).subscribe(x => {

    });
  }

  changeUebung(index: number){
    // hole placeholder
    let uebungId : number = this.formUebung.get('uebungName' + index)?.value;
    let uebungIdNumber : number = +uebungId;
    if(this.userId != null && uebungId != null && this.uebungenArray.length-1 === index){

      this.trainingRestService.getLatestGewichtForUebungNew(this.userId, uebungIdNumber).subscribe(data => {
        let tempPlaceholder : Placeholder = new Placeholder();
        tempPlaceholder.uebungId = uebungId;
        let aktuelleLeistung : AkutellsteLeistung = new AkutellsteLeistung()
        // Wenn historische Daten vorhanden sind, wird placeholder gesetzt
        if(data.data != null && data.data.gewicht != null && data.data.wiederholungen != null){
          aktuelleLeistung.gewicht = data.data.gewicht;
          
          // Entferne unnoetige Kommastellen
          if(!isNaN(Number(data.data.gewicht)) && (Number(data.data.gewicht) %1 == 0)){
            aktuelleLeistung.gewicht = String(this.math.trunc(Number(data.data.gewicht)));
          }
          
          aktuelleLeistung.wiederholungen = data.data.wiederholungen;
          // Check ob das Gewicht zu erhoehen ist
          let uebung = this.getUebungById(uebungId);
          if(uebung && uebung.maxWiederholungen && !isNaN(Number(aktuelleLeistung.wiederholungen))){
            if(Number(aktuelleLeistung.wiederholungen) >= uebung.maxWiederholungen){
              aktuelleLeistung.gewicht += ' ↑';
            }           
          }
          
          tempPlaceholder.akutellsteLeistung = aktuelleLeistung;
          this.placeholder = tempPlaceholder;
        } else {
          // Falls keine Historischen Daten verfuegbar sind, wird placeholder wieder geloescht
          this.placeholder = null;
        }
      })
    }
    // Speichere das Training falls es komplett ist
    if(this.checkIfFieldsAreFilled(index) && this.trainingArray != null){
      if(!this.checkIfUebungenAreComplete(this.trainingArray)){ return; }
      let uebung : Uebung | null = this.getUebungById(uebungId);
      this.trainingArray[index].uebung = uebung;
      if(this.trainingArray[index].uebung && this.userId){
        let trainingSaveObject :TrainingSaveObject = this.createDto(this.uebungenArray[index]);
        this.trainingRestService.updateTraining(trainingSaveObject).subscribe(data => {console.log('Update Successful')});    
      }
      
    }
    
  }
  
  private getUebungById(id: number) : Uebung | null{
    let uebung : Uebung = new Uebung();
    let result: Uebung[] = this.uebungenOptionen.filter(x => x.id == id);
    if(result.length == 1){
      uebung.id = id;
      uebung.uebung = result[0].uebung;
      uebung.maxWiederholungen = result[0].maxWiederholungen;
      uebung.minWiederholungen = result[0].minWiederholungen;
      uebung.comment = result[0].comment;
      return uebung;
    }
    return null;
  }
 public checkOptionDisabled(uebung : Uebung): boolean {
  let result : TrainingsSet[] = this.uebungenArray.filter(x => x.uebung?.id == uebung.id);
  if(result != null && result.length > 0){
    return true;
  }
  return false;
 }

  private createDto(training: Training): TrainingSaveObject {
    let trainingSaveObject: TrainingSaveObject = new TrainingSaveObject();
    trainingSaveObject.comment = training.comment;
    trainingSaveObject.date = training.date;
    trainingSaveObject.gewicht = this.entfernePunktAusDezimalzahl(training.gewicht);
    if(training.id != undefined || training.id != null){
      trainingSaveObject.id = training.id;
    }

    trainingSaveObject.uebung = training.uebung!.id;
    trainingSaveObject.user = training.user!.id;
    trainingSaveObject.wiederholungen = training.wiederholungen;

    return trainingSaveObject;
  } 

  private entfernePunktAusDezimalzahl(dezZahl : string | null): string | null {
    if(dezZahl && dezZahl.includes(',')){
      return dezZahl.replace(',', '.');  
    }
    return dezZahl;
  }
}
