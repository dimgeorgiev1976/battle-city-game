; (function() {

    'use strict'

    class Sprite {
        // Загруженое с клиентами изображение в аргументе
        constructor (textura , args = {}) {
            this.textura = textura

            const frame = args.frame || {}

            // Кусочек изображение каторой нужни отрисовать
            this.frame = {
                x: frame.x || 0,
                y: frame.y || 0,
                width: frame.width || textura.width,
                height: frame.height || textura.height
            }
            // Oтрисовка sprite
            this.x = args.x || 0 ,
            this.y = args.y || 0 ,
            // Kakая част от изображение, нужно взят в % что бъй появлилас
            //  настаящий център изображение
            this.anchorX = args.x || 0 ,
            this.anchorY = args.y || 0 ,
            this.width = args.width || this.frame.width
            this.height = args.height || this.frame.height

            if ( args.scale !== undefined  ) {
                this.setScale(args.scale)
            }
        }

        setScale (value) {
            this.scaleX = value
            this.scaleY = value
        }

        get absoluteX () {
        // въйчислит где настаящий Х
            return this.x - this.anchorX * this.width
        }
        // Создаем координатъй на верхний левий угла
        set absoluteX (value) {
            this.x = value + this.anchorX * this.width
            return  value
        }
        // въйчислит где настаящий Y
        get absoluteY () {
            return this.y - this.anchorY * this.height
        }
        
        // Создаем координатъй на верхний левий угла
        set absoluteY (value) {
            this.y = value + this.anchorY * this.height
            return value

        }
        // Функция для запрашевание и получение
        get scaleX () {
            // Въйзъйваться функция и возврашаться отншение
            return this.width / this.frame.width 
        }
        // Функция для задание значение sprite на лету
        set scaleX (value) {
            this.width = this.frame.width * value
            return value
        }

        get scaleY () {
            return this.height / this.frame.height
        }

        set scaleY (value) {
            this.height = this.frame.height * value
            return value
        }

        // Meтод для Oтрисовка sprite
        draw ( canvas, context ) {
            context.drawImage(
                // Передаюм ту текстуру каторой нужно отрисоват
                this.textura ,
                // Координатъй участък самаго изображение каторой нужно отрисоват
                this.frame.x ,
                this.frame.y ,
                this.frame.width ,
                this.frame.height ,

                // Координатъй участък где нужно отабразит на canvase
                // верхние, левъй угъл
                this.absoluteX ,
                this.absoluteY ,
                this.width ,
                this.height 
            )
        }
    }


    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Sprite = Sprite

})();