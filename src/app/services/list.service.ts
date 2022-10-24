import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Capital } from './../list/list';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getCapitals(): Observable<Capital[]> {
    return this.http.get<Capital[]>('../../assets/db.json');
  }

}
