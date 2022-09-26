import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { VideosStore } from '@store/videos.store';
import { VideosFacade } from '@store/videos.facade';
import { reducers } from '@store/videos.reducers';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import {
  VideoListComponent,
  MenuComponent,
  PlayerComponent,
  GridItemComponent,
  InputComponent,
  StickyMenuComponent,
  VideoPageComponent,
} from '@features/index';
import { DialogComponent } from '@shared/dialog/dialog.component';
import { environment } from '@environments/environment';
import { FavoritePipe } from '@features/video-list/list/pipe/favorite.pipe';
import { SortPipe } from '@features/video-list/list/pipe/sort.pipe';
import { ActionsComponent } from '@shared/actions/actions.component';
import { ShortPipe } from '@features/video-list/item/pipe/short.pipe';
import { ThousandPipe } from '@features/video-list/item/pipe/thousand.pipe';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['videos'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    VideoListComponent,
    MenuComponent,
    PlayerComponent,
    GridItemComponent,
    DialogComponent,
    FavoritePipe,
    SortPipe,
    StickyMenuComponent,
    VideoPageComponent,
    ActionsComponent,
    ShortPipe,
    ThousandPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    VideosStore,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [VideosFacade],
  bootstrap: [AppComponent],
  entryComponents: [PlayerComponent],
})
export class AppModule {}
