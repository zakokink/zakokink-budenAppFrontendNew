import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Uebung } from 'src/app/classes/trainingClasses';
import { TrainingRestService } from 'src/app/services/training-rest.service';

@Component({
  selector: 'app-new-uebung',
  templateUrl: './new-uebung.component.html',
  styleUrls: ['./new-uebung.component.css']
})
export class NewUebungComponent implements OnInit {

  uebungFormGroup : FormGroup;
  constructor(private trainingService: TrainingRestService, private router: Router) {
    this.uebungFormGroup = new FormGroup({
      uebungName: new FormControl(''),
      uebungComment: new FormControl(''),
      uebungMinWiederholungen: new FormControl(''),
      uebungMaxWiederholungen: new FormControl('')
      
    });
   }

  ngOnInit(): void {
  }

  saveUebung(){
    let uebungName : string = this.uebungFormGroup.get('uebungName')?.value;  
    let uebungMinWiederholungen : number = this.uebungFormGroup.get('uebungMinWiederholungen')?.value;  
    let uebungMaxWiederholungen : number = this.uebungFormGroup.get('uebungMaxWiederholungen')?.value;  
    let uebungComment : string = this.uebungFormGroup.get('uebungComment')?.value;  

    if(uebungName.trim().length > 0){
      let uebung : Uebung = new Uebung();
      uebung.name = uebungName;
      uebung.comment = uebungComment;
      uebung.minWiederholungen = uebungMinWiederholungen;
      uebung.maxWiederholungen = uebungMaxWiederholungen;
      
      console.log('uebung.minWiederholungen ', uebung.minWiederholungen );
      console.log('uebung.maxWiederholungen ', uebung.maxWiederholungen );
      console.log('uebung.comment ', uebung.comment );
     
      this.trainingService.saveUebung(uebung).subscribe(data => 
        { console.log('Uebung : ' + data.name + 'gespeichert' )
          this.router.navigate(['']); });
      

    }


      

  }

}
