function myScroll() {

    // по клику на навигацию
    document.querySelector(".menu__list").addEventListener("click", function (e) {
  
      e = e || event;
  
      e.preventDefault();
      // вызываю функцию скролла
      scrollMenu(e.target.getAttribute("href"))
  
      // переменная для остановки анимации
      var temp;
      // функция скролла
      function scrollMenu(blockId) {
  
        // отмена анимации
        cancelAnimationFrame(temp);
  
        // время начала анимации
        var start = performance.now();
  
        // высота скролла страницы
        var from = window.pageYOffset || document.documentElement.scrollTop,
          // высота от верхнего края окна браузера до блока
          to = document.querySelector(blockId).getBoundingClientRect().top - 85;
  
        // время анимации из расчета 3000px за секунду
        duration = 1000 * Math.abs(to) / 2000;
  
        // анимация скролла
        requestAnimationFrame(function step(timestamp) {
          // timestamp метка времени от начала анимации
          // сколько прошло времени (timestamp - start)
          // (timestamp - start) / duration приравниваем к 1
          var progress = (timestamp - start) / duration;
          1 <= progress && (progress = 1);
          // from + to расстояние от верха документа до верха блока
          // from + to * progress промежуточное расстояние до блока. progress == 1 мы на месте
          // изменение высоты скролла
          window.scrollTo(0, from + to * progress | 0);
  
          // остановка анимации
          // 1 > progress анимация продолжается или
          // задаем hash 
  
          (1 > progress) ? temp = requestAnimationFrame(step): (e.target.blur());
  
          // отменяем прокрутку если крутим колесом мышки
          document.addEventListener("wheel", function () {
            cancelAnimationFrame(temp);
            e.target.blur();
          })
        })
      }
    })
  }