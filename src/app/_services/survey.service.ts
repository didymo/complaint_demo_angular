import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {ListOfSurveys} from "../_classes/list-of-surveys";
import {AuthService} from "./auth.service";
import {Survey} from "../_classes/survey";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getSurveyList(): Observable<ListOfSurveys[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<ListOfSurveys[]>(environment.surveyListURL, {headers});
  }


  getSurvey(surveyId: string, headers: HttpHeaders): Observable<Survey> {
    return this.http.get<Survey>(`${environment.getSurveyURL}${surveyId}?_format=json`, {headers});
  }

  /** PATCH: add a new project to drupal */
  /**
   * @param survey
   * The payload
   */
  addSurvey(payload: string): Observable<any> {
    console.log(payload);
    return this.http
      .patch<string>(environment.surveysURL, payload, {headers: this.authService.getHeaders()})
      .pipe(
        tap(_ => console.log(`updated Survey id`)),
        catchError(this.handleError<any>('addSurvey', payload))
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
