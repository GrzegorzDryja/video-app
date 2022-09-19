import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DialogComponent } from '@shared/dialog/dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatDialogService {
  constructor(private matDialog: MatDialog) {}

  private dialog!: MatDialogRef<DialogComponent>;

  public open(content: string, actionStatus: boolean): void {
    this.dialog = this.matDialog.open(DialogComponent, {
      data: {
        content: content,
        actionStatus: actionStatus,
      },
    });
  }

  public closeAll(): void {
    this.dialog.close();
  }

  public afterClosed(): Observable<MatDialog> {
    return this.dialog.afterClosed();
  }
}
