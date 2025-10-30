module.exports = {
  // ESLint проверяет код на ошибки и стилистические проблемы
  
  // Окружение - где будет выполняться код
  env: {
    browser: true,    // Браузерные глобальные переменные (window, document)
    es2021: true,     // Поддержка современных ES возможностей
    jest: true,       // Глобальные переменные Jest для тестов
    node: true        // Node.js глобальные переменные (module, process)
  },
  
  // Расширенные конфигурации - берем рекомендованные настройки
  extends: [
    'eslint:recommended',      // Рекомендованные правила ESLint
    'plugin:prettier/recommended' // Интеграция с Prettier
  ],
  
  // Парсер для современного JavaScript
  parserOptions: {
    ecmaVersion: 12,          // Версия ECMAScript
    sourceType: 'module'      // Используем ES6 модули
  },
  
  // Правила - что считается ошибкой, что предупреждением
  rules: {
    // Запрещает неиспользуемые переменные
    'no-unused-vars': 'warn',
    
    // Запрещает использование console.log в продакшене
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    
    // Запрещает debugger в продакшене
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    
    // Требует использование строгого равенства (===)
    'eqeqeq': ['error', 'always'],
    
    // Запрещает переменные с одинаковыми именами в одной области видимости
    'no-shadow': 'error',
    
    // Предупреждает о неиспользуемых параметрах функций
    'no-unused-vars': ['warn', { 'args': 'none' }],
    
    // Разрешает использование var (для новичков)
    'no-var': 'off'
  }
};