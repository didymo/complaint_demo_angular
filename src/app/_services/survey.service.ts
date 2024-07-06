import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ListOfSurveys} from "../_classes/list-of-surveys";
import {AuthService} from "./auth.service";
import {Survey} from "../_classes/survey";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getSurveyList(): Observable<ListOfSurveys[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<ListOfSurveys[]>(environment.surveyListURL, { headers });
  }


  getSurvey(surveyId: string, headers: HttpHeaders): Observable<Survey> {
    return this.http.get<Survey>(`${environment.getSurveyURL}${surveyId}?_format=json`, { headers });
  }
}
