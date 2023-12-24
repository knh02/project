// Функція для переключення меню
function toggleMenu() {
    var menu = document.querySelector('.menu');
    menu.classList.toggle('show');
}

// Після завантаження DOM
document.addEventListener("DOMContentLoaded", function () {
    // Код для роботи зі слайдером
    const slides = document.querySelectorAll(".slide");
    // Логіка для дотсів слайдера
    const dotsContainer = document.querySelector(".dots");
    const slideCount = slides.length;
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 5000);

    slides.forEach((slide, index) => {
        // Створення дотсів для слайдера
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.setAttribute("data-slide", index);
        dot.addEventListener("click", () => {
            clearInterval(slideInterval);
            setActiveSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
        dotsContainer.appendChild(dot);
    });

    setActiveSlide(currentSlide);

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        setActiveSlide(currentSlide);
    }

    function setActiveSlide(slideIndex) {
        slides.forEach((slide, index) => {
            slide.style.display = "none";
            if (index === slideIndex) {
                slide.style.display = "block";
            }
        });

        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
            dot.classList.remove("active");
            if (index === slideIndex) {
                dot.classList.add("active");
            }
        });
    }


    // Код для відображення виділеного елемента магазину
    const shopWrapper = document.querySelector(".shop-wrapper");

    shopWrapper.addEventListener("click", function (event) {
        const clickedCard = event.target.closest(".card");
        if (clickedCard) {
            const allCards = shopWrapper.querySelectorAll(".card");
            allCards.forEach(card => {
                if (card !== clickedCard) {
                    card.classList.remove("selected");
                }
            });
            clickedCard.classList.toggle("selected");
        }
    });

    // Код для роботи з вкладками (табами)
    const tabs = document.querySelectorAll(".tabs .tab");
    const tabContent = document.querySelector(".tab-content");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            const tabImgSrc = tab.querySelector(".tab-img img").getAttribute("src");
            const tabDate = tab.querySelector(".tabs-description .date").innerText;
            const tabTitle = tab.querySelector(".tabs-description h5").innerText;
            const tabDescription = tab.querySelector(".tabs-description .description")
                .innerText;

            tabContent.style.backgroundImage = `url(${tabImgSrc})`;
            tabContent.querySelector(".date").innerText = tabDate;
            tabContent.querySelector("h5").innerText = tabTitle;
            tabContent.querySelector(".description").innerText = tabDescription;

            // Опціонально можна відключити активний клас з поточного вибраного таба:
            tabs.forEach(tab => tab.classList.remove("active"));
            tab.classList.add("active");
        });
    });
});



// Логіка для зацикленого слайдера (каруселі)
const carousel = document.querySelector(".row-slider");

const carouselInner = carousel.querySelector(".infinite-slider");
const carouselContent = Array.from(carouselInner.children);
carouselContent.forEach(item => {
    const duplicatedItem = item.cloneNode(true);
    carouselInner.appendChild(duplicatedItem);
});

carouselInner.style.animation = "moveSlider 50s linear infinite";

// Прокрутка до розділів після кліку на посилання у меню
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
      animationTime = 300,
      framesCount = 20;

anchors.forEach(function(item) {
  // кожному якорю присвоюємо обробник події
  item.addEventListener('click', function(e) {
    // прибираємо стандартну поведінку
    e.preventDefault();
    
    // для кожного якоря беремо відповідний йому елемент і визначаємо його координату Y
    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
    
    // запускаємо інтервал, у якому
    let scroller = setInterval(function() {
      // рахуємо на скільки скролити за 1 такт
      let scrollBy = coordY / framesCount;
      
      // якщо к-ть пікселів для скролу за 1 такт більша за відстань до елемента
      // і дно сторінки не досягнуто
      if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // то скролимо на к-ть пікселів, яка відповідає одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // інакше добираємося до елемента і виходимо з інтервалу
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    // час інтервалу дорівнює частці від часу анімації та кількості кадрів
    }, animationTime / framesCount);
  });
});


// Отримання посилання для відкриття модального вікна
const contactUsLink = document.querySelector('.contact-us');
// Отримання модального вікна та кнопки закриття
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
// Отримання форми
const contactForm = document.getElementById('contactForm');

// Функція для відображення модального вікна
function openModal(event) {
    event.preventDefault();
    modal.style.display = 'flex';
}

// Функція для закриття модального вікна
function closeModal() {
    modal.style.display = 'none';
    clearForm(); // Очищення форми при закритті модального вікна
}

// Функція для очищення полів форми
function clearForm() {
    contactForm.reset(); // Скидання полів форми
}

// Додавання обробників подій
contactUsLink.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Отримання форми та обробка відправлення форми
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Отримання значень полів форми
    const fromName = contactForm.elements.from_name.value;
    const toName = contactForm.elements.to_name.value;
    const message = contactForm.elements.message.value;

    // Відправка даних за допомогою EmailJS
    emailjs.send("service_5lsdeii", "template_21rhok4", {
        from_name: fromName,
        to_name: toName,
        message: message,
    }).then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        closeModal(); // Закриття модального вікна після успішної відправки
    }, (error) => {
        console.error('Error sending email:', error);
    });
});
