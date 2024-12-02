import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AkutellsteLeistung, Placeholder, TrainingsEinheit, TrainingsSet, Uebung, User } from 'src/app/classes/trainingClasses';
import { TrainingRestService } from 'src/app/services/training-rest.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  formUebung: FormGroup;
  uebungenArray : TrainingsSet[] = [];
  public placeholder : Placeholder | null = null;

  trainingsEinheit : TrainingsEinheit | null = null;
  public uebungenOptionen: Uebung[] = [];
  public tempUebungenOptionen: Uebung[] = [];

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
              console.log('this.uebungenArray[i].uebung?.name!: ', this.uebungenArray[i].uebung?.uebung)
              let uebName : string = this.uebungenArray[i].uebung?.uebung!;

              this.formUebung.addControl('uebungName'+i, new FormControl(uebName),{});
              this.formUebung.addControl('gewicht'+i, new FormControl(this.uebungenArray[i].gewicht),{});
              this.formUebung.addControl('wiederholungen'+i, new FormControl(this.uebungenArray[i].wiederholungen),{});
              this.formUebung.addControl('comment'+i, new FormControl(this.uebungenArray[i].comment),{});

              this.formUebung.get('uebungName'+i)?.setValue(this.uebungenArray[i].uebung?.id);
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

      let result : Uebung[] = this.uebungenOptionen.filter(x => x.id == uebungId);
      if(result.length != 1){
        return;
      }

      this.uebungenArray[elementIndex].uebung = result[0];
      this.uebungenArray[elementIndex].gewicht = gewicht;
      this.uebungenArray[elementIndex].wiederholungen = wiederholungen;
      this.uebungenArray[elementIndex].comment = comment;


      if(this.checkIfFieldsAreFilled(elementIndex) && this.trainingsEinheit != null){
        this.trainingsEinheit.trainingsSets = this.uebungenArray;
        if(!this.checkIfUebungenAreComplete(this.trainingsEinheit.trainingsSets)){ return; }
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

    if(this.checkIfFieldsAreFilled(currentLastPosition)){
        this.addFControl();
        this.saveBisherigeUebungenAndAddNewTrainingsSet()
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


  saveBisherigeUebungenAndAddNewTrainingsSet(){
    if(this.trainingsEinheit != null && this.trainingsEinheit.idTrainingeinheit != null){
      this.uebungenArray.forEach(x => x.idTrainingeinheit = this.trainingsEinheit?.idTrainingeinheit!);
      this.trainingsEinheit.trainingsSets = this.uebungenArray;
      if(!this.checkIfUebungenAreComplete(this.trainingsEinheit.trainingsSets)){ return; }
      this.trainingRestService.saveTrainingsEinheit(this.trainingsEinheit).subscribe(data => {
        this.trainingsEinheit = data;
        this.uebungenArray.push(new TrainingsSet);
      });
    }
  }

  createNewTrainingseinheit(){
    let user = new User();
    user.id = this.userId;
    this.trainingsEinheit = new TrainingsEinheit();
    this.trainingsEinheit.user = user;
    this.trainingRestService.saveTrainingsEinheit(this.trainingsEinheit).subscribe(data => {
      this.trainingsEinheit = data;
      window.location.reload();
    });
  }

  checkIfUebungenAreComplete(trainingssetArray :TrainingsSet[] | null) : boolean {
    if(trainingssetArray != null && trainingssetArray.length!>0){
      let result  = trainingssetArray.filter(x => {x.uebung?.uebung == null || x.uebung?.uebung?.trim().length < 1})
      if(result != null && result.length > 0){
        return false;
      }
    }
    return true;
  }

  deleteZutat(index : number){
    let uebung : TrainingsSet = this.uebungenArray[index];
    this.trainingRestService.deleteTrainingSet(this.trainingsEinheit!.idTrainingeinheit!, uebung.uebung?.id!).subscribe(data => {
      this.uebungenArray.splice(index, 1);
      this.trainingsEinheit!.trainingsSets = this.uebungenArray;
    });
  }

  getLatestGewichtForUebung(userId: number, uebungId: number){
    this.trainingRestService.getLatestGewichtForUebung(userId, uebungId).subscribe(x => {

    });
  }

  changeUebung(index: number){
    // hole placeholder
    let uebungId : number = this.formUebung.get('uebungName' + index)?.value;
    /*
    if(this.uebungenArray.length-1 === index){
      return;
    }
    */
    if(this.userId != null && uebungId != null && this.uebungenArray.length-1 === index){
      //let uebungId : number = this.uebungenArray[index].uebung?.idUebung!
      this.trainingRestService.getLatestGewichtForUebung(this.userId, uebungId).subscribe(data => {
        let tempPlaceholder : Placeholder = new Placeholder();
        tempPlaceholder.uebungId = uebungId;
        tempPlaceholder.akutellsteLeistung = data;

        this.placeholder = tempPlaceholder;
      })
    }

    if(this.checkIfFieldsAreFilled(index) && this.trainingsEinheit != null){
      this.trainingsEinheit.trainingsSets = this.uebungenArray;
      if(!this.checkIfUebungenAreComplete(this.trainingsEinheit.trainingsSets)){ return; }

      let uebung : Uebung | null = this.getUebungById(uebungId);
      this.trainingsEinheit.trainingsSets[index].uebung = uebung;
      this.trainingRestService.saveTrainingsEinheit(this.trainingsEinheit).subscribe(data => {this.trainingsEinheit = data;
      });
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
}