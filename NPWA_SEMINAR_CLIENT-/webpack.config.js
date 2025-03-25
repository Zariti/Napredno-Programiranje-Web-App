const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Ulazna točka aplikacije
  output: {
    path: path.resolve(__dirname, 'dist'), // Izlazna mapa
    filename: 'bundle.js', // Izlazni bundle
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Pronađi .js i .jsx datoteke
        exclude: /node_modules/, // Izuzmi node_modules
        use: {
          loader: 'babel-loader', // Koristi Babel
        },
        
      },
      {
        test: /\.css$/, // Za .css datoteke
        use: ['style-loader', 'css-loader'], // Koristi style-loader i css-loader
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Dodaj .jsx ekstenziju
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Predložak HTML-a
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Poslužitelj
    port: 3000,
    open: true,
  },
};
