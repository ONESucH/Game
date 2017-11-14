'use strict';

start();

function start() {
    var content = document.getElementsByTagName('body')[0],
        div = document.createElement('div'),
        timer = 1, // скорость анимации
        counterVertical = 0,
        counterGorizontal = 0;

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
        if (counterVertical <= 0 - sizeCircle ) { // Отрицательное значение поля по горизонтали "Лево"
            counterVertical = widthWindow;
        }
        if (counterGorizontal >= heightWindow + sizeCircle) { // Положительное значение поля по вертикали "Низ"
            counterGorizontal = 0;
        }
        if (counterGorizontal <= 0 - sizeCircle ) { // Отрицательное значение поля по вертикали "Верх"
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