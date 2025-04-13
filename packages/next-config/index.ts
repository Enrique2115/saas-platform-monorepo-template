import withBundleAnalyzer from "@next/bundle-analyzer";

import type { NextConfig } from "next";

const otelRegex = /@opentelemetry\/instrumentation/;

export const config: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  webpack(config) {
    config.ignoreWarnings = [{ module: otelRegex }];

    return config;
  },
};

export const withAnalyzer = (sourceConfig: NextConfig): NextConfig =>
  withBundleAnalyzer()(sourceConfig);
