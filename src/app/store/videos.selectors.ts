import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '@app/core/models/app-state.interface';

export const selectFeature = (state: AppStateInterface) => state.videos;

export const isLoadingSelector = createSelector(selectFeature, (state) => state.isLoading);
export const videosSelector = createSelector(selectFeature, (state) => state.videos);
export const errorSelector = createSelector(selectFeature, (state) => state.error);
