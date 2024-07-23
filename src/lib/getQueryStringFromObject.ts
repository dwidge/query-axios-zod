// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const getQueryStringFromObject = <
  T extends Record<string, string | number | boolean | Date | null | undefined>
>(
  filter?: T
) =>
  Object.entries(filter ?? {})
    .map(([k, v]) =>
      [encodeQueryComponent(k), encodeQueryComponent(v)]
        .filter((v) => v !== undefined)
        .join("=")
    )
    .join("&");

export const encodeQueryComponent = (
  value: string | number | boolean | Date | null | undefined
): string | undefined =>
  value === undefined
    ? undefined
    : value === null
    ? "%00"
    : value instanceof Date
    ? value.toISOString()
    : encodeURIComponent(value.toString());
