import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  protected link: SafeResourceUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) private path: string,
    private sanitizer: DomSanitizer
  ) {
    this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.path);
  }
}
