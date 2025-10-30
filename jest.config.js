module.exports = {
  // Для новичка: Jest - фреймворк для тестирования JavaScript кода
  
  // Окружение для тестов - эмулирует браузер
  testEnvironment: 'jsdom',
  
  // Где искать тесты
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Игнорируем эти папки
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  
  // Собираем покрытие кода тестами
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.html'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],
  
  // Показываем подробные сообщения о тестах
  verbose: true
};