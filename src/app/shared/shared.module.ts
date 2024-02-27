import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogComponent } from './dialog/dialog.component';
import { CommonModule } from '@angular/common';

const MATERIAL_MODULES = [
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatCardModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
];

const FEATURE_COMPONENTS = [
  DialogComponent
]

@NgModule({
  declarations: [...FEATURE_COMPONENTS],
  imports: [...MATERIAL_MODULES, CommonModule],
  exports: [...MATERIAL_MODULES],
})
export class SharedModule {}
