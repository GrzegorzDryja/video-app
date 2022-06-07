import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list'
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
        MatInputModule, 
        MatButtonModule,
        MatGridListModule,
        MatIconModule
    ],
    exports: [
        MatInputModule, 
        MatButtonModule,
        MatGridListModule,
        MatIconModule
    ]
})
export class MaterialModule {}