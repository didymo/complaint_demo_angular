 // file-upload.component.ts
import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  HttpClient,
  HttpEventType,
  HttpHeaders, provideHttpClient
} from "@angular/common/http";
import { FileUploadService } from '../../_services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  uploadResponse: string | null = null;

  constructor(private fileUploadService: FileUploadService) {}

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    this.fileUploadService.uploadFile(this.selectedFile).subscribe({
      next: (response) => {
        console.log('Upload complete:', response);

        // Extract the fid from the response
        const fileFid = response?.fid?.[0]?.value;
        if (fileFid) {
          // Proceed to create the survey document entity
          this.createSurveyDocument(fileFid);
        } else {
          console.error('File fid not found in the response');
          this.uploadResponse = 'File upload successful, but file fid is missing.';
        }
      },
      error: (err) => {
        console.error('Upload error:', err);
        this.uploadResponse = `Upload failed: ${err.message}`;
      }
    });
  }

  createSurveyDocument(fid: string): void {
    const label = 'Test Document';
    const notes = 'This is a test document';
    const stepId = '123';  // Replace with actual step ID
    const reportId = '456'; // Replace with actual report ID

    this.fileUploadService.createSurveyDocument(fid, label, notes, stepId, reportId).subscribe({
      next: (response) => {
        console.log('Survey document creation complete:', response);
        this.uploadResponse = `Upload and entity creation successful: ${JSON.stringify(response)}`;
      },
      error: (err) => {
        console.error('Entity creation error:', err);
        this.uploadResponse = `Entity creation failed: ${err.message}`;
      }
    });
  }

}
