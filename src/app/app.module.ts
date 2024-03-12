import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { VideosStore } from '@store/videos/videos.store';
import { VideosFacade } from '@store/videos/videos.facade';
import { reducers } from '@store/videos/videos.reducers';
import { SettingsStateFacade } from '@store/settings/settings.facade';
import { SettingsStore } from '@store/settings/settings.store';

import { AppComponent } from '@app/app.component';
import { CoreModule } from '@core/core.module';
import { FeatureModule } from '@features/features.module';
import { environment } from '@environments/environment';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['videos'], rehydrate: true })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    HttpClientModule,
    FeatureModule,
    VideosStore,
    SettingsStore,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [VideosFacade, SettingsStateFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
