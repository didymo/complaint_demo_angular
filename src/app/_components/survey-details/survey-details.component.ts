// src/app/_components/survey-details/survey-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SurveyService} from "../../_services/survey.service";

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SurveyDetailsComponent implements OnInit {
  surveyId: string;
  surveyDetails: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private surveyService: SurveyService,
  ) {
    this.surveyId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log('in the survey details');
    this.getSurveyDetail();
  }

  getSurveyDetail(): void {
    const headers = this.authService.getHeaders();
    this.surveyService.getSurvey(this.surveyId, headers).subscribe(
      (data) => {
        this.surveyDetails = data;
        console.log('Survey Details:', data);
      },
      (error) => {
        console.error('Error fetching survey details:', error);
      }
    );
  }
}
