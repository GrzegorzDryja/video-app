import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@shared/shared.module';
import { InputComponent } from '@core/components/input/input.component';
import { MenuComponent } from '@core/components/video-list/menu/menu.component';
import { VideoListComponent } from '@core/components/video-list/video-list.component';
import { ItemComponent } from '@core/components/video-list/item/item.component';
import { FavoritePipe } from '@core/components/video-list/pipe/favorite.pipe';
import { SortPipe } from '@core/components/video-list/pipe/sort.pipe';

const CORE_COMPONENTS = [
  InputComponent,
  MenuComponent,
  VideoListComponent,
  ItemComponent,
];

const EXPORT_COMPONENTS = [InputComponent, VideoListComponent];

const CORE_PIPES = [FavoritePipe, SortPipe];

@NgModule({
  declarations: [...CORE_COMPONENTS, ...CORE_PIPES],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [...EXPORT_COMPONENTS],
})
export class CoreModule {}
