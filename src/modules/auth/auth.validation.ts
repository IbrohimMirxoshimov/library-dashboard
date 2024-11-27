import * as z from 'zod';

import i18n from '@localization';
import {validationConstraints} from '@constants/validation.constraints';

const constraints = validationConstraints.login;

export const loginSchema = z.object({
  phone: z
    .string({
      required_error: i18n.t('phone_required'),
    })
    .trim()
    .min(constraints.email.min, i18n.t('username_min_length', {min: constraints.email.min})),
  password: z
    .string({
      required_error: i18n.t('password_required'),
    })
    .trim()
    .min(constraints.password.min, i18n.t('password_min_length', {min: constraints.password.min}))
    // .regex(constraints.password.specialChars, i18n.t('password_required_special_chars'))
    .regex(constraints.password.numbers, i18n.t('password_required_numbers')),
  // .regex(constraints.password.uppercase, i18n.t('password_required_uppercase')),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
