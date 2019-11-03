; (function () {
    'use strict'

    class Renderer {
        constructor (args = {}) {
            // Coздаем виртуальнъй Dom елемент canvas
            this.canvas = document.createElement ('canvas')
            this.context = this.canvas.getContext('2d')

            this.canvas.width = args.width || 50
            this.canvas.height = args.height || 50
            this.update = args.update || (() => {})
            // Функция каторая постоянно въйзеваться что бъй обновлят
            // изображение на нашем canvas
            requestAnimationFrame(timestamp => this.tick(timestamp))
        }
        // Инициируем функция tick
        tick (timestamp) {
            // Въйзаваем функция update
           this.update(timestamp)
            // Что бъй внов и внов въйзавается функция
            requestAnimationFrame(timestamp => this.tick(timestamp))
        }

        // Функция каторая въйзеваться для начало отрисовка какого-то изображение
        draw () {}

    }




    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Renderer = Renderer

})();