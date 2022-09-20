import { createSelector } from '@ngrx/store';

import { VideosStateInterface } from '@core/models/videosState.interface';

export const selectFeuture = (state: VideosStateInterface) => state;

export const isLoadingSelector = createSelector(selectFeuture, (state) => state.isLoading);
export const videosSelector = createSelector(selectFeuture, (state) => state.videos);
export const errorSelector = createSelector(selectFeuture, (state) => state.error);
export const layoutSelector = createSelector(selectFeuture, (state) => state.layout);
