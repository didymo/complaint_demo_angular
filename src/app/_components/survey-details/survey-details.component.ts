// src/app/_components/survey-details/survey-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SurveyDetailsComponent implements OnInit {
  surveyId: number;
  surveyDetails: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.surveyId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.http.get(`${environment.getSurveyURL}${this.surveyId}?_format=json`, { headers: this.authService.getHeaders() })
      .subscribe(
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
