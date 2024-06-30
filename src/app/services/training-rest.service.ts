import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingsEinheit, Uebung, User } from '../classes/trainingClasses';

@Injectable({
  providedIn: 'root'
})
export class TrainingRestService {
  constructor(private http : HttpClient) { }

  private API_URL = 'http://localhost:4230/api/1.0/restapi'

  public getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.API_URL + '/getAllUsers');
  }

  public getTrainingsEinheitenByUserId(id : number): Observable<TrainingsEinheit[]>{
    return this.http.get<TrainingsEinheit[]>(this.API_URL + '/getTrainingsEinheitenByUserId/' + id);
  }

  public saveUebung(uebung: Uebung): Observable<Uebung>{
    return this.http.post<Uebung>(this.API_URL + '/saveUebung', uebung);
  }

  

}
