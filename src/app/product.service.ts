import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../environments/environment';

@Injectable()
export class ProductService {

  baseUrlApp: string;
  constructor(
    private http : HttpClient
  ) {
    this.baseUrlApp = environment.baseUrl;
   }

  createProduct(data: any) {
    return this.http.post<any>(this.baseUrlApp + '/api/product', data, { });
  }

  updateProduct(id, data) {
    return this.http.put<any>(this.baseUrlApp + '/api/product/' + id, data, { });
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(this.baseUrlApp + '/api/deleteProduct/' + id, { });
  }

  getProducts() : any {
    return this.http.get<any>(this.baseUrlApp + '/api/products', { });
  }

  getProduct(id) : any {
    return this.http.get<any>(this.baseUrlApp + '/api/getProduct' + id, { });
  }

}
