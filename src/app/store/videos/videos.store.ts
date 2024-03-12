import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from '@store/videos/videos.reducers';
import { VideosEffects } from '@store/videos/videos.effects';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('videos', reducers), EffectsModule.forFeature([VideosEffects])],
})
export class VideosStore {}
