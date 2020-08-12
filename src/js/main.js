window.onload = function () {
    // слайдеры
    slider(document.querySelector('.slider-1-js'), 2, 0);
    slider(document.querySelector('.slider-2-js'), 1, 0);

    // popup
    if (document.querySelector('.btn-popup')) {
        let btnPopup = document.querySelectorAll('.btn-popup');

        for (let i = 0; i < btnPopup.length; i++) {
            
            btnPopup[i].addEventListener('click', function () {
                // вызываем функцию popup
                popup(document.querySelector('.popap'));
            })
        }
    }
    myScroll()
    

};