// declaration.d.ts

export {};
declare global {
  interface String {
    appendQueryParam(key: string, value: string): string;
  }
}
