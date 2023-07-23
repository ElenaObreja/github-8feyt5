import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'assets/products.json';

  constructor(private httpClient: HttpClient) {}

  public getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.productUrl).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side or network error occured: ${error.error.message}`;
    } else {
      //unsuccessful return code
      errorMessage = `Server returned code: ${error.status}, and error message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
