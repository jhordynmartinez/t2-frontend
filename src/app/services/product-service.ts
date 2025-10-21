import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private url: string = `${environment.HOST}/products`;
  private productChange: Subject<Product[]> = new Subject<Product[]>();
  private messageChange: Subject<string> = new Subject<string>();

  findAll(){
    return this.http.get<Product[]>(this.url);
  }

  findById(id: number){
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  save(product: Product){
    return this.http.post(this.url, product);
  }

  update(product: Product){
    return this.http.put<Product>(`${this.url}/${product.idProduct}`, product);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  ////////////////////
  setProductChange(data: Product[]){
    this.productChange.next(data);
  }

  getProductChange(){
    return this.productChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}