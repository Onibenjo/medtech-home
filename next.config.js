/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
const withPlugins = require("next-compose-plugins")
const withImages = require("next-images")
const withOptimizedImages = require("next-optimized-images")
const withPWA = require("next-pwa")
// const path = require("path")

module.exports = withPlugins(
  [
    [
      withOptimizedImages,
      {
        handleImages: ["jpeg", "png", "svg", "webp", "gif", "ico"],
      },
    ],
    // withImages,
    [
      withPWA,
      {
        pwa: {
          dest: "public",
          disable: process.env.NODE_ENV === "development",
        },
      },
    ],
  ],
  {
    webpack: (config, { dev, isServer }) => {
      // if (dev) {
      //   config.devtool = "cheap-module-source-map"
      // }
      // typescript extensions
      // config.resolve.extensions.push('.ts', '.tsx');
      // withPWA({
      //   pwa: {
      //     dest: 'public'
      //   }
      // })
      // if (!isServer) {
      //   config.node = {
      //     fs: "empty",
      //   }
      // }
      // config.resolve.alias.images = path.join(__dirname, "images");
      return config
    },
  }
)
