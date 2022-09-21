import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { VideoListComponent, MenuComponent, PlayerComponent, ItemComponent, InputComponent } from '@features/index';
import { DialogComponent } from '@shared/dialog/dialog.component';
import { environment } from '../environments/environment';
import { VideosModule } from '@core/store/videos.module';
import { VideosFacade } from '@core/store/videos.facade';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    VideoListComponent,
    MenuComponent,
    PlayerComponent,
    ItemComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    VideosModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [VideosFacade],
  bootstrap: [AppComponent],
  entryComponents: [PlayerComponent],
})
export class AppModule {}
