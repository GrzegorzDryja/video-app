import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { TranslateModule } from '@ngx-translate/core';

import { DialogComponent } from '@shared/dialog/dialog.component';

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

const SHARED_COMPONENTS = [DialogComponent];

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [...MATERIAL_MODULES, CommonModule, TranslateModule],
  exports: [...MATERIAL_MODULES, ...SHARED_COMPONENTS],
})
export class SharedModule {}
