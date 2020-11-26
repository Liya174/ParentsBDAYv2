function initSlider() {
    const images = [
        { id: 0, src: './img/parents.jpg'},
        { id: 1, src: './img/we.jpg' },
        { id: 2, src: './img/we2.jpg' },
        { id: 3, src: './img/we3.jpg' },
        { id: 4, src: './img/we4.jpg' },
        { id: 5, src: './img/we5.jpg' },
        { id: 6, src: './img/we6.jpg' },
        { id: 7, src: './img/we7.jpg' },
        { id: 8, src: './img/we8.jpg' },
        { id: 9, src: './img/we9.jpg' },
        { id: 10, src: './img/we10.jpg' },
        { id: 11, src: './img/we11.jpg' },
        { id: 12, src: './img/we12.jpg' },
        { id: 13, src: './img/we13.jpg' },
        { id: 14, src: './img/we14.jpg' },
        { id: 15, src: './img/we15.jpg' },
        { id: 16, src: './img/we16.jpg' },
        { id: 17, src: './img/we17.jpg' },
        { id: 18, src: './img/we18.jpg' },
    ]

    const autoplayInterval = 4000;
    let intervalId;

    const sliderButtons = document.querySelectorAll('.slider-button');
    const sliderImagesContainer = document.querySelector('.slider-images');
    const sliderDots = document.querySelector('.slider-dots');

    const exitButton = document.querySelector('.exit-button');
    const main = document.querySelector('.main');
    const modal = document.querySelector('.modal');

    //на основе массива объектов создаём блок с картинками, первая - активная, остальные - скрыты
    function createImages(images) {
        images.forEach( ({ id, src }) => {
            let imageDiv = `
                <div class="slider-image ${id === 0 ? "active" : ""}" 
                data-number="${id}"
                style="background-image:url(${src});">
                </div>`;
            sliderImagesContainer.innerHTML += imageDiv;
        });
    };

    //создаём точки
    function createDots() {
        images.forEach(({ id }) => {
            let dotDiv = `
                <div class="slider-dots__item ${id === 0 ? "active-dot" : ""}" 
                data-number="${id}">
                </div>`;
            sliderDots.innerHTML += dotDiv;
        })
        
        sliderDots.querySelectorAll('.slider-dots__item').forEach((dot) => {
            dot.addEventListener('click', function() {        
                stopAutoplay();
                setAutoplay();
                moveSlider(this.dataset.number);
            })
        })
    }

    // автопроигрывание картинок
    function setAutoplay() {
        intervalId = setInterval(function() {   
            const length = document.querySelectorAll('.slider-image').length;
            let currentIndex = +document.querySelector('.active').dataset.number;
            let nextIndex = (currentIndex === length - 1) ? 0 : currentIndex + 1;
            moveSlider(nextIndex);
        }, autoplayInterval);
    }

    function stopAutoplay() {
        clearInterval(intervalId);
    }

    //переключение при нажатии на кнопку право/лево
    function chooseNextImage(event) {
        console.log(event.type);
        stopAutoplay();
        setAutoplay();
        let choisedButton = event.target; //нажатая кнопка
        let choisedKey = event.key; //нажатая клавиша
        const length = document.querySelectorAll('.slider-image').length;
        let currentIndex = +document.querySelector('.active').dataset.number;
        let nextIndex;
        
        if (event.type === 'click') {
            if (choisedButton.classList.contains('right')) {
                nextIndex = (currentIndex === length - 1) ? 0 : currentIndex + 1;
            } else {
                nextIndex = (currentIndex === 0) ? length - 1 : currentIndex - 1;
            }
        }
        if (event.type === 'keydown') {
            if (choisedKey === "ArrowRight") {
                nextIndex = (currentIndex === length - 1) ? 0 : currentIndex + 1;
            } else {
                nextIndex = (currentIndex === 0) ? length - 1 : currentIndex - 1;
            }
        }
        
        moveSlider(nextIndex);
    }

    //изменение активной картинки слайдера
    function moveSlider(num) {
        document.querySelector('.active').classList.remove('active');
        document.querySelectorAll('.slider-image')[num].classList.add('active');
        
        document.querySelector('.active-dot').classList.remove('active-dot');
        document.querySelectorAll('.slider-dots__item')[num].classList.add('active-dot');
    }

    //отркытие модального окна для приближения фото
    function openModal() {
        stopAutoplay();
        const sliderImages = document.querySelectorAll('.slider-image');
        toggleModal();
        sliderImages.forEach(sliderImage => {
            if (sliderImage.classList.contains('active')) {
                modal.style.backgroundImage = 
                sliderImage.style.backgroundImage;
            }
        })
    };

    //закрытие модального окна
    function closeModal() {
        setAutoplay();
        toggleModal();
    }

    //изменение видимости окон
    function toggleModal() {
        main.classList.toggle('active-window');
        modal.classList.toggle('active-window');
    }

    //обработчики событий
    sliderButtons.forEach(button => {
        button.addEventListener('click', event => {
            chooseNextImage(event);
        })
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            chooseNextImage(event);
        }
    });

    sliderImagesContainer.addEventListener('click', openModal);
    exitButton.addEventListener('click', closeModal);

    //запуск функций
    createImages(images);
    createDots(images);
    setTimeout(setAutoplay(), 3000);
}

document.addEventListener('DOMContentLoaded', initSlider);

export default initSlider;
// export stopAutoplay;