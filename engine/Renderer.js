; (function () {
    'use strict'

    class Renderer {
        constructor (args = {}) {
            // Coздаем виртуальнъй Dom елемент canvas
            this.canvas = document.createElement ('canvas')
            this.context = this.canvas.getContext('2d')
            
            // Запоменаем цвет заливке
            this.background = args.background || 'black'
            this.canvas.width = args.width || 50
            this.canvas.height = args.height || 50
        }
        //  //  функция для возврощение все наший oбектъй Containers
        // get displayObjects () {
        //    
        //     // Возврощение резултат въйполнения етой функция каторой описанее
        //     // внутре ето гетера
        //         return _getDisplayObjects (this.stage)
        //         function _getDisplayObject ( container, result = [] ) {
        //             // Прибегаемся по всем елементом контейнера
        //             for (const displayObject of container.displayObjects) {
        //                 // Eсли является Container
        //                 if (displayObject instanceof GameEngine.Container ) {
        //                     // то мъй въйзъйваем тоже самая функция для ногово контейнера
        //                     _getDisplayObjects ( displayObject, result )
        //                 }

        //                 else {
        //                     result.push( displayObject)
        //                 }
        //             }
        //             return result 
        //         }
        //     }

        // render () {
        //     // Функция каторая въйзеваться для инициализация 
        //     // начало отрисовка какого-то изображение
        //     this.stage.draw(this.canvas , this.context)
        // }
     
        // Функция для очистка canvas
        clear () {
            this.context.fillStyle = this.background
            this.context.beginPath()
            this.context.rect( 0, 0, this.canvas.width, this.canvas.height )
            this.context.fill()
        }
    }




    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Renderer = Renderer

})();