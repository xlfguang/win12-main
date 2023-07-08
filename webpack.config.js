const path = require("path");

module.exports = {
  mode: "development",
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
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // 告诉服务器从哪个目录中提供内容
    },
    compress: true, // 是否启用gzip压缩
    port: 9000, // 端口号，你可以选择你喜欢的任何端口
    hot: true, // 启用Webpack的Hot Module Replacement功能
  },
};
