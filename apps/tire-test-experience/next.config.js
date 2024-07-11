//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require("@nx/next");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(glb)$/,
      type: "asset/resource",
    });
    config.module.rules.push({
      test: /\.(exr)$/,
      type: "asset/resource",
    });
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: "asset/resource",
    });
    config.module.rules.push({
      test: /\.(wav)$/,
      type: "asset/resource",
    });

    return config;
  },
  output: "standalone",
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
