import {twMerge} from 'tailwind-merge';

import {AnyJson} from '@ts-types/any.type';

type ClassValue = ClassArray | ClassDictionary | string | number | bigint | null | boolean | undefined;
type ClassDictionary = Record<string, AnyJson>;
type ClassArray = ClassValue[];

export default function cn(...classNames: ClassValue[]) {
  return twMerge(classNames.filter(Boolean).join(' '));
}
