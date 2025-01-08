// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

type DropUndefined<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]: T[K];
};

export const dropUndefined = <T extends Record<string, any>>(o: T): T =>
  Object.fromEntries(
    Object.entries(o).filter(([_, v]) => v !== undefined),
  ) as T;

export const hasUndefined = <T extends Record<string, any>>(o: T): boolean =>
  Object.entries(o).some(([_, v]) => v === undefined);
