window.onload = function () {
void (function (root, factory) {
    if (typeof define === 'function' && define.amd) define(factory)
    else if (typeof exports === 'object') module.exports = factory()
    else factory()
  }(this, function () {
    var DETAILS = 'details'
    var SUMMARY = 'summary'
  
    var supported = checkSupport()
    if (supported) return
  
    // Add a classname
    document.documentElement.className += ' no-details'
  
    window.addEventListener('click', clickHandler)
  
    injectStyle('details-polyfill-style',
      'html.no-details ' + DETAILS + ':not([open]) > :not(' + SUMMARY + ') { display: none; }\n')
  
    /*
     * Click handler for `<summary>` tags
     */
  
    function clickHandler (e) {
      if (e.target.nodeName.toLowerCase() === 'summary') {
        var details = e.target.parentNode
        if (!details) return
  
        if (details.getAttribute('open')) {
          details.open = false
          details.removeAttribute('open')
        } else {
          details.open = true
          details.setAttribute('open', 'open')
        }
      }
    }
  
    /*
     * Checks for support for `<details>`
     */
  
    function checkSupport () {
      var el = document.createElement(DETAILS)
      if (!('open' in el)) return false
  
      el.innerHTML = '<' + SUMMARY + '>a</' + SUMMARY + '>b'
      document.body.appendChild(el)
  
      var diff = el.offsetHeight
      el.open = true
      var result = (diff != el.offsetHeight)
  
      document.body.removeChild(el)
      return result
    }
  
    /*
     * Injects styles (idempotent)
     */
  
    function injectStyle (id, style) {
      if (document.getElementById(id)) return
  
      var el = document.createElement('style')
      el.id = id
      el.innerHTML = style
  
      document.getElementsByTagName('head')[0].appendChild(el)
    }
  })); // eslint-disable-line semi;window.onload = function () {
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

    

};;function popup(popup) {
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
};function slider(sliderList, countDesktop, count) {
    // родитель слайдера
    let parentSlider = sliderList.parentNode,
        sliderItems = sliderList.querySelectorAll('.slider__item'),
        widthWap = 240,
        widthDesktop = 450;

    // враппер всего слайдера
    let sliderWrap = document.createElement('div');
    sliderWrap.classList.add('slider__wrap');

    parentSlider.insertBefore(sliderWrap, sliderList);

    // враппер слайдера
    let sliderWrapList = document.createElement('div');
    sliderWrapList.classList.add('slider__wrap-list');

    sliderWrap.appendChild(sliderWrapList);
    sliderWrapList.appendChild(sliderList);

    function createElements() { 
        if (countDesktop != 1) {
            
            // кнопки вперд/назад
            createButton('slider__next', sliderWrap, 'следующий слайд');
            createButton('slider__prew', sliderWrap, 'предидущий слайд');


            // пагер
            let pager = document.createElement('div');
            pager.classList.add('pager');
            sliderWrap.appendChild(pager);

            // кнопки пагера
            for (let i = 0; i < sliderItems.length; i++) {
                pagerButton = createButton('pager-button', pager, 'показать слайд номер: ' + (i + 1), i);
                sliderItems[i].setAttribute('data-slide', i);
                if (i == 0) {
                    pagerButton.classList.add('active')
                }
                pagerButton.addEventListener('click', function (e) {
                    sliderClick(e);
                })
            }

            function createButton(buttonClass, buttonParent, ariaText, i) {
                let elem = document.createElement('button');
                elem.classList.add(buttonClass);
                elem.setAttribute('aria-label', ariaText);
                if (i != undefined) elem.setAttribute('data-slide', i);
                buttonParent.appendChild(elem);
                return elem;
            }
        }
    }

    function removeElements() {
        parentSlider.querySelector('.slider__next').remove();
        parentSlider.querySelector('.slider__prew').remove();
        parentSlider.querySelector('.pager').remove();

        parentSlider.querySelector('li.active').classList.remove('active');
    }

    checkCreateElements();

    // resize
    window.addEventListener('resize', function () {
        windowResize();
    })

    // безопасный resize
    let check;

    function windowResize() {
        clearTimeout(check);

        check = setTimeout(function () {

            // фенкции для resize
            checkCreateElements();
            sliderClick()
        }, 100)
    }

    // проверка наличия элементов
    function checkCreateElements() {

        let widthWindow = window.innerWidth;

        parentSlider.classList.remove('slider--nojs');

        if (widthWindow > 985 && sliderItems.length == 2) {
            if (parentSlider.querySelector('.slider__next')) {
                removeElements();
            }
        } else {
            if (!(parentSlider.querySelector('.slider__next'))) {

                if (countDesktop != 1) {
                    createElements();

                    sliderList.querySelector('li').classList.add('active');
                    parentSlider.querySelector('.slider__prew').disabled = true;


                    parentSlider.querySelector('.slider__next').addEventListener('click', function () {
                        count++;
                        sliderClick();
                    })

                    parentSlider.querySelector('.slider__prew').addEventListener('click', function () {
                        count--;
                        sliderClick();
                    })
                }
            }
        }

        if (widthWindow > 990 && countDesktop > 1) {
            sliderList.style.width = widthDesktop * sliderItems.length + 'px';
            sliderWrapList.style.width = widthDesktop * 2 + 'px';
        } else {
            sliderList.style.width = widthWap * sliderItems.length + 'px';
            sliderWrapList.style.width = widthWap + 'px';
        }

    }

    function sliderClick(e) {

        if (e) {
            count = e.target.getAttribute('data-slide');
        }

        if (parentSlider.querySelector('.slider__prew')) {

            if (count == 0) {
                parentSlider.querySelector('.slider__prew').disabled = true;
            } else {
                parentSlider.querySelector('.slider__prew').disabled = false;
            }

            if (count == (sliderItems.length - 1)) {
                parentSlider.querySelector('.slider__next').disabled = true;
            } else {
                parentSlider.querySelector('.slider__next').disabled = false;
            }


            parentSlider.querySelector('li.active').classList.remove('active');
            parentSlider.querySelector('li[data-slide="' + count + '"]').classList.add('active');
            parentSlider.querySelector('button.active').classList.remove('active');
            parentSlider.querySelector('button[data-slide="' + count + '"]').classList.add('active');
        }

        if (window.innerWidth < 990) {
            if (count != (sliderItems.length - 1)) {
                sliderList.style.transform = 'translateX(-' + widthWap * count + 'px)';
            } else {
                sliderList.style.transform = 'translateX(-' + widthWap * (sliderItems.length - 1) + 'px)';
            }
        } else {

            if (countDesktop != 1) {

                if (!(count >= (sliderItems.length - 2))) {
                    sliderList.style.transform = 'translateX(-' + widthDesktop * count + 'px)';
                } else {
                    sliderList.style.transform = 'translateX(-' + widthDesktop * (sliderItems.length - 2) + 'px)';
                }
            } else {
                if (count != (sliderItems.length - 1)) {
                    sliderList.style.transform = 'translateX(-' + widthWap * count + 'px)';
                } else {
                    sliderList.style.transform = 'translateX(-' + widthWap * (sliderItems.length - 1) + 'px)';
                }
            }

        }
    }

    if (countDesktop == 1) {
        setInterval(function (e) {

            sliderClick(e);
            count++
            if (count >= sliderItems.length) {
                count = 0;
            }
        }, 3000)
    }

    if (document.querySelector('.footer__logo') && parentSlider.classList.contains('prod-slider')) {
        let footerLinks = document.querySelectorAll('.footer__logo a');
        
        for (let i = 0; i < footerLinks.length; i++) {
            footerLinks[i].addEventListener('click', function(e) {
                e.preventDefault();
                count = this.getAttribute('data-slide')
                sliderClick();

                // вызываю функцию скролла
                scrollMenu(this.getAttribute("href"));
            
                // переменная для остановки анимации
                var temp;
                // функция скролла
                function scrollMenu(blockId) {

                    console.log(blockId);
                    console.log(parentSlider.querySelector('li[data-slide="' + count + '"]'))
                    // console.log(parentSlider.querySelector(blockId));
            
                  // отмена анимации
                  cancelAnimationFrame(temp);
            
                  // время начала анимации
                  var start = performance.now();
            
                  // высота скролла страницы
                  var from = window.pageYOffset || document.documentElement.scrollTop,
                    // высота от верхнего края окна браузера до блока
                    to = document.querySelector('li[data-slide="' + count + '"]').getBoundingClientRect().top - 100;
            
                  // время анимации из расчета 5000px за секунду
                  duration = 1000 * Math.abs(to) / 5000;
            
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
    }
    
}