// Подключаем стили
import './style.css';

// Для новичка: выносим основные функции в глобальную область для тестирования
window.paragraphApp = {
  maxParagraphs: 5,

  // Функция для обновления состояния кнопки
  updateButton(textInput, addButton) {
    // Кнопка активна только когда есть текст
    addButton.disabled = textInput.value.trim() === '';
  },

  // Функция для показа сообщения об ошибке
  showError(errorMessage, message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';

    // Автоматически скрываем ошибку через 3 секунды
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 3000);
  },

  // Функция для обновления счетчика параграфов
  updateCounter(paragraphsContainer, counterElement) {
    const paragraphs = paragraphsContainer.getElementsByTagName('p');
    const count = paragraphs.length;
    counterElement.textContent = count;

    // Меняем цвет если接近 к лимиту
    if (count >= 4) {
      counterElement.style.color = 'red';
    } else {
      counterElement.style.color = 'black';
    }

    return count;
  },

  // Функция для добавления нового параграфа
  addParagraph(textInput, addButton, paragraphsContainer, counterElement, errorMessage) {
    const text = textInput.value.trim();

    // Проверяем что текст не пустой
    if (text === '') {
      this.showError(errorMessage, 'Пожалуйста, введите текст');
      return false;
    }

    // Проверяем что текст не слишком длинный
    if (text.length > 500) {
      this.showError(errorMessage, 'Текст слишком длинный. Максимум 500 символов');
      return false;
    }

    // Создаем новый элемент параграфа
    const newParagraph = document.createElement('p');
    newParagraph.textContent = text;
    newParagraph.style.animation = 'fadeIn 0.5s ease';

    // Добавляем параграф в контейнер
    paragraphsContainer.appendChild(newParagraph);

    // Проверяем количество параграфов
    const paragraphs = paragraphsContainer.getElementsByTagName('p');

    // Если параграфов больше максимума - удаляем первый
    if (paragraphs.length > this.maxParagraphs) {
      paragraphs[0].style.animation = 'fadeOut 0.5s ease';

      setTimeout(() => {
        if (paragraphs[0]) {
          paragraphsContainer.removeChild(paragraphs[0]);
          this.updateCounter(paragraphsContainer, counterElement);
        }
      }, 500);
    }

    // Очищаем поле ввода
    textInput.value = '';

    // Обновляем кнопку и счетчик
    this.updateButton(textInput, addButton);
    this.updateCounter(paragraphsContainer, counterElement);

    return true;
  },
};

// Ждем когда вся страница загрузится
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Страница загружена!');

  // Находим все нужные элементы на странице
  const textInput = document.getElementById('textInput');
  const addButton = document.getElementById('addButton');
  const paragraphsContainer = document.getElementById('paragraphsContainer');
  const counterElement = document.getElementById('counter');
  const errorMessage = document.getElementById('errorMessage');

  // Проверяем что все элементы найдены
  if (!textInput || !addButton || !paragraphsContainer || !counterElement) {
    console.error('❌ Не найдены нужные элементы на странице!');
    return;
  }

  // Функция для обработки нажатия Enter
  function handleKeyPress(event) {
    if (event.key === 'Enter' && !addButton.disabled) {
      window.paragraphApp.addParagraph(
        textInput,
        addButton,
        paragraphsContainer,
        counterElement,
        errorMessage
      );
    }
  }

  // Назначаем обработчики событий
  textInput.addEventListener('input', () => {
    window.paragraphApp.updateButton(textInput, addButton);
  });

  textInput.addEventListener('keypress', handleKeyPress);

  addButton.addEventListener('click', () => {
    window.paragraphApp.addParagraph(
      textInput,
      addButton,
      paragraphsContainer,
      counterElement,
      errorMessage
    );
  });

  // Фокусируемся на поле ввода для удобства
  textInput.focus();

  // Обновляем счетчик при загрузке
  window.paragraphApp.updateCounter(paragraphsContainer, counterElement);

  console.log('✅ Приложение готово к работе!');
});