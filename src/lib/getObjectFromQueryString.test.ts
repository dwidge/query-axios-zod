import { test } from "node:test";
import * as assert from "assert";
import { getObjectFromQueryString } from "./getObjectFromQueryString.js";
import { getQueryStringFromObject } from "./getQueryStringFromObject.js";

test("getQueryStringFromObject should generate query string from object", () => {
  const obj = {
    name: "Alice",
    age: 30,
    active: true,
    date: new Date("2023-01-01"),
    nullValue: null,
    undefinedValue: undefined,
  };
  const queryString = getQueryStringFromObject(obj);
  const expectedQueryString = `name=Alice&age=30&active=true&date=2023-01-01T00:00:00.000Z&nullValue=%00&undefinedValue`;
  assert.strictEqual(queryString, expectedQueryString);
});

test("getObjectFromQueryString should parse query string to object", () => {
  const queryString = `name=Alice&age=30&active=true&date=2023-01-01T00:00:00.000Z&nullValue=%00&undefinedValue`;
  const expectedObj = {
    name: "Alice",
    age: "30",
    active: "true",
    date: "2023-01-01T00:00:00.000Z",
    nullValue: null,
    undefinedValue: undefined,
  };
  const obj = getObjectFromQueryString(queryString);
  assert.deepStrictEqual(obj, expectedObj);
});

test("getQueryStringFromObject and getObjectFromQueryString should be inverses", () => {
  const obj = {
    name: "Alice",
    age: 30,
    active: true,
    date: new Date("2023-01-01"),
    nullValue: null,
    undefinedValue: undefined,
  };
  const queryString = getQueryStringFromObject(obj);
  const parsedObj = getObjectFromQueryString(queryString);

  const expectedObj = {
    name: "Alice",
    age: "30",
    active: "true",
    date: "2023-01-01T00:00:00.000Z",
    nullValue: null,
    undefinedValue: undefined,
  };

  assert.deepStrictEqual(parsedObj, expectedObj);
});
