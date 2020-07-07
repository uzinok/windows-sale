window.onload = function () {
    slider(document.querySelector('.slider-1-js'), 2);
    slider(document.querySelector('.slider-2-js'), 1);
    
    document.querySelector('.btn').addEventListener('click', function () {
        // вызываем функцию popup
        popup(document.querySelector('.popap'));
      })

    document.querySelector('.header').addEventListener('click', function() {
        console.log(document.querySelector('.slider-1-js button[data-slide="2"]'))
    })
};