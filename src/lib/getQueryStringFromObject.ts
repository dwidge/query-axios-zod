// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

type FilterValue = string | number | boolean | Date | null | undefined;

export const getQueryStringFromObject = <
  T extends Record<string, FilterValue | FilterValue[]>,
>(
  filter?: T,
) =>
  Object.entries(filter ?? {})
    .flatMap(([k, v]) => {
      if (Array.isArray(v)) {
        return v.map((item) =>
          [encodeQueryComponent(k), encodeQueryComponent(item)]
            .filter((c) => c !== undefined)
            .join("="),
        );
      }
      return [
        [encodeQueryComponent(k), encodeQueryComponent(v)]
          .filter((c) => c !== undefined)
          .join("="),
      ];
    })
    .join("&");

export const encodeQueryComponent = (
  value: string | number | boolean | Date | null | undefined,
): string | undefined =>
  value === undefined
    ? undefined
    : value === null
      ? "%00"
      : value instanceof Date
        ? value.toISOString()
        : encodeURIComponent(value.toString());
