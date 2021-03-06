import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { InputComponent } from './input/input.component';
import { VideoListComponent } from './video-list/video-list.component';
import { MenuComponent } from './video-list/menu/menu.component';
import { PlayerComponent } from './video-list/player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    VideoListComponent,
    MenuComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PlayerComponent]
})
export class AppModule { }
