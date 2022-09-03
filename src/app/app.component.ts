import { Component, ViewEncapsulation } from '@angular/core';
import {UpdatePwaService} from "./services/update-pwa.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title: string = 'spelling-bee';

  constructor(private updatePWA: UpdatePwaService) { }
}
