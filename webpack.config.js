const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// webpack配置
module.exports = {
  // 配置打包入口文件
  entry: "./src/index.tsx",
  // 配置打包输出位置，及文件名
  output: {
    path: path.resolve(__dirname, "dist"),
    // 输出文件名
    filename: "bundle.js",
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    // 配置站点根目录，默认为输出位置
    static: path.resolve(__dirname, "dist"),
    hot: true, //热更新
    compress: true, //开启gzip压缩
    port: 3009, //开启并设置端口号
  },
  resolve: {
    // webpack 将识别这些后缀文件为 module
    // 这个配置是覆盖原配置的，因此应当给定所有后缀，否则使用第三方库时必然会出问题
    extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json", ".js"],
    alias: {
      "@": path.join(__dirname, "/src/"), // 配置@为 src 目录，使不需要每次都使用相对路径去 import
    },
  },
  module: {
    // 由于可以加载多种文件，每种文件对应一种loader，所以是数组
    rules: [
      // 由于是多种文件，所以使用扩展名进行区分，再应用不同的loader
      {
        // 正则判断文件类型
        test: /\.css$/i,
        // 这种类型文件使用以下loader
        use: ["style-loader", "css-loader"],
      },
      {
        // 判断less文件
        test: /\.less$/i,
        // less使用到的loader，
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true, //只进行语法转换,不进行类型校验,提高构建速度
            },
          },
        ],
        exclude: /node_modules/,
      },
      { test: /\.js|jsx$/, use: "babel-loader", exclude: /node_modules/ },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // js插入位置
      inject: "body",
      // 生成的html文件名
      filename: "index.html",
      // 指定参照这个html文件进行生成
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
};
