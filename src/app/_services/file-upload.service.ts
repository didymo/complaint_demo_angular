import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private uploadUrl = environment.postUploadFileURL;

  constructor(private http: HttpClient, private authService: AuthService) {}

  uploadFile(file: File): Observable<any> {
    const headers = this.authService.getPOSTFileUploadHeaders();
    // headers.append('Content-Type', 'application/octet-stream');
    headers.append('Content-Disposition', `file; filename="${file.name}"`);

    return this.http.post(this.uploadUrl, file, { headers });
  }
}
