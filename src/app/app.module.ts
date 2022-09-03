import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { StudyComponent } from './pages/study/study.component';
import { FormsModule } from '@angular/forms';
import {UpdatePwaService} from "./services/update-pwa.service";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PromptComponent } from './widgets/prompt/prompt.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {PwaService} from "./services/install-pwa.service";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef} from "@angular/material/bottom-sheet";

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudyComponent,
    PromptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NoopAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatBottomSheetModule,
  ],
  providers: [
    UpdatePwaService,
    {provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true},
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
