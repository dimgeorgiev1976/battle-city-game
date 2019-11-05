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
            this.update = args.update || (() => {})
            //
            this.stage = new GameEngine.Container()
            // Функция каторая постоянно въйзеваться что бъй обновлят
            // изображение на нашем canvas
            requestAnimationFrame(timestamp => this.tick(timestamp))
        }
        // функция для возврощение все наший oбектъй Containers
        get displayObject () {
            // Возврощение резултат въйполнения етой функция каторой описанее
            // внутре ето гетера
                return _getDisplayObject (this.stage)
                function _getDisplayObject ( container, result = [] ) {
                    // Прибегаемся по всем елементом контейнера
                    for (const displayObject of container.displayObjects) {
                        // Eсли является Container
                        if (displayObject instanceof GameEngine.Container ) {
                            // то мъй въйзъйваем тоже самая функция для ногово контейнера
                            _getDisplayObject ( displayObject, result )
                        }

                        else {
                            result.push( displayObject)
                        }
                    }
                    return result 
                }
            }

        // Инициируем функция tick
        tick (timestamp) {
            // Въйзаваем функция update
            this.update(timestamp)
            // Въйзаваем функция clear перед каждой ъпдате
            this.clear()

            // Въйзаваем функция действие 
            this.render()


            // Что бъй внов и внов въйзавается функция
            requestAnimationFrame(timestamp => this.tick(timestamp))
        }

        render () {
            // Функция каторая въйзеваться для инициализация 
            // начало отрисовка какого-то изображение
            this.stage.draw(this.canvas , this.context)
        }
     
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