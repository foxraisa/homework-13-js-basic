// paragraphManager.js - чистая логика для тестов
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
    if (paragraphs.length > this.maxParagraphs) {
      paragraphs[0].style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => {
        if (paragraphs[0]) {
          paragraphsContainer.removeChild(paragraphs[0]);
          this.updateCounter(paragraphsContainer, counterElement);
        }
      }, 500);
    }

    textInput.value = '';
    this.updateButton(textInput, addButton);
    this.updateCounter(paragraphsContainer, counterElement);
    return true;
  }
};

// Экспортируем для использования в тестах
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { paragraphApp };
}
