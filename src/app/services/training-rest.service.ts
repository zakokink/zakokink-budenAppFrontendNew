import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AkutellsteLeistung, AkutellsteLeistungResponse, Training, TrainingResponse, TrainingSaveObject, TrainingsEinheit, TrainingsSet, Uebung, User } from '../classes/trainingClasses';

@Injectable({
  providedIn: 'root'
})
export class TrainingRestService {
  constructor(private http : HttpClient) { }

  //private API_URL = 'http://localhost:4230/api/1.0/restapi'

  //private API_URL = 'http://127.0.0.1:8000'
  //private API_URL = 'http://192.168.0.115:4236'
  private API_URL = 'http://80.108.240.70:4236'
  
public getAllUsers(): Observable<User[]>{

    console.log('url', this.API_URL + '/user');
    return this.http.get<User[]>(this.API_URL + '/user');
  }
  
  public getAlleUebungen(): Observable<Uebung[]>{
    return this.http.get<Uebung[]>(this.API_URL + '/uebungen');
  }


  
  public getUserById(id : number): Observable<User>{
    return this.http.get<User>(this.API_URL + '/user/' + id);
  }

  public getTrainingsByUserId(id : number): Observable<TrainingResponse>{
    return this.http.get<TrainingResponse>(this.API_URL + '/trainingsFuerUser/' + id);
  }

  public getTrainingsEinheitDesHeutigenDatumsFuerUser(userId : number): Observable<TrainingResponse>{
    return this.http.get<TrainingResponse>(this.API_URL + '/trainingsEinheitDesHeutigenDatumsFuerUser/' + userId);
  }

  public saveTraining(training: TrainingSaveObject): Observable<TrainingSaveObject>{
    return this.http.post<TrainingSaveObject>(this.API_URL + '/trainingViewset', training);
  }

  public getLatestGewichtForUebungNew(userId: number, uebungId: number) : Observable<AkutellsteLeistungResponse> {
    let string = this.API_URL + '/letztesGewicht/' + userId + '/' + uebungId;
    console.log('query: ', string)
    return this.http.get<AkutellsteLeistungResponse>(this.API_URL + '/latestGewichtWiederholungen/' + userId + '/' + uebungId);
  }     

  public updateTraining(training: TrainingSaveObject): Observable<TrainingSaveObject>{
    return this.http.put<TrainingSaveObject>(this.API_URL + '/trainingViewset/' + training.id, training);
  }

  public deleteTraining(trainingId: number){
    return this.http.delete<Training>(this.API_URL + '/trainingViewset/'+ trainingId);
  }

  public saveUser(user: User): Observable<User>{
    return this.http.post<User>(this.API_URL + '/user', user);
  }

  public deleteUebung(uebungId: number){
    return this.http.delete<Uebung>(this.API_URL + '/uebungen/'+ uebungId);
  }

  public saveUebung(uebung: Uebung): Observable<Uebung>{
    return this.http.post<Uebung>(this.API_URL + '/uebungen', uebung);
  }

  
  // **** Alte Methoden ****
  public getTrainingsEinheitenByUserId(id : number): Observable<TrainingsEinheit[]>{
    return this.http.get<TrainingsEinheit[]>(this.API_URL + '/getTrainingsEinheitenByUserId/' + id);
  }



  public getTrainingsEinheitDesHeutigenDatums(): Observable<TrainingsEinheit>{
    return this.http.get<TrainingsEinheit>(this.API_URL + '/getTrainingsEinheitDesHeutigenDatums');
  }

  public getTrainingsEinheitDesHeutigenDatumsFuerUserAlt(userId : number): Observable<TrainingsEinheit[]>{
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
