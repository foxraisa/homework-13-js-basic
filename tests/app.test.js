/**
 * @jest-environment jsdom
 */

// Определяем ВСЕ функции прямо здесь
const paragraphApp = {
  maxParagraphs: 5,

  updateButton(textInput, addButton) {
    addButton.disabled = textInput.value.trim() === '';
  },

  showError(errorMessage, message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 3000);
  },

  updateCounter(paragraphsContainer, counterElement) {
    const paragraphs = paragraphsContainer.getElementsByTagName('p');
    const count = paragraphs.length;
    counterElement.textContent = count;
    
    if (count >= 4) {
      counterElement.style.color = 'red';
    } else {
      counterElement.style.color = 'black';
    }
    
    return count;
  },

  addParagraph(textInput, addButton, paragraphsContainer, counterElement, errorMessage) {
    const text = textInput.value.trim();
    
    if (text === '') {
      this.showError(errorMessage, 'Пожалуйста, введите текст');
      return false;
    }

    if (text.length > 500) {
      this.showError(errorMessage, 'Текст слишком длинный. Максимум 500 символов');
      return false;
    }

    const newParagraph = document.createElement('p');
    newParagraph.textContent = text;
    newParagraph.style.animation = 'fadeIn 0.5s ease';
    paragraphsContainer.appendChild(newParagraph);

    const paragraphs = paragraphsContainer.getElementsByTagName('p');
    
    // УПРОЩЕННАЯ ЛОГИКА: удаляем лишние параграфы сразу
    while (paragraphs.length > this.maxParagraphs) {
      const firstParagraph = paragraphs[0];
      paragraphsContainer.removeChild(firstParagraph);
    }

    textInput.value = '';
    this.updateButton(textInput, addButton);
    this.updateCounter(paragraphsContainer, counterElement);
    
    return true;
  }
};

// Настройка DOM перед каждым тестом
beforeEach(() => {
  document.body.innerHTML = `
    <div class="container">
      <input type="text" id="textInput" placeholder="Введите текст...">
      <button id="addButton" disabled>Добавить параграф</button>
      <div id="errorMessage" class="error-message" style="display: none;"></div>
      <div class="paragraphs-container" id="paragraphsContainer">
        <p>Первый параграф</p>
        <p>Второй параграф</p>
      </div>
      <div class="counter">
        Параграфов: <span id="counter">2</span>
        <div class="limit-info">(максимум 5)</div>
      </div>
    </div>
  `;
});

// Тесты
describe('Paragraph Manager', () => {
  test('обновляет состояние кнопки при вводе текста', () => {
    const textInput = document.getElementById('textInput');
    const addButton = document.getElementById('addButton');

    // Кнопка должна быть неактивна изначально
    expect(addButton.disabled).toBe(true);

    // Вводим текст
    textInput.value = 'Новый текст';
    paragraphApp.updateButton(textInput, addButton);

    // Кнопка должна стать активной
    expect(addButton.disabled).toBe(false);
  });

  test('добавляет новый параграф при валидном вводе', () => {
    const textInput = document.getElementById('textInput');
    const addButton = document.getElementById('addButton');
    const paragraphsContainer = document.getElementById('paragraphsContainer');
    const counterElement = document.getElementById('counter');
    const errorMessage = document.getElementById('errorMessage');

    const initialCount = paragraphsContainer.children.length;

    textInput.value = 'Тестовый параграф';
    const result = paragraphApp.addParagraph(
      textInput,
      addButton,
      paragraphsContainer,
      counterElement,
      errorMessage
    );

    expect(result).toBe(true);
    expect(paragraphsContainer.children.length).toBe(initialCount + 1);
    expect(paragraphsContainer.lastChild.textContent).toBe('Тестовый параграф');
  });

  test('показывает ошибку при пустом вводе', () => {
    const textInput = document.getElementById('textInput');
    const addButton = document.getElementById('addButton');
    const paragraphsContainer = document.getElementById('paragraphsContainer');
    const counterElement = document.getElementById('counter');
    const errorMessage = document.getElementById('errorMessage');

    textInput.value = '   ';
    const result = paragraphApp.addParagraph(
      textInput,
      addButton,
      paragraphsContainer,
      counterElement,
      errorMessage
    );

    expect(result).toBe(false);
    expect(errorMessage.style.display).toBe('block');
    expect(errorMessage.textContent).toBe('Пожалуйста, введите текст');
  });

  test('ограничивает максимальное количество параграфов', () => {
    const textInput = document.getElementById('textInput');
    const addButton = document.getElementById('addButton');
    const paragraphsContainer = document.getElementById('paragraphsContainer');
    const counterElement = document.getElementById('counter');
    const errorMessage = document.getElementById('errorMessage');

    // Добавляем несколько параграфов
    for (let i = 0; i < 10; i++) {
      textInput.value = `Параграф ${i + 3}`;
      paragraphApp.addParagraph(
        textInput,
        addButton,
        paragraphsContainer,
        counterElement,
        errorMessage
      );
    }

    // Проверяем что не больше максимума
    expect(paragraphsContainer.children.length).toBeLessThanOrEqual(
      paragraphApp.maxParagraphs
    );
  });
});
