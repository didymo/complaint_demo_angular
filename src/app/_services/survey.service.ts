import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ListOfSurveys} from "../_classes/list-of-surveys";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getSurveyList(): Observable<ListOfSurveys[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<ListOfSurveys[]>(environment.surveyListURL, { headers });
  }
}
