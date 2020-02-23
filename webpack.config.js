const path = require('path');
// const UglifyJSPlugin = require('')
module.exports = {
   //mode: 'development',
   mode: 'production',
   entry: ['./src/index.js'],
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist'),
      publicPath: 'http://localhost:6500/dist/',
   },
   module: {
      rules: [
         { test: /\.txt$/, use: 'css-loader' },
         {
            test: /\.css$/,   // 正则表达式，表示.css后缀的文件
            use: ['style-loader', 'css-loader']   // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
         }
      ]
   },
   // devServer: {
   //    contentBase: path.resolve(__dirname, 'static'),
   //    host: '0.0.0.0',
   //    port: 6500,
   //    headers: {
   //       'Access-Control-Allow-Origin': '*'
   //    },
   //    hot: true,
   //    inline: true
   // },
   // plugins: [
   //    new webpack.HotModuleReplacementPlugin()
   // ]
};