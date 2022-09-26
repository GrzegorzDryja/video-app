import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from '@shared/content.model';
import { PlayerOptions } from '@shared/player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  protected link;
  protected videoId;
  protected close = Content.close;
  protected title = Content.title;
  protected playerHeight: string = PlayerOptions.playerHeight;
  protected playerWidth: string = PlayerOptions.playerWidth;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { path: string; videoId: string },
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<PlayerComponent>
  ) {
    this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.path);
    this.videoId = this.data.videoId;
  }

  public isVideoDeleted(isVideoDeleted: boolean): void {
    if (isVideoDeleted) {
      this.router.navigate([''], { relativeTo: this.route });
      this.dialogRef.close();
    }
  }
}
