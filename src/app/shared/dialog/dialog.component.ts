import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  public dialogContent = "Usunac wszystkie filmy?";
  public yes = "Tak";
  public no = "Nie"

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}
}
