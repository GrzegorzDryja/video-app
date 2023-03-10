import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { DialogComponent } from '@shared/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class MatDialogService {
  private dialog!: MatDialogRef<DialogComponent>;

  constructor(private matDialog: MatDialog) {}

  public open(content: string, actionStatus: boolean): void {
    this.dialog = this.matDialog.open(DialogComponent, {
      data: {
        content,
        actionStatus,
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
