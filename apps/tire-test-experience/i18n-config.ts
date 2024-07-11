export const i18n = {
  defaultLocale: "en-US",
  locales: ["en-US"],
} as const;

export type Locales = (typeof i18n)["locales"][number];
