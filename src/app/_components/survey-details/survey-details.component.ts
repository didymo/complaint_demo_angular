// src/app/_components/survey-details/survey-details.component.ts
import {Component, HostListener, OnInit, signal, ViewChild} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../_services/auth.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SurveyService} from "../../_services/survey.service";
import {Survey} from "../../_classes/survey";
import {CdkDragDrop, DragDropModule, moveItemInArray} from "@angular/cdk/drag-drop";
import {BrowserModule} from "@angular/platform-browser";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {Assessment} from "../../_classes/assessment";
import {AssessmentChoice} from "../../_classes/assessment-choice";


function PreviewComponent() {

}

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class SurveyDetailsComponent implements OnInit {
  surveyId: string;
  surveyDetails: Survey | undefined;


  /**
   * The dropdowns are different for the text cells and the select lists.
   * In order to be able to have the default option specified we need to
   * iterate through the options.
   */
  public cellTypeList = [
    {value: 'Radio', label: 'Radio Buttons'},
    {value: 'Text', label: 'Text'},
    {value: 'Checkbox', label: 'Select Many'}
  ];
  public optionDisplayList = [
    {value: 'Date', label: 'Date'},
    {value: 'Number', label: 'Number'},
    {value: 'Text', label: 'Text Field'}
  ];
  public requirementList = [
    {value: '1', label: 'Mandatory'},
    {value: '0', label: 'Optional'}
  ]

  newAssessment: Assessment = new Assessment('', '', '', '', '', '', '', '', '', 0, '', '', []);


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

    submitSurvey(): void {
    if (this.surveyDetails) {
      console.log('Submitted Survey:', this.surveyDetails);
      // Perform further actions like sending the data to the server
    }
  }

   addAssessment(): void {
    if (this.surveyDetails) {
      this.surveyDetails.assessments.push(Object.assign({}, this.newAssessment));
      this.resetNewAssessment();
    }
  }

  addChoice(): void {
    this.newAssessment.choices.push(new AssessmentChoice('', '', '', '', '', '', '', ''));
  }

  removeChoice(index: number): void {
    this.newAssessment.choices.splice(index, 1);
  }

  resetNewAssessment(): void {
    this.newAssessment = new Assessment('', '', '', '', '', '', '', '', '', 0, '', '', []);
  }
}

