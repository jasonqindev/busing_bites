// eslint-disable-next-line no-undef
module.exports = {
  devServer: {
    port: 3001,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
};
