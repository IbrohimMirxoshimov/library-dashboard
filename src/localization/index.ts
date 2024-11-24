import {initReactI18next} from 'react-i18next';
import {changeLanguage, use, t as i18nextTranslation} from 'i18next';

import en from './en.json';
import uz from './uz.json';
import oz from './oz.json';
import ru from './ru.json';

export enum Languages {
  EN = 'en',
  UZ = 'uz',
  OZ = 'oz',
  RU = 'ru',
}

export type ResourceKey = string | {[key: string]: ResourceKey};

export interface LangOptions {
  fallbackLng: Languages;
  resources: {[key in Languages]: {translation: Record<string, ResourceKey>}};
}

export interface Localization {
  language: Languages;
  t: (key: string, options?: {[key: string]: string | number}) => string;
  selectLanguage: (langKey: Languages) => void;
}

export class NextLocalization implements Localization {
  private readonly translate = i18nextTranslation;

  private currentLanguage: Languages;

  public get language() {
    return this.currentLanguage;
  }

  public constructor(options: LangOptions) {
    this.currentLanguage = options.fallbackLng;
    use(initReactI18next).init({
      compatibilityJSON: 'v3',
      ...options,
    });
  }

  public t = (key: string, options?: {[key: string]: string | number}) => this.translate(key, options);

  public selectLanguage = (langKey: Languages) => {
    this.currentLanguage = langKey;
    changeLanguage(langKey);
  };
}

const localization: Localization = new NextLocalization({
  fallbackLng: Languages.EN,
  resources: {
    [Languages.EN]: {translation: en},
    [Languages.UZ]: {translation: uz},
    [Languages.OZ]: {translation: oz},
    [Languages.RU]: {translation: ru},
  },
});

export default localization;
