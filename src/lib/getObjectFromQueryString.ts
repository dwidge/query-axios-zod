// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { assert } from "./assert.js";

export const getObjectFromQueryString = (
  queryString: string
): Record<string, string | null | undefined> =>
  Object.fromEntries(
    queryString
      .split("&")
      .filter((s) => s)
      .map((pair, i, a, [key, value] = pair.split("=")) => [
        decodeQueryComponent((assert(key !== undefined), key)),
        decodeQueryComponent(value),
      ])
  );

export const decodeQueryComponent = (
  value: string | undefined
): string | null | undefined =>
  value === undefined
    ? undefined
    : value === "%00"
    ? null
    : decodeURIComponent(value);
