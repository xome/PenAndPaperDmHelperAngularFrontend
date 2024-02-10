import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GenericDataService {
  baseUrl: string = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {
  }

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.httpClient
      .get<T>(this.baseUrl + url, {params});
  }

  post<T>(url: string, object: T, params?: HttpParams): Observable<T> {
    return this.httpClient
      .post<T>(this.baseUrl + url, object, {params});
  }

  put<T>(url: string, object: T, params?: HttpParams): Observable<T> {
    return this.httpClient
      .put<T>(this.baseUrl + url, object, {params});
  }

  delete<T>(url: string, params?: HttpParams): Observable<T> {
    return this.httpClient
      .delete<T>(this.baseUrl + url, {params});
  }

  patch<T>(url: string, object: T, params?: HttpParams): Observable<T> {
    return this.httpClient
      .patch<T>(this.baseUrl + url, object, {params});
  }
}
