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

        // Добавлят изображения для масивъй
        add (...displayObjects ) {
           for (const displayObject of displayObjects){
               // Проверка присуствет ли в нашей контейнере
               // Добавляeм в очереде eсли нет включон етого масив
               // то добавляем в самъй канец списка 
               if ( !this.displayObjects.includes(displayObjects)) {
                   this.displayObjects.push(displayObjects)
                   displayObjects.setParent(this)
               }
           }
        }
        // Удалять изображения
        remove (...displayObject) {
            for (const displayObject of this.displayObjects) {
                if (this.displayObjects.includes(displayObject)) {
                    const index = this.displayObjects.indexOf(displayObject)
                    this.displayObjects.splice(index, 1)
                    displayObjects.setParent(null)
                }
            }
        }

        draw (canvas, context) {
            super.draw (() => {
                // Сохраняет все состояние холста.
                context.save()
                // Передвигает canvas
                context.translate( this.x, this.y)
                // Напротив чесовое стрелки
                context.rotate (-this.rotation)
                context.scale(this.scaleX, this.scaleY)
    
                // Пройдюмся по всей дочернъй елементъй и възъйвает у них етой 
                // функцию
                for( const displayObject of this.displayObjects ){
                    displayObject.draw(canvas, context )
                }
                // Восстанавливает последнее сохраненное состояние холста.
                context.restore ()
            })
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Container = Container 
})();