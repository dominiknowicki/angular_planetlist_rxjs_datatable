import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Planet} from '../models/Planet';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {BaseResponse} from '../models/BaseResponse';
import {ApiConfig} from '../../shared/ApiConfig';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) {
  }

  /** GET Planet[] from the server */
  getPlanetList(url: string): Observable<BaseResponse<Planet[]>> {
    return this.http.get<BaseResponse<Planet[]>>(url)
      .pipe(
        tap(result => this.log(`fetched planet ${result.count} list`)),
        catchError(this.handleError<BaseResponse<Planet[]>>('getPlanetList', new BaseResponse<Planet[]>()))
      );
  }

  /** GET single Planet model from the server */
  getPlanet(id: number): Observable<Planet> {
    return this.http.get<Planet>(ApiConfig.planetsUrl + id + '/')
      .pipe(
        tap(_ => this.log(`fetched planet with id: ${id}`)),
        catchError(this.handleError<Planet>('getPlanetList', new Planet()))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /**
   * Custom log
   *  @param message - error message that will be logged
   */
  private log(message: string) {
    console.log(`DataService: ${message}`);
    // TODO: report to a report tool
  }
}
