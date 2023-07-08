const path = require("path");

module.exports = {
  entry: "./linkwallet.js", // 你的入口文件
  output: {
    filename: "linkwallet.js", // 输出的文件名
    path: path.resolve(__dirname, "dist"), // 输出路径
  },
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"),
      // ...
    },
  },
};
