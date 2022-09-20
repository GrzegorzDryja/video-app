import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { YouTubeResponse } from '@models/youtube.model';
import { DataService } from '@services/data.service';
import { MatDialogService } from '@services/mat-dialog.service';
import { ErrorTypes } from '@shared/errorsTypes.model';
import { MAT_DIALOG } from '@shared/dialog/dialog.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient, private data: DataService, private matDialog: MatDialogService) {}

  public fetchVideo(videoId: string): void {
    this.http
      .get<YouTubeResponse>(`${environment.youTubeApiURL}${videoId}${environment.youTubeApiKeyAndOptions}`)
      .subscribe({
        next: (responseData) => {
          if (!responseData.items.length) {
            this.matDialog.open(ErrorTypes.errorUrl, MAT_DIALOG.actionRequiredFalse);
          }
          this.data.addYouTubeVideo(<YouTubeResponse>responseData);
        },
        error: (e) => this.matDialog.open(e.message, MAT_DIALOG.actionRequiredFalse),
      });
  }
}
