import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared/shared.module';
import { InputComponent } from './components/input/input.component';
import { MenuComponent } from './components/video-list/menu/menu.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { ItemComponent } from './components/video-list/item/item.component';
import { FavoritePipe } from './components/video-list/pipe/favorite.pipe';
import { SortPipe } from './components/video-list/pipe/sort.pipe';

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
