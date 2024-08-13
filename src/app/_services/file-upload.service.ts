// file-upload.service.ts

import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uploadUrl = environment.postUploadFileURL;
  private createEntityUrl = 'https://cdd.didymodesigns.com.au/api/survey-document-post-create';


  constructor(private http: HttpClient, private authService: AuthService) {
  }

  uploadFile(file: File): Observable<any> {
    const headers = this.authService.getPOSTFileUploadHeaders()
      .set('Content-Type', 'application/octet-stream')
      .set('Content-Disposition', `file; filename="${file.name}"`);

    // Prepare the file data as binary
    const fileData = file;

    return this.http.post(this.uploadUrl, fileData, {
      headers,
      responseType: 'json'
    });
  }

  createSurveyDocument(fid: string, label: string, notes: string, stepId: string, reportId: string): Observable<any> {
    const headers = this.authService.getPOSTFileUploadHeaders()
      .set('Content-Type', 'application/json');

    const postData = {
      label,
      notes,
      stepId,
      reportId,
      fid,
      visible: true
    };

    return this.http.post(this.createEntityUrl, postData, {headers});
  }


}


