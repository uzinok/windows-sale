function slider(sliderList, countDesktop) {

    // родитель слайдера
    let parentSlider = sliderList.parentNode,
        sliderItems = sliderList.querySelectorAll('.slider__item'),
        count = 0,
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

                    e = e || event
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

            if (parentSlider.querySelector('.slider__prew').disabled = true) {
                parentSlider.querySelector('.slider__prew').disabled = false;
            }

            if (parentSlider.querySelector('.slider__next').disabled = true) {
                parentSlider.querySelector('.slider__next').disabled = false;
            }

            if (count == 0) {
                parentSlider.querySelector('.slider__prew').disabled = true;
            }

            if (count == (sliderItems.length - 1)) {
                parentSlider.querySelector('.slider__next').disabled = true;
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
}