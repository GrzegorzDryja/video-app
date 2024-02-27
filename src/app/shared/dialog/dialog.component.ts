import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Content } from '@app/shared/models/content.model';
import { MAT_DIALOG } from './dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  protected content = Content.questionDefault.toString();
  protected yes = Content.yes;
  protected no = Content.no;
  protected close = Content.close;
  protected actionStatus = Boolean(MAT_DIALOG.actionRequiredFalse);

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { content: string; actionStatus: boolean }
  ) {}

  public ngOnInit(): void {
    this.content = this.data.content;
    this.actionStatus = this.data.actionStatus;
  }
}
