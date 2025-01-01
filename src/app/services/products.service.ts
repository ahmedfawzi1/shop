import {Injectable} from '@angular/core';
import {ApisService} from './apis.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly baseurl: string = '';
  private readonly productsRoute: string = '';

  constructor(private _apisService: ApisService, private _HttpClient: HttpClient) {
    this.baseurl = _apisService.baseurl;
    this.productsRoute = _apisService.productsRoute;
  }

  getProducts(page: number = 1, limit: number = 20, sort: string = 'name', search: string): Observable<any> {
    return this._HttpClient.get(`${this.baseurl}${this.productsRoute}?page=${page}&limit=${limit}&sort=${sort}&search=${search}`, {withCredentials: true})
  }

  getProduct(productId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseurl}${this.productsRoute}/${productId}?lang=en`, {withCredentials: true})
  }
}
