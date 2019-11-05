; (function () {
    'use strict'
    // Класс каторой хранит в себе списък все изображения 
    // каторой нужно отресавать
    class Container  extends GameEngine.DisplayObject {
        constructor ( args = {}) {
            super(args )
            this.displayObjects = []

            // Утдаляем ширина и висота
            delete this.width
            delete this.height
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
            // Сохраняет все состояние холста.
            context.save()
            // Передвигает canvas
            context.translate( this.x, this.y)
            context.rotate (this.rotation)
            context.scale(this.scaleX, this.scaleY)

            // Пройдюмся по всей дочернъй елементъй и възъйвает у них етой 
            // функцию
            for( const displayObjects of this.displayObjects ){
                displayObjects.draw(canvas, context )
            }
            // Восстанавливает последнее сохраненное состояние холста.
            context.restore ()

        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Container = Container 
})();