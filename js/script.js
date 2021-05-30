window.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.header'),
          modalSuccessOk = document.querySelector('.modal-success--ok'),
          modalSuccessFail = document.querySelector('.modal-success--fail');



    // Функция слайдера на странице cases.html

    // function sliderCases(prev, next, slides, sliderField, margin, current, total) {
    //     const prev_ = document.querySelector(prev),
    //           next_ = document.querySelector(next),
    //           slides_ = document.querySelectorAll(slides),
    //           sliderField_ = document.querySelector(sliderField),
    //           current_ = document.querySelector(current),
    //           total_ = document.querySelector(total);

    //     let counter = 0;

    //     total_.textContent = slides_.length;
    //     sliderField_.style.width = `${slides_.length * 850 + margin * (slides_.length - 1)}px`;
    //     next_.addEventListener('click', () => {
    //         counter++;
    //         if (counter >= slides_.length) {
    //             counter = 0;
    //         }
    //         current_.textContent = counter + 1;
    //         sliderField_.style.transform = `translateX(-${(850 + margin) * counter}px)`;
    //     });

    //     prev_.addEventListener('click', () => {
    //         counter--;
    //         if (counter < 0) {
    //             counter = slides_.length - 1;
    //         }
    //         current_.textContent = counter + 1;
    //         sliderField_.style.transform = `translateX(-${(850 + margin) * counter}px)`;
    //     });
    // }

    // sliderCases('.cases-slider__arrow--prev', '.cases-slider__arrow--next', '.cases-slider__card', '.cases-slider__inner', 20, '.cases-slider__interface__text--current', '.cases-slider__interface__text--total');

    // Функция для закрытие модалок

    function modalClose(modal) {
        const modal_ = document.querySelectorAll(modal);

        modal_.forEach(item => {
            item.firstElementChild.firstElementChild.addEventListener('click', () => {
                item.classList.remove('modal--active');

                document.body.style.overflow = '';
                document.body.style.marginRight = '0';
                header.style.width = '100%';
                header.style.transition = '0.3s';
            });

            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal--active')) {
                    item.classList.remove('modal--active');

                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0';
                    header.style.width = '100%';
                    header.style.transition = '0.3s';
                }
            });
        });
    }

    modalClose('[data-modalClose]');

    // Функция для отправки данных с форм

    const forms = () => {
        const form = document.querySelectorAll('form'),
              inputs = document.querySelectorAll('[data-clear]'),
              loader = document.querySelector('.transition-loader');
      
        if (form.length > 0) {
            
              const postData = async (url, data, item) => {
                item.querySelector('button').lastElementChild.style.opacity = '0';
                item.querySelector('button').firstElementChild.style.display = 'block';
                let res = await fetch(url, {
                  method: "POST",
                  body: data
                });
            
                return await res.text();
              };
            
              const clearInputs = () => {
                inputs.forEach(item => {
                  item.value = '';
                  item.classList.remove('go__input--valid');
                });
              };
            
              form.forEach(item => {
                item.addEventListener('submit', (e) => {
                  e.preventDefault();
            
                  let statusMessage = document.createElement('div');
                  statusMessage.classList.add('status');
                  item.appendChild(statusMessage);
            
                  const formData = new FormData(item);
            
                  postData('../send.php', formData, item)
                    .then(res => {
                        item.querySelector('button').lastElementChild.style.opacity = '1';
                        item.querySelector('button').firstElementChild.style.display = 'none';
                        modalSuccessOk.classList.add('modal--active');
                    })
                    .catch(() => {
                        item.querySelector('button').lastElementChild.style.opacity = '1';
                        item.querySelector('button').firstElementChild.style.display = 'none';
                        modalSuccessFail.classList.add('modal--active');
                        setTimeout(() => {
                            modalSuccessFail.classList.remove('modal--active');
                            }, 5000);
                    })
                    .finally(() => {
                      clearInputs();
                      setTimeout(() => {
                        modalSuccessOk.classList.remove('modal--active');
                      }, 5000);
                    });
                });
              });
        }
      };

      forms();


    // Функция для добавления классов инпутам, если они не проходят валидность

    function toggleClassWhenChecking(inputs, validClass, invalidClass) {
        const inputs_ = document.querySelectorAll(inputs);

        inputs_.forEach(item => {
            item.addEventListener('input', () => {
                if (item.validity.valid) {
                    item.classList.remove(invalidClass);
                    item.classList.add(validClass);
                } else {
                    item.classList.remove(validClass);
                    item.classList.add(invalidClass);
                }
            });
        });
    }

    toggleClassWhenChecking('[data-input]', 'go__input--valid', 'go__input--invalid');

    // Добавление активного класса хедеру при скролле

    document.addEventListener('scroll', () => {
        document.documentElement.scrollTop > 50 ? header.classList.add('header--bg') : header.classList.remove('header--bg');
    });

    // Функция для вычисления ширины скролла
    
    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
    
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
    
        return scrollWidth;
    }

    // Функция для вызова модалки

    const scrollWidth = calcScroll();

    const modal = (modal, triggers, modalActiveClass) => {
        const modal_ = document.querySelector(modal),
              triggers_ = document.querySelectorAll(triggers);

        if (modal_) {
            triggers_.forEach(item => {
                item.addEventListener('click', () => {
                    modal_.classList.add(modalActiveClass);
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scrollWidth}px`;
                    header.style.transition = 'none';
                    header.style.width = `calc(100% - ${scrollWidth}px)`;
                });
            });
        }
    };

    modal('.modal', '[data-modal]', 'modal--active');

    // функция для удаления активного класса

    const clearActiveClass = (arr, activeClass) => {
        arr.forEach(item => {
            item.classList.remove(activeClass);
        });
    };

    // Функция для переключения табов

    const tabs = (items, contents, itemActiveClass, contentActiveClass) => {
        const items_ = document.querySelectorAll(items),
              contents_ = document.querySelectorAll(contents);

        if (items.length > 0) {
            items_.forEach((item, index) => {
                item.addEventListener('click', () => {
                    clearActiveClass(items_, itemActiveClass);
                    clearActiveClass(contents_, contentActiveClass);
                    item.classList.add(itemActiveClass);
                    contents_.forEach((content, index1) => {
                        content.firstElementChild.removeAttribute('required');
                        if (index == index1) {
                            content.classList.add(contentActiveClass);
                            content.firstElementChild.setAttribute('required', true);
                        }
                    });
                });
            });
        }
    };

    tabs('.go__form__logo', '.go__input-group--msg', 'go__form__logo--active', 'go__input-group--msg--active');
    tabs('.modal__logo', '.modal__input-group--msg', 'modal__logo--active', 'modal__input-group--msg--active');

    // Установим фиксированную длину для мобильного поля слайдеров

    const widthSliderMobile = (sliderCards, slidesField, cardWidth, margin) => {
        const slidesField_ = document.querySelector(slidesField),
              sliderCards_ = document.querySelectorAll(sliderCards);

        if (slidesField_) {
            slidesField_.style.width = `${cardWidth * sliderCards_.length + margin * (sliderCards_.length)}px`;
        }
    };

    widthSliderMobile('.cases__card--mobile', '.cases__inner--mobile', 280, 20);

    // Слайдер в секции cases

    const sliderSwipe = (sliderWindow, slidesField, sliderCard, cardWidth, margin) => {

        const sliderWindow_ = document.querySelector(sliderWindow),
              slidesField_ = document.querySelector(slidesField),
              sliderCard_ = document.querySelectorAll(sliderCard);

        if (sliderWindow_) {

            let sliderCounter = 0,
                startPoint,
                endPoint = 0,
                movePoint;
            
            const slidesFieldWidth =  cardWidth * sliderCard_.length + (margin * (sliderCard_.length - 1));

            slidesField_.style.width = `${slidesFieldWidth}px`;

            const fieldMove = (event) => {
                if (event.type === "mousemove") {
                    event.preventDefault();
                    movePoint = event.pageX - startPoint;
                } else {
                    movePoint = event.changedTouches[0].pageX - startPoint;
                }
                if (document.documentElement.clientWidth > 1920) {
                    if (movePoint < 0 && Math.abs(movePoint + sliderCounter) >= slidesFieldWidth + margin - 1700) {
                        slidesField_.style.transform = `translateX(${-(slidesFieldWidth + margin - 1700)}px)`;
                    } else if (movePoint > 0 && movePoint + sliderCounter >= 0) {
                        slidesField_.style.transform = `translateX(0px)`;
                    } else {
                        slidesField_.style.transform = `translateX(${movePoint + sliderCounter}px)`;
                    }
                } else if (document.documentElement.clientWidth > 1520 && document.documentElement.clientWidth < 1920) {
                    if (movePoint < 0 && Math.abs(movePoint + sliderCounter) >= slidesFieldWidth + sliderWindow_.getBoundingClientRect().left + margin - document.documentElement.clientWidth) {
                        slidesField_.style.transform = `translateX(${-(slidesFieldWidth + sliderWindow_.getBoundingClientRect().left + margin - document.documentElement.clientWidth)}px)`;
                    } else if (movePoint > 0 && movePoint + sliderCounter >= 0) {
                        slidesField_.style.transform = `translateX(0px)`;
                    } else {
                        slidesField_.style.transform = `translateX(${movePoint + sliderCounter}px)`;
                    }
                } else {
                    if (movePoint < 0 && Math.abs(movePoint + sliderCounter) >= slidesFieldWidth + 2 * margin - document.documentElement.clientWidth) {
                        slidesField_.style.transform = `translateX(${-(slidesFieldWidth + 2 * margin - document.documentElement.clientWidth)}px)`;
                    } else if (movePoint > 0 && movePoint + sliderCounter >= 0) {
                        slidesField_.style.transform = `translateX(0px)`;
                    } else {
                        slidesField_.style.transform = `translateX(${movePoint + sliderCounter}px)`;
                    }
                }
            };

            // touch - события
    
            sliderWindow_.addEventListener('touchstart', (event) => {
                startPoint = event.changedTouches[0].pageX;

                sliderWindow_.addEventListener('touchmove', fieldMove);
            });
    
            sliderWindow_.addEventListener('touchend', (event) => {
                sliderWindow_.removeEventListener('touchmove', fieldMove);
                endPoint = event.changedTouches[0].pageX - startPoint;
                sliderCounter += endPoint;
                if (document.documentElement.clientWidth > 1920) {
                    if (endPoint < 0 && Math.abs(sliderCounter) >= slidesFieldWidth + margin - 1700) {
                        sliderCounter = -(slidesFieldWidth + margin - 1700);
                    } else if (endPoint > 0 && sliderCounter > 0) {
                        sliderCounter = 0;
                    }
                } else if (document.documentElement.clientWidth > 1520 && document.documentElement.clientWidth < 1920) {
                    if (endPoint < 0 && Math.abs(sliderCounter) >= slidesFieldWidth + sliderWindow_.getBoundingClientRect().left + margin - document.documentElement.clientWidth) {
                        sliderCounter = -(slidesFieldWidth + sliderWindow_.getBoundingClientRect().left + margin - document.documentElement.clientWidth);
                    } else if (endPoint > 0 && sliderCounter > 0) {
                        sliderCounter = 0;
                    }
                } else {
                    if (endPoint < 0 && (Math.abs(sliderCounter)) >= (slidesFieldWidth + 2 * margin - document.documentElement.clientWidth)) {
                        sliderCounter = -(slidesFieldWidth + 2 * margin - document.documentElement.clientWidth);
                    } else if (endPoint > 0 && sliderCounter > 0) {
                        sliderCounter = 0;
                    }
                }
                
            });

            // mouse - события

            sliderWindow_.addEventListener('mouseleave', () => {
                sliderWindow_.removeEventListener('mousemove', fieldMove);
            });

            sliderWindow_.addEventListener('mousedown', (event) => {
                event.preventDefault();

                startPoint = event.pageX;
                sliderWindow_.addEventListener('mousemove', fieldMove);
            });

            sliderWindow_.addEventListener('mouseup', (event) => {
                event.preventDefault();

                sliderWindow_.removeEventListener('mousemove', fieldMove);
                endPoint = event.pageX - startPoint;
                sliderCounter += endPoint;
                if (document.documentElement.clientWidth > 1920) {
                    if (endPoint < 0 && Math.abs(sliderCounter) >= slidesFieldWidth + margin - 1700) {
                        sliderCounter = -(slidesFieldWidth + margin - 1700);
                    } else if (endPoint > 0 && sliderCounter > 0) {
                        sliderCounter = 0;
                    }
                } else if (document.documentElement.clientWidth > 1520 && document.documentElement.clientWidth < 1920) {
                    if (endPoint < 0 && Math.abs(sliderCounter) >= slidesFieldWidth + sliderWindow_.getBoundingClientRect().left + margin - document.documentElement.clientWidth) {
                        sliderCounter = -(slidesFieldWidth + sliderWindow_.getBoundingClientRect().left + margin - document.documentElement.clientWidth);
                    } else if (endPoint > 0 && sliderCounter > 0) {
                        sliderCounter = 0;
                    }
                } else {
                    if (endPoint < 0 && (Math.abs(sliderCounter)) >= (slidesFieldWidth + 2 * margin - document.documentElement.clientWidth)) {
                        sliderCounter = -(slidesFieldWidth + 2 * margin - document.documentElement.clientWidth);
                    } else if (endPoint > 0 && sliderCounter > 0) {
                        sliderCounter = 0;
                    }
                }
            });
        }
  
    };
        
    sliderSwipe('.cases__window', '.cases__inner', '[data-sliderCard]', 730, 20);

    // Функция для хедера (меню при нажатии на бургер)

    function burger(burger, headerActiveClass) {
        const burger_ = document.querySelector(burger);

        if (burger_) {
            burger_.addEventListener('click', () => {
                header.classList.toggle(headerActiveClass);
            });
        }
    }

    burger('.header__burger', 'header--active');

});