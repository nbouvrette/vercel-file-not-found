import { Config } from "next-multilingual/config";

const multilingualConfig = new Config(
  "exampleApp",
  ["en-US", "fr-CA"],
  "en-US"
);

/** @type {import('next/dist/server/config-shared').I18NConfig} */
export const i18n = {
  locales: multilingualConfig.getUrlLocalePrefixes(),
  defaultLocale: multilingualConfig.getDefaultUrlLocalePrefix(),
  localeDetection: false,
};

/** @type {import('next').NextConfig} */
export const nextConfig = {
  experimental: {
    esmExternals: false,
    scrollRestoration: true,
  },
  i18n,
  poweredByHeader: false,
};

export default nextConfig;
