export type Primitives = string | number | bigint | boolean | undefined | symbol | null;

export type AnyArray = (Primitives | AnyJson)[];

export type AnyJson = {
  [key: string]: Primitives | AnyJson | AnyArray;
};