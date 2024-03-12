import { createAction, props } from '@ngrx/store';

import { AppLanguages } from '@core/components/language/language.model';

export const language = createAction(
  '[SETTINGS] Language Change',
  props<{ language: AppLanguages }>()
);
