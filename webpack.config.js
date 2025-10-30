const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Для новичка: Webpack собирает все файлы в один бандл

module.exports = {
  // Главный файл приложения
  entry: './src/script.js',
  
  // Куда складывать собранные файлы
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js', // [contenthash] для кэширования
    clean: true // Очищать папку dist при каждой сборке
  },
  
  // Модули и правила обработки файлов
  module: {
    rules: [
      {
        // Обрабатываем CSS файлы
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  
  // Плагины для дополнительной функциональности
  plugins: [
    // Автоматически добавляет скрипты в HTML
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: true // Минифицирует HTML в продакшене
    })
  ],
  
  // Dev сервер для разработки
  devServer: {
    static: './dist',
    open: true,    // Автоматически открывать браузер
    hot: true,     // Горячая перезагрузка
    port: 3000
  },
  
  // Карты исходного кода для отладки
  devtool: 'source-map'
};