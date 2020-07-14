function popup(popup) {
    // показываем popup
    // что бы сработала анимация сначала задаем свойство display со значением block
    popup.style.display = 'block';
    // и через минимальное время с анимацией показываем окно добавляя необходимые классы нашему popup
    setTimeout(function () {
        popup.classList.add('popup-vizible');
        // через класс делаем запрет скролла
        document.body.classList.add('poppup-Body');
    }, 10)

    // закрытие popup по кнопке
    popup.querySelector('.popup__close').addEventListener('click', function () {
        closePopup(popup);
    })

    // закрытие popup по подложке
    popup.addEventListener('click', function (event) {
        if (event.target == popup)
            closePopup(popup);
    })

    // тут все что связанно с клавиатурой
    document.addEventListener('keydown', function (event) {
        // закрытие popup по клавиатуре
        if (event.keyCode == 27)
            closePopup(popup);

        // массив возможных интерактивных элементов
        let interactive_elements = popup.querySelectorAll('a, button, input, select, label, progress, textarea, summary');

        // если идем вниз (tab)
        if (event.keyCode == 9) {
            // если предидущий интерактивный элемент - крайний в popup
            if (interactive_elements[interactive_elements.length - 1] == document.activeElement) {
                // отменяем действия по умолчанию
                event.preventDefault();
                // ставим фокус первому элементу
                interactive_elements[0].focus();
            }
        }

        // если идем ввер (shift + tab)
        if (event.keyCode == 9 && event.shiftKey) {
            // если предидущий активный элемент первый элемент в popup
            if (interactive_elements[0] == document.activeElement) {
                // отменяем действия по умолчанию
                event.preventDefault();
            }
        }

    })
}

// функция закрытия окна
function closePopup(popup) {
    // скрываем popup с анимацией
    popup.classList.remove('popup-vizible');
    // возвращаем скрол 
    document.body.classList.remove('poppup-Body');

    // прячем popup от читалок после завершения анимации
    setTimeout(function () {
        popup.style.display = 'none';
    }, 200)
}