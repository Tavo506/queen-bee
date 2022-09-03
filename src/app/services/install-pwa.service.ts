import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Platform } from '@angular/cdk/platform';
import {PromptComponent} from "../widgets/prompt/prompt.component";

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEvent: any;
  SESSION_STORAGE_KEY: string = "QueenBeePWAOpened";

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform
  ) { }

  installReadyEvent = (event: any) => {
    event.preventDefault();
    this.promptEvent = event;
    this.openPromptComponent('android');
    window.removeEventListener('beforeinstallprompt', this.installReadyEvent);
  }

  initPwaPrompt() {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', this.installReadyEvent);
    }
    if (this.platform.IOS) {
      // @ts-ignore
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  openPromptComponent(mobileType: 'ios' | 'android') {
    timer(3000)
      .pipe(take(1))
      .subscribe(() => {
        this.bottomSheet.open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } });
      });
  }
}
