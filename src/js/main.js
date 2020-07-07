window.onload = function () {
    // слайдеры
    slider(document.querySelector('.slider-1-js'), 2);
    slider(document.querySelector('.slider-2-js'), 1);

    // popup
    if (document.querySelector('.btn-popup')) {
        let btnPopup = document.querySelectorAll('.btn-popup');

        for (let i = 0; i < btnPopup.length; i++) {
            console.log(btnPopup)
            
            btnPopup[i].addEventListener('click', function () {
                // вызываем функцию popup
                popup(document.querySelector('.popap'));
            })
        }
    }



};