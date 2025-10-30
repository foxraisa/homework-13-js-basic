# homework-13-js-basic
# 🚀 Менеджер параграфов - Полная версия с CI/CD

Простое веб-приложение для управления текстовыми параграфами с полной настройкой качества кода и автоматическим деплоем.

## ✨ Особенности

- ✅ **Простое приложение** - добавление и управление параграфами
- ✅ **Качество кода** - ESLint + Prettier + Husky
- ✅ **Автоматическое тестирование** - Jest с покрытием кода
- ✅ **CI/CD пайплайны** - автоматические проверки и деплой
- ✅ **GitHub Pages** - автоматический деплой приложения

## 🛠 Технологии

- **JavaScript** (ES6+)
- **Webpack 5** - сборка проекта
- **Jest** - тестирование
- **ESLint** + **Prettier** - качество кода
- **Husky** - прекоммит-хуки
- **GitHub Actions** - CI/CD пайплайны
- **GitHub Pages** - хостинг

## 🚀 Быстрый старт

### Установка и запуск

```bash
# Клонируйте репозиторий
git clone <your-repo-url>
cd paragraph-app

# Установите зависимости
npm install

# Запустите в режиме разработки
npm start



### Полная структура проекта

paragraph-app/
├── .github/
│   └── workflows/
│       ├── ci-cd.yml      -    # Пайплайн для тестов и линтера
│       └── deploy.yml     -    # Пайплайн для деплоя на GitHub Pages
├── src/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── __tests__/
│   └── app.test.js
├── .eslintrc.js      -        # Конфигурация ESLint
├── .eslintignore     -        # Игнорируемые файлы для ESLint
├── .prettierrc       -        # Конфигурация Prettier
├── .prettierignore   -        # Игнорируемые файлы для Prettier
├── .husky/           -        # Прекоммит-хуки
│   ├── _
│   └── pre-commit
├── package.json
├── webpack.config.js
├── jest.config.js
└── README.md