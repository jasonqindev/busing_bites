import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams, keys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObj({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};

export const cleanObj = (object: { [key: string]: unknown }) => {
  const res = { ...object };
  Object.keys(object).forEach((key) => {
    const val = res[key];
    if (isVoid(val)) {
      delete res[key];
    }
  });

  return res;
};

export const isFalsy = (val: unknown) => (val === 0 ? false : !val);

export const isVoid = (val: unknown) =>
  val === undefined || val === null || val === "";

export const badgeColors = (index: number) => {
  const colors = [
    "cyan",
    "orange",
    "yellow",
    "lime",
    "green",
    "teal",
    "indigo",
    "blue",
    "violet",
    "pink",
    "grape",
    "gray",
    "red",
  ];
  return colors[index % 13];
};

/* eslint-disable no-extend-native */
String.prototype.appendQueryParam = function (key: string, value: string) {
  const url = this.toString();
  const separator = url.includes("?") ? "&" : "?";
  const param = `${key}=${value}`;
  return `${url}${separator}${param}`;
};

export const deepMerge = (obj1: any, obj2: any) => {
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (
        obj1.hasOwnProperty(key) &&
        typeof obj1[key] === "object" &&
        typeof obj2[key] === "object"
      ) {
        obj1[key] = deepMerge(obj1[key], obj2[key]);
      } else if (!obj1.hasOwnProperty(key)) {
        obj1[key] = obj2[key];
      } else if (
        obj1.hasOwnProperty(key) &&
        typeof obj1[key] === "number" &&
        typeof obj2[key] === "number"
      ) {
        obj1[key] += obj2[key];
      }
    }
  }
  return obj1;
};
