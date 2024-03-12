export enum IntlLanguages {
  EN = 'en',
  PL = 'pl',
}

export enum AppLanguages {
  EN = 'en',
  PL = 'pl',
}

export const AppLanguagesSet = new Set(Object.values(AppLanguages));

export const languageMapper: {
  [key in IntlLanguages]: AppLanguages;
} = {
  [IntlLanguages.EN]: AppLanguages.EN,
  [IntlLanguages.PL]: AppLanguages.PL,
};
