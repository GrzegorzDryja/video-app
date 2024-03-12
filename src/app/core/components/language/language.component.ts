import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { SettingsStateFacade } from '@store/settings/settings.facade';
import {
  AppLanguages,
  AppLanguagesSet,
  IntlLanguages,
  languageMapper,
} from '@core/components/language/language.model';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  private userMachineLanguage = Intl.DateTimeFormat().resolvedOptions().locale;

  public langs = AppLanguagesSet;

  constructor(
    private store: SettingsStateFacade,
    public translate: TranslateService
  ) {
    this.translate.addLangs([...this.langs]);
    this.useLanguageFromState();
  }

  private useLanguageFromState(): void {
    this.store.language$
      .subscribe((language) =>
        !!language
          ? this.translate.use(language)
          : this.translate.use(
              // languageMapper[this.userMachineLanguage as keyof languageMapper] ||
                languageMapper[IntlLanguages.EN]
            )
      );
  }

  public changeLanguage(langSelect: string): void {
    this.store.changeLanguage(languageMapper[langSelect as AppLanguages]);
  }
}
