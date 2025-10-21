import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Laboratory } from '../model/laboratory';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  constructor(private http: HttpClient) { }

  private url: string = `${environment.HOST}/laboratories`;

  findAll(){
    return this.http.get<Laboratory[]>(this.url);
  }
}