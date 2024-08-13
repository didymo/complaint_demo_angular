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
        this.uploadResponse = JSON.stringify(response);
      },
      error: (err) => {
        console.error('Upload error:', err);
        this.uploadResponse = `Upload failed: ${err.message}`;
      }
    });
  }
}
