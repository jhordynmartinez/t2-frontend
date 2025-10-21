import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Family } from '../model/family';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(private http: HttpClient) { }

  private url: string = `${environment.HOST}/families`;

  findAll(){
    return this.http.get<Family[]>(this.url);
  }
}