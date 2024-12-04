import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AllTrainingEinheitenComponent } from './components/all-training-einheiten/all-training-einheiten.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { NewUebungComponent } from './components/new-uebung/new-uebung.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    AllTrainingEinheitenComponent,
    AllUsersComponent,
    NewUebungComponent,
    NewTrainingComponent,
    StartScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
