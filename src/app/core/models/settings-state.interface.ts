import { AppLanguages } from '@core/components/language/language.model';

export const settingsFeatureKey = 'settings';

export interface SettingsStateInterface {
  language: AppLanguages | null;
}

export const initialState: SettingsStateInterface = {
  language: null,
};
