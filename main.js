'use strict';
var content = document.getElementsByTagName('body')[0],
    dataPosition = {};

/* Загружаем меню */
loadingMenu();

/* Стартовое меню */
function loadingMenu() {
    var sheath = document.createElement('div'),
        menu = document.createElement('div'),
        title = document.createElement('div'),
        play = document.createElement('div'),
        playInformation = document.createElement('div');

    content.innerHTML = ''; // чистим контейнер
    content.className = 'content'; // content
    sheath.className = 'sheath'; // оболочка
    menu.className = 'menu'; // меню

    /* Добавляем содержимое в меню */
    title.innerHTML = 'Beware of enemies'; // Название игры , шрифты работают с англ. яз.
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'; // кнопка запуска
    playInformation.innerHTML = 'Press, play'; // информационное поле

    /* Отслеживаем запуск игры */
    play.onclick = function () {
        start();
    };

    menu.append(title, play, playInformation); // меню
    sheath.appendChild(menu);
    content.appendChild(sheath);
}

/* Запускаем игру */
function start() {
    var userCircle = document.createElement('div'), // пользовательский круг
        randomPositionCircle = Math.floor(Math.random() * (window.innerHeight - 25) + 1), // рандомная позиция пользователя
        counterVertical = 0, // нулевое значение по горизонтали
        counterGorizontal = randomPositionCircle, // положение нашего круга вертикали
        level = 1, // уровень, чем больше тем сложнее
        sizeCircle = 25; // размер нашего круга

    content.innerHTML = ''; // очищаем всё что было внутри контейнера
    userCircle.className = 'draw-circle';

    setInterval(function () {
        var X = userCircle.getBoundingClientRect().left, // координаты по Х
            Y = userCircle.getBoundingClientRect().top; // координаты по Y

        dataPosition.userPosition = {
            positionX: X,
            positionY: Y
        };

    }, 200);

    /* Движение пользовательского шара */
    setInterval(function () {
        var widthWindow = window.innerWidth, // получаем значение ширины окна браузера
            heightWindow = window.innerHeight; // получаем значение высоты окна браузера
            
        userCircle.style.marginLeft = counterVertical + 'px'; // положение пользователя по Х и Y
        userCircle.style.marginTop = counterGorizontal + 'px'; // положение пользователя по Х и Y

        counterVertical++; // движение круга пользователя

        if (counterVertical >= widthWindow + sizeCircle) { // Положительное значение поля по горизонтали "Право"
            counterVertical = 0; // возращаем круг в нужную позицию, если он вылетел за блок
        }
        if (counterVertical <= 0 - sizeCircle) { // Отрицательное значение поля по горизонтали "Лево"
            counterVertical = widthWindow; // возращаем круг в нужную позицию, если он вылетел за блок
        }
        if (counterGorizontal >= heightWindow + sizeCircle) { // Положительное значение поля по вертикали "Низ"
            counterGorizontal = 0; // возращаем круг в нужную позицию, если он вылетел за блок
        }
        if (counterGorizontal <= 0 - sizeCircle) { // Отрицательное значение поля по вертикали "Верх"
            counterGorizontal = heightWindow; // возращаем круг в нужную позицию, если он вылетел за блок
        }

        /* Следим за нажатием на стрелочки */
        window.onkeydown = function (item) {
            if (item.key === 'ArrowLeft') { // нажатие на лево
                counterVertical -= 30;
            }
            if (item.key === 'ArrowRight') { // нажатие на право
                counterVertical += 20;
            }
            if (item.key === 'ArrowUp') { // нажатие на верх
                counterGorizontal -= 20;
            }
            if (item.key === 'ArrowDown') { // нажатие на низ
                counterGorizontal += 20;
            }
        };

    }, 50); // скорость пользовательского шарика

    content.appendChild(userCircle);
    /* Создание, движение ботов */
    moveBots();
    /* Интервал создания ботов */
    setInterval(function () {
        moveBots();
    }, level * 1000);
    /* Ловим позиции бота */
    targetCircle(sizeCircle);
}

/* Создание, движение ботов */
function moveBots() {
    var counterBots = window.innerWidth, // Скорость ботов
        bot = document.createElement('div'), // круг бота
        randomPostionCrazyCircle = Math.floor(Math.random() * (window.innerHeight) - 5); // рандомная позиция врага

    bot.style.marginTop = randomPostionCrazyCircle + 'px'; // изначальная позиция круга по вертикали

    setInterval(function () {
        var X = bot.getBoundingClientRect().left, // кооржинаты по Х
            Y = bot.getBoundingClientRect().top; // кооржинаты по Y

        dataPosition.botPosition = { // записываем координаты в объект
            positionX: X,
            positionY: Y
        };

        bot.style.marginLeft = counterBots + 20 + 'px'; // Движение ботов
        bot.className = 'draw-circle-crazy';
        content.appendChild(bot); // вставляем бота в наш контайнер

        if (counterBots <= -25) {
            content.removeChild(bot); // Очищаем пройденный(за контайнер) круг
        }

        bot.parentNode.removeChild(bot); // удаляем по id тег
        counterBots--; // движение бота
    }, 10);
}

/* Ловим позицию ботов и юзера */
function targetCircle() {

    setInterval(function () {
        console.log('bot', dataPosition.botPosition);
        console.log('user', dataPosition.userPosition);
    }, 1000);

}