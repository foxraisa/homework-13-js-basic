import './style.css';

// Определяем функции прямо здесь
window.paragraphApp = {
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

// Основной код приложения
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Страница загружена!');
  
  const textInput = document.getElementById('textInput');
  const addButton = document.getElementById('addButton');
  const paragraphsContainer = document.getElementById('paragraphsContainer');
  const counterElement = document.getElementById('counter');
  const errorMessage = document.getElementById('errorMessage');
  
  if (!textInput || !addButton || !paragraphsContainer || !counterElement) {
    console.error('❌ Не найдены нужные элементы на странице!');
    return;
  }
  
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
  
  textInput.focus();
  window.paragraphApp.updateCounter(paragraphsContainer, counterElement);
  
  console.log('✅ Приложение готово к работе!');
});
