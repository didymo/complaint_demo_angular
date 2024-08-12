import { Component } from '@angular/core';
import {FileUploadComponent} from "../file-upload/file-upload.component";

@Component({
  selector: 'app-file-upload-demo',
  standalone: true,
  imports: [
    FileUploadComponent
  ],
  templateUrl: './file-upload-demo.component.html',
  styleUrl: './file-upload-demo.component.css'
})
export class FileUploadDemoComponent {

}
