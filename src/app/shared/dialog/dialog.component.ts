import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { MAT_DIALOG } from '@shared/dialog/dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  protected content = this.translate.instant('CONTENT.QUESTION')
  protected actionStatus = Boolean(MAT_DIALOG.actionRequiredFalse);

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { content: string; actionStatus: boolean },
    public translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.content = this.data.content
    
    this.actionStatus = this.data.actionStatus;
  }
}
