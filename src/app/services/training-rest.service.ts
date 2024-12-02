import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AkutellsteLeistung, Training, TrainingResponse, TrainingsEinheit, TrainingsSet, Uebung, User } from '../classes/trainingClasses';

@Injectable({
  providedIn: 'root'
})
export class TrainingRestService {
  constructor(private http : HttpClient) { }

  //private API_URL = 'http://localhost:4230/api/1.0/restapi'
  private API_URL = 'http://127.0.0.1:8000/'
  public getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.API_URL + '/user');
  }

  public getTrainingsByUserId(id : number): Observable<TrainingResponse>{
    return this.http.get<TrainingResponse>(this.API_URL + '/trainingsFuerUser/' + id);
  }



  public getTrainingsEinheitenByUserId(id : number): Observable<TrainingsEinheit[]>{
    return this.http.get<TrainingsEinheit[]>(this.API_URL + '/getTrainingsEinheitenByUserId/' + id);
  }

  public saveUebung(uebung: Uebung): Observable<Uebung>{
    return this.http.post<Uebung>(this.API_URL + '/uebungen', uebung);
  }

  public getAlleUebungen(): Observable<Uebung[]>{
    return this.http.get<Uebung[]>(this.API_URL + '/uebungen');
  }

  public getTrainingsEinheitDesHeutigenDatums(): Observable<TrainingsEinheit>{
    return this.http.get<TrainingsEinheit>(this.API_URL + '/getTrainingsEinheitDesHeutigenDatums');
  }

  public getTrainingsEinheitDesHeutigenDatumsFuerUser(userId : number): Observable<TrainingsEinheit[]>{
    return this.http.get<TrainingsEinheit[]>(this.API_URL + '/getTrainingsEinheitDesHeutigenDatumsFuerUser/' + userId);
  }

  public saveTrainingsEinheit(trainingsEinheit: TrainingsEinheit): Observable<TrainingsEinheit>{
    return this.http.post<TrainingsEinheit>(this.API_URL + '/saveTrainingsEinheit', trainingsEinheit);
  }

  public deleteTrainingSet(trainingsEinheit: number, uebungsNumber: number){
    return this.http.delete<TrainingsSet>(this.API_URL + '/deleteTrainingSetByTrainingsEinheitUndUebung/'+trainingsEinheit+'/'+uebungsNumber);
  }

  public getLatestGewichtForUebung(userId: number, uebungId: number) : Observable<AkutellsteLeistung> {
    return this.http.get<AkutellsteLeistung>(this.API_URL + '/getLatestGewichtForUebung/' + userId + '/' + uebungId);
  }     
}
