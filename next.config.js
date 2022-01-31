module.exports = {
  images: {
    domains: [],
  },
  webpack: config => {
    config.experiments = { topLevelAwait: true };
    return config;
  },
};
