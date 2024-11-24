import {AnyJson} from '@ts-types/any.type';

type ClassValue = ClassArray | ClassDictionary | string | number | bigint | null | boolean | undefined;
type ClassDictionary = Record<string, AnyJson>;
type ClassArray = ClassValue[];

export const classNames = (...classNames: ClassValue[]) => classNames.filter(Boolean).join(' ');
