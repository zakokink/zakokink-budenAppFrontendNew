import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllTrainingEinheitenComponent } from './components/all-training-einheiten/all-training-einheiten.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { NewUebungComponent } from './components/new-uebung/new-uebung.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { AllUebungenComponent } from './components/all-uebungen/all-uebungen.component';


const routes: Routes = [
  {  path: 'alleTrainingseinheiten/:id', component: AllTrainingEinheitenComponent },
  {  path: 'allUsers', component: AllUsersComponent },
  { path: 'newUebung', component: NewUebungComponent },
  { path: 'newTraining/:id', component: NewTrainingComponent },
  { path: 'newUser', component: NewUserComponent },
  { path: 'allUebungen', component: AllUebungenComponent },
  
  { path: '', component: StartScreenComponent}
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
