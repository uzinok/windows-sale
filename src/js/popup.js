function popup(popup) {
    // показываем popup
    popup.classList.add('popup-vizible');
    // через класс делаем запрет скролла
    document.body.classList.add('poppup-Body');

    // закрытие popup по кнопке
    popup.querySelector('.popup__close').addEventListener('click', function () {
        closePopup(popup);
    })

    // закрытие popup по подложке
    popup.addEventListener('click', function (event) {
        console.log(event)
        if (event.target == popup)
            closePopup(popup);
    })

    // закрытие popup по клавиатуре
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 27)
            closePopup(popup);
    })
}

// функция закрытия окна
function closePopup(popup) {
    // скрываем popup
    popup.classList.remove('popup-vizible');
    // возвращаем скрол 
    document.body.classList.remove('poppup-Body');
}