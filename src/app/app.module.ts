import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { InputComponent } from './core/components/input/input.component';
import { VideoListComponent, MenuComponent, PlayerComponent, ItemComponent } from '@features/index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from '@core/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { VideosEffects } from '@core/store/effects';

@NgModule({
  declarations: [AppComponent, InputComponent, VideoListComponent, MenuComponent, PlayerComponent, ItemComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({videos: reducers}),
    EffectsModule.forRoot([VideosEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PlayerComponent],
})
export class AppModule {}
