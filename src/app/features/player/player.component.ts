import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Content } from '@shared/content.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  protected link: SafeResourceUrl;
  protected close = Content.close;
  protected title = Content.title;

  constructor(
    @Inject(MAT_DIALOG_DATA) private path: string,
    private sanitizer: DomSanitizer
  ) {
    this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.path);
  }
}
