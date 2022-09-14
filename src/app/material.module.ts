import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        MatInputModule, 
        MatButtonModule,
        MatGridListModule,
        MatIconModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule
    ],
    exports: [
        MatInputModule, 
        MatButtonModule,
        MatGridListModule,
        MatIconModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule
    ]
})
export class MaterialModule {}
