import { Routes } from '@angular/router';
import { AuthGuard } from './_services/auth-guard.guard';
import { AuthenticateComponent } from './_components/authenticate/authenticate.component';
import { SurveyListComponent } from './_components/survey-list/survey-list.component';
import {SurveyDetailsComponent} from "./_components/survey-details/survey-details.component";

export const appRoutes: Routes = [
  { path: 'user/login', component: AuthenticateComponent },
  { path: 'surveys/list', component: SurveyListComponent, canActivate: [AuthGuard] },
  { path: 'survey/detail' , component: SurveyDetailsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/user/login' }
];
