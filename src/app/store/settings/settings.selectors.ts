import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '@core/models/app-state.interface';
import { SettingsStateInterface } from '@app/core/models/settings-state.interface';

export const selectFeature = (state: AppStateInterface) => state.settings;

export const language = createSelector(selectFeature, (state: SettingsStateInterface) => state.language);