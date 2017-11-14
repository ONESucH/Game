'use strict';

/* Загружаем меню */
// loadingMenu();
//
// function loadingMenu() {
//     var content = document.getElementsByTagName('body')[0],
//         sheath = document.createElement('div'),
//         menu = document.createElement('div'),
//         title = document.createElement('div'),
//         play = document.createElement('div'),
//         playInformation = document.createElement('div');
//
//     content.innerHTML = ''; // чистим контайнер
//     content.className = 'content'; // content
//     sheath.className = 'sheath'; // оболочка
//     menu.className = 'menu'; // меню
//
//     /* Добавляем содержимое в меню */
//     title.innerHTML = 'Hello Snake';
//     play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
//     playInformation.innerHTML = 'Нажми, чтобы начать игру';
//
//     /* Отслеживаем запуск игры */
//     play.onclick = function () {
//         start();
//     };
//
//     menu.append(title, play, playInformation); // меню
//     sheath.appendChild(menu);
//     content.appendChild(sheath);
// }

start(); // tmp 

function start() { // запускаем игру
    var content = document.getElementsByTagName('body')[0],
        div = document.createElement('div'),
        timer = 1, // скорость анимации передвижения
        counterVertical = 0,
        counterGorizontal = 0;

    content.innerHTML = '';
    div.className = 'draw-circle';

    setInterval(function () {
        var widthWindow = window.innerWidth,
            heightWindow = window.innerHeight,
            sizeCircle = 25;

        div.style.marginLeft = counterVertical + 'px';
        div.style.marginTop = counterGorizontal + 'px';

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
            console.log(item);
            if (item.key === 'ArrowLeft') { // нажатие на лево
                counterVertical -= 20;
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
        }
    }, timer);

    content.appendChild(div);
}