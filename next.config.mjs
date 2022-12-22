import { Config, webpackConfigurationHandler } from "next-multilingual/config";

// Add extra Webpack configuration by wrapping next-multilingual's webpack handler.
function webpack(config, context) {
  config = webpackConfigurationHandler(config, context);
  config.module.rules.push(
    {
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    },
    {
      test: /\.md$/,
      use: "raw-loader",
    }
  );
  return config;
}

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
  outputFileTracing: false,
  experimental: {
    esmExternals: false,
    scrollRestoration: true,
  },
  i18n,
  poweredByHeader: false,
  webpack,
  async rewrites() {
    return multilingualConfig.getRewrites();
  },
  async redirects() {
    return multilingualConfig.getRedirects();
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
