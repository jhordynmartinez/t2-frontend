import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http: HttpClient) { }

  private url: string = `${environment.HOST}/categories`;

  findAll(){
    return this.http.get<Category[]>(this.url);
  }
}