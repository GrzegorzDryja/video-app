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
import { appReducer } from './app.reducer';

@NgModule({
  declarations: [AppComponent, InputComponent, VideoListComponent, MenuComponent, PlayerComponent, ItemComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({status: appReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PlayerComponent],
})
export class AppModule {}
