import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { min } from 'rxjs';
import { Uebung } from 'src/app/classes/trainingClasses';
import { TrainingRestService } from 'src/app/services/training-rest.service';

@Component({
  selector: 'app-all-uebungen',
  templateUrl: './all-uebungen.component.html',
  styleUrls: ['./all-uebungen.component.css']
})
export class AllUebungenComponent implements OnInit {
  uebungenArray : Uebung[] = [];

  formUebungen: FormGroup;
  formNeueUebung: FormGroup;
  
  constructor(private trainingRestService: TrainingRestService,private route: ActivatedRoute, private router: Router) { 
    this.formUebungen = new FormGroup({
      uebung0: new FormControl(''),
      minWiederholungen0: new FormControl(''),
      maxWiederholungen0: new FormControl(''),
      comment0: new FormControl('')
    });
    this.formNeueUebung = new FormGroup({
      uebung: new FormControl(''),
      minWiederholungen: new FormControl(''),
      maxWiederholungen: new FormControl(''),
      comment: new FormControl('')
    });

  }

  ngOnInit(): void {
   this.trainingRestService.getAlleUebungen().subscribe(data => {
    this.uebungenArray = data;
    console.log(this.uebungenArray)

    for(let i = 0; i<this.uebungenArray.length; i++){

      //let uebName : string = this.uebungenArray[i].uebung!;

      this.formUebungen.addControl('uebung'+i, new FormControl(this.uebungenArray[i].uebung!),{});
      this.formUebungen.addControl('minWiederholungen'+i, new FormControl(this.uebungenArray[i].minWiederholungen),{});
      this.formUebungen.addControl('maxWiederholungen'+i, new FormControl(this.uebungenArray[i].maxWiederholungen),{});
      this.formUebungen.addControl('comment'+i, new FormControl(this.uebungenArray[i].comment),{});

      this.formUebungen.get('uebung'+i)?.setValue(this.uebungenArray[i].uebung);
      this.formUebungen.get('minWiederholungen'+i)?.setValue(this.uebungenArray[i].minWiederholungen);
      this.formUebungen.get('maxWiederholungen'+i)?.setValue(this.uebungenArray[i].maxWiederholungen);
      this.formUebungen.get('comment'+i)?.setValue(this.uebungenArray[i].comment);
    }
  })
  }

  deleteUebung(index: number){
    this.trainingRestService.deleteUebung(index).subscribe
    let uebung : Uebung = this.uebungenArray[index];
    if(uebung && uebung.id){
      this.trainingRestService.deleteUebung(uebung.id).subscribe(data => {
        this.uebungenArray.splice(index, 1);
      });
    }
  }

  addUebung(){
    console.log("addUebung")
    let uebung : string | null = this.formNeueUebung.get('uebung')?.value;    
    let minWiederholungen : string | null = this.formNeueUebung.get('minWiederholungen')?.value;
    let maxWiederholungen : string | null = this.formNeueUebung.get('maxWiederholungen')?.value;
    let comment : string | null = this.formNeueUebung.get('comment')?.value;
    
    if(uebung == undefined || uebung == null || uebung.trim().length < 1){
        return;
    }
    
    let neueUebung = new Uebung();
    neueUebung.uebung = uebung;
    if(minWiederholungen && !isNaN(Number(minWiederholungen))){
      neueUebung.minWiederholungen = Number(minWiederholungen);
    }
    if(maxWiederholungen && !isNaN(Number(maxWiederholungen))){
      neueUebung.maxWiederholungen = Number(maxWiederholungen);
    }

    neueUebung.comment = comment;
    
    this.trainingRestService.saveUebung(neueUebung).subscribe(data => {
      this.uebungenArray.push(neueUebung);
    });
  }

}
