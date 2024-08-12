import { Routes } from '@angular/router';
import { AuthGuard } from './_services/auth-guard.guard';
import { AuthenticateComponent } from './_components/authenticate/authenticate.component';
import { SurveyListComponent } from './_components/survey-list/survey-list.component';
import {SurveyDetailsComponent} from "./_components/survey-details/survey-details.component";
import {FileUploadDemoComponent} from "./_components/file-upload-demo/file-upload-demo.component";

export const appRoutes: Routes = [
  { path: '', redirectTo: '/surveys/list', pathMatch: 'full' },
  { path: 'user/login', component: AuthenticateComponent },
  { path: 'surveys/list', component: SurveyListComponent, canActivate: [AuthGuard] },
  { path: 'survey/detail/:id' , component: SurveyDetailsComponent, canActivate: [AuthGuard] },
  { path: 'file/upload', component: FileUploadDemoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/user/login' }
];
