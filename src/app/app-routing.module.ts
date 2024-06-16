import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllTrainingEinheitenComponent } from './components/all-training-einheiten/all-training-einheiten.component';

const routes: Routes = [
  {  path: 'alleTrainingseinheiten/:id', component: AllTrainingEinheitenComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
