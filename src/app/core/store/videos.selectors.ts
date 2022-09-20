import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '@core/models/appState.interface';

export const selectFeuture = (state: AppStateInterface) => state.videos;

export const isLoadingSelector = createSelector(selectFeuture, (state) => state.isLoading);
export const videosSelector = createSelector(selectFeuture, (state) => state.videos);
export const errorSelector = createSelector(selectFeuture, (state) => state.error);
export const layoutSelector = createSelector(selectFeuture, (state) => state.layout);
