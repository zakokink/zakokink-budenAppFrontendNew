import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllTrainingEinheitenComponent } from './components/all-training-einheiten/all-training-einheiten.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { NewUebungComponent } from './components/new-uebung/new-uebung.component';


const routes: Routes = [
  {  path: 'alleTrainingseinheiten/:id', component: AllTrainingEinheitenComponent },
  {  path: 'allUsers', component: AllUsersComponent },
  { path: 'newUebung', component: NewUebungComponent }
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
