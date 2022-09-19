import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Content } from '@shared/content.model';

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
  protected acstionStatus = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { content: string; actionStatus: boolean }
  ) {}

  ngOnInit() {
    this.content = this.data.content;
    this.acstionStatus = this.data.actionStatus;
  }
}
