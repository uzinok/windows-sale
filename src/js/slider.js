function slider(sliderList, countDesktop, count) {
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

            let interactive_elements = sliderList.querySelectorAll('a, button, input, select, progress, textarea, details');
            for (let i = 0; i < interactive_elements.length; i++) {
                interactive_elements[i].setAttribute("tabindex", -1)
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
                scrollMenu();
            
                // переменная для остановки анимации
                var temp;
                // функция скролла
                function scrollMenu() {

                    console.log(parentSlider.querySelector('li[data-slide="' + count + '"]'))
            
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