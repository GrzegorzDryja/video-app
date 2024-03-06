import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


import * as SettingsSelectors from '@store/settings/settings.selectors';
import * as SettingsActions from '@store/settings/settings.actions';
import { AppLanguages } from '@core/components/language/language.model';
import { AppStateInterface } from '@core/models/app-state.interface';


@Injectable()
export class SettingsStateFacade {
  public language$ = this.store.select(SettingsSelectors.language);

  constructor(private store: Store<AppStateInterface>) {}

  public changeLanguage(language: AppLanguages): void {
    this.store.dispatch(SettingsActions.language({ language }));
  }
}