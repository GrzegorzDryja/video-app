import { createReducer, on } from '@ngrx/store';

import * as SettingsActions from '@store/settings/settings.actions';
import { initialState } from '@core/models/settings-state.interface';

export const reducers = createReducer(
  initialState,

  on(SettingsActions.language, (state, { language }) => ({
    ...state,
    language,
  }))
);
