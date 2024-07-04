import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';
import { environment } from '../../../environments/environment';
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from '@angular/router';
import {ListOfSurveys} from "../../_classes/list-of-surveys";
import {SurveyService} from "../../_services/survey.service";

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.css'
})


export class SurveyListComponent implements OnInit {
  surveys: ListOfSurveys[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private surveyService: SurveyService) {}

  ngOnInit(): void {
    console.log('in the survey list');
    this.getSurveyList();
  }

  getSurveyList(): void {
    this.surveyService.getSurveyList().subscribe({
      next: (data) => this.surveys = data,
      error: (err) => console.error('Error fetching surveys', err)
    });
  }
}
