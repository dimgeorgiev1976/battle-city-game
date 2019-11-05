; (function () {
    'use strict'
    // Класс каторой хранит в себе списък все изображения 
    // каторой нужно отресавать
    class Container {
        constructor () {
            this.displayObjects = []
        }

        // Добавлят изображения
        add ( displayObjects ) {
            // Добавляeм в очереде eсли нет включон етого масив
            // то добавляем в самъй канец списка
            if ( !this.displayObjects.includes(displayObjects)) {
                this.displayObjects.push(displayObjects)
            }
        }
        // Удалять изображения
        remove () {}

        draw (canvas, context) {
            // Пройдюмся по всей дочернъй елементъй и възъйвает у них етой 
            // функцию
            for( const displayObjects of this.displayObjects ){
                displayObjects.draw(canvas, context )
            }
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Container = Container 
})();