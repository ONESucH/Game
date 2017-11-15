'use strict';
var dataPosition = {};
/* Загружаем меню */
loadingMenu();

function loadingMenu() {
    var content = document.getElementsByTagName('body')[0],
        sheath = document.createElement('div'),
        menu = document.createElement('div'),
        title = document.createElement('div'),
        play = document.createElement('div'),
        playInformation = document.createElement('div');

    content.innerHTML = ''; // чистим контейнер
    content.className = 'content'; // content
    sheath.className = 'sheath'; // оболочка
    menu.className = 'menu'; // меню

    /* Добавляем содержимое в меню */
    title.innerHTML = 'Beware of enemies';
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    playInformation.innerHTML = 'Нажми, чтобы начать игру';

    /* Отслеживаем запуск игры */
    play.onclick = function () {
        start();
    };

    menu.append(title, play, playInformation); // меню
    sheath.appendChild(menu);
    content.appendChild(sheath);
}

function start() { // запускаем игру
    var content = document.getElementsByTagName('body')[0],
        userCircle = document.createElement('div'), // пользовательский круг
        randomPositionCircle = Math.floor(Math.random() * (window.innerHeight - 25) + 1), // рандомная позиция user
        counterVertical = 0,
        level = 1, // уровень, чем больше тем сложнее
        counterGorizontal = randomPositionCircle,
        sizeCircle = 25;

    content.innerHTML = '';
    userCircle.className = 'draw-circle';

    setInterval(function () {
        var X = userCircle.getBoundingClientRect().left,
            Y = userCircle.getBoundingClientRect().top;

        dataPosition.userPosition = {
            positionX: X,
            positionY: Y
        };

    }, 200);

    setInterval(function () {
        /* Движение пользовательского шара */
        var widthWindow = window.innerWidth,
            heightWindow = window.innerHeight;

        userCircle.style.marginLeft = counterVertical + 'px';
        userCircle.style.marginTop = counterGorizontal + 'px';

        counterVertical++;

        if (counterVertical >= widthWindow + sizeCircle) { // Положительное значение поля по горизонтали "Право"
            counterVertical = 0;
        }
        if (counterVertical <= 0 - sizeCircle) { // Отрицательное значение поля по горизонтали "Лево"
            counterVertical = widthWindow;
        }
        if (counterGorizontal >= heightWindow + sizeCircle) { // Положительное значение поля по вертикали "Низ"
            counterGorizontal = 0;
        }
        if (counterGorizontal <= 0 - sizeCircle) { // Отрицательное значение поля по вертикали "Верх"
            counterGorizontal = heightWindow;
        }

        window.onkeydown = function (item) {
            if (item.key === 'ArrowLeft') { // нажатие на лево
                counterVertical -= 30;
            }
            if (item.key === 'ArrowRight') { // нажатие на лево
                counterVertical += 20;
            }
            if (item.key === 'ArrowUp') { // нажатие на лево
                counterGorizontal -= 20;
            }
            if (item.key === 'ArrowDown') { // нажатие на лево
                counterGorizontal += 20;
            }
        };

    }, 10);

    content.appendChild(userCircle);
    moveBots();
    /* Интервал создания ботов */
    setInterval(function () {
        moveBots();
    }, level * 1000);
    targetCircle(sizeCircle);
}

/* Создание, движение ботов */
function moveBots() {
    var content = document.getElementsByTagName('body')[0],
        counterBots = window.innerWidth, // Скорость ботов
        bot = document.createElement('div'), // круг бота
        randomPostionCrazyCircle = Math.floor(Math.random() * (window.innerHeight) - 5); // рандомная позиция врага

    bot.style.marginTop = randomPostionCrazyCircle + 'px';

    setInterval(function () {
        var X = bot.getBoundingClientRect().left,
            Y = bot.getBoundingClientRect().top;

        dataPosition.botPosition = {
            positionX: X,
            positionY: Y
        };

        bot.style.marginLeft = counterBots + 20 + 'px';
        bot.className = 'draw-circle-crazy';
        content.appendChild(bot);

        if (counterBots <= -25) {
            content.removeChild(bot);
        }

        counterBots--;
    }, 10);

    /* Ловим позицию бота */
}

/* Ловим позицию ботов и юзера */
function targetCircle(dataSizeCircle) {
    setInterval(function () {
        if (dataPosition.userPosition.positionX === dataPosition.botPosition.positionX &&
            dataPosition.userPosition.positionY === dataPosition.botPosition.positionY &&
            dataPosition.userPosition.positionX + dataSizeCircle === dataPosition.botPosition.positionX + dataSizeCircle &&
            dataPosition.userPosition.positionY + dataSizeCircle === dataPosition.botPosition.positionY + dataSizeCircle &&
            dataPosition.userPosition.positionX - dataSizeCircle === dataPosition.botPosition.positionX - dataSizeCircle &&
            dataPosition.userPosition.positionY - dataSizeCircle === dataPosition.botPosition.positionY - dataSizeCircle) {
            alert('Сработала коллизия');
        }
    }, 200);
}