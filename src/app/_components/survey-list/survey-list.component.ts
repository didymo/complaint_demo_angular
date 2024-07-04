import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';
import { environment } from '../../../environments/environment';
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.css'
})


export class SurveyListComponent implements OnInit {
  surveys: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    console.log('in the survey list');
    this.getSurveyList();
  }

  getSurveyList(): void {
    this.http.get<any[]>(environment.surveyListURL, { headers: this.authService.getHeaders() })
      .subscribe({
        next: (data) => this.surveys = data,
        error: (err) => console.error('Error fetching surveys', err)
      });
  }
}
