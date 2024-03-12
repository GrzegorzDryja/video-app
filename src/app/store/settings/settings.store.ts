import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from '@store/settings/settings.reducer';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('settings', reducers)]
})
export class SettingsStore {}
