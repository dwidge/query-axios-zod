import { assert } from "./assert.js";
import { decodeQueryComponent } from "./getObjectFromQueryString.js";

/**
 * Parses a query string into an object where keys can have multiple values.
 * e.g., "a=1&a=2&b=3" becomes { a: ["1", "2"], b: ["3"] }
 * @param queryString The query string to parse.
 * @returns A record where keys are strings and values are arrays of strings, nulls, or undefined.
 */
export const getValuesFromQueryString = (
  queryString: string,
): Record<string, (string | null | undefined)[]> =>
  queryString
    .split("&")
    .filter((s) => s)
    .map((pair) => pair.split("=") as [string, string | undefined])
    .reduce<Record<string, (string | null | undefined)[]>>(
      (acc, [key, value]) => {
        const decodedKey = decodeQueryComponent(
          (assert(key !== undefined), key),
        );
        assert(
          decodedKey,
          "getValuesFromQueryStringE1: Query key cannot be empty",
        );
        const decodedValue = decodeQueryComponent(value);
        (acc[decodedKey] = acc[decodedKey] || []).push(decodedValue);
        return acc;
      },
      {},
    );
