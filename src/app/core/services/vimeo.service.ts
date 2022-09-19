import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from '@services/data.service';
import { VimeoResponse } from '@models/vimeo.model';
import { environment } from '@environments/environment';
import { MatDialogService } from '@services/mat-dialog.service';
import { MAT_DIALOG } from '@shared/dialog/dialog.model';

@Injectable({
  providedIn: 'root',
})
export class VimeoService {
  constructor(private http: HttpClient, private data: DataService, private matDialog: MatDialogService) {}

  public fetchVideo(videoId: string): Subscription {
    return this.http
      .get(`${environment.vimeoApiURL}${videoId}`)
      .subscribe({
        next: (resp) => this.data.addVimeoVideo(<VimeoResponse>resp),
        error: (e) => this.matDialog.open(e.message, MAT_DIALOG.actionRequiredFalse)
      });
  }
}
