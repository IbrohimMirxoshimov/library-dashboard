import i18n from '@localization';

export const errorHandler = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return i18n.t('something_went_wrong');
};
