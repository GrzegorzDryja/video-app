import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared/shared.module';
import { InputComponent } from './components/input/input.component';
import { MenuComponent } from './components/video-list/list/menu/menu.component';
import { VideoListComponent } from './components/video-list/list/video-list.component';
import { ItemComponent } from './components/video-list/item/item.component';
import { FavoritePipe } from './components/video-list/list/pipe/favorite.pipe';
import { SortPipe } from './components/video-list/list/pipe/sort.pipe';

const CORE_COMPONENTS = [
  InputComponent,
  MenuComponent,
  VideoListComponent,
  ItemComponent,
];

const CORE_PIPES = [
  FavoritePipe,
  SortPipe
]

@NgModule({
  declarations: [...CORE_COMPONENTS, ...CORE_PIPES],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [InputComponent, VideoListComponent]
})
export class CoreModule {}
