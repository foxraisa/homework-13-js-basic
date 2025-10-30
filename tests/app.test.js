/**
 * @jest-environment jsdom
 */

// Для новичка: тесты проверяют что наше приложение работает правильно

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

describe('Paragraph Manager', () => {
  test('обновляет состояние кнопки при вводе текста', () => {
    const textInput = document.getElementById('textInput');
    const addButton = document.getElementById('addButton');

    // Кнопка должна быть неактивна изначально
    expect(addButton.disabled).toBe(true);

    // Вводим текст
    textInput.value = 'Новый текст';
    window.paragraphApp.updateButton(textInput, addButton);

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
    const result = window.paragraphApp.addParagraph(
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
    const result = window.paragraphApp.addParagraph(
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
      window.paragraphApp.addParagraph(
        textInput,
        addButton,
        paragraphsContainer,
        counterElement,
        errorMessage
      );
    }

    // Проверяем что не больше максимума
    expect(paragraphsContainer.children.length).toBeLessThanOrEqual(
      window.paragraphApp.maxParagraphs
    );
  });
});