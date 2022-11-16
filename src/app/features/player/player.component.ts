import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Content } from '@shared/content.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  protected link;
  protected close = Content.close
  protected title = Content.title

  constructor(@Inject(MAT_DIALOG_DATA) private path: string, private sanitizer: DomSanitizer) {
    this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.path);
  }
}
