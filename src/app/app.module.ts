import { NgModule } from '@angular/core';

import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { VideosStore } from '@store/videos.store';
import { VideosFacade } from '@store/videos.facade';
import { reducers } from '@store/videos.reducers';

import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { FeatureModule } from '@features/features.module';
import { SharedModule } from '@shared/shared.module';
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
    FeatureModule,
    VideosStore,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [VideosFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
