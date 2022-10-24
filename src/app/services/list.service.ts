import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Capitals } from './../list/list';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  private baseUrl: string = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  getCapitals(): Observable<Capitals[]> {
    return this.http.get<Capitals[]>(this.baseUrl + 'capitals')
  }

}
