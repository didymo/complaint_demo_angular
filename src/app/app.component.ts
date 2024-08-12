import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {NavigationComponent} from "./_components/navigation/navigation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Complaint Demo Angular Components';
}
