; (function() {

    'use strict'

    // Унаследоваем класс от DisplayObject
    class Sprite extends GameEngine.DisplayObject {
        // Загруженое с клиентами изображение в аргументе
        constructor (textura , args = {}) {
            super(args)

            this.textura = textura

            const frame = args.frame || {}

            // Кусочек изображение каторой нужни отрисовать
            this.frame = {
                x: frame.x || 0,
                y: frame.y || 0,
                width: frame.width || textura.width,
                height: frame.height || textura.height
            }
            // Переопределим параметръй по умолчание для ширина и въйсата
            if ( args.width === undefined ) {
                this.width = this.frame.width
            }

            if ( args.height === undefined ) {
                this.height = this.frame.height
            }
        }

        // Meтод для Oтрисовка sprite
        draw ( canvas, context ) {
            // Сохраняет все состояние холста.
            context.save()
            // Передвигает canvas
            context.translate(this.x , this.y)
            context.rotate (this.rotation)
            context.scale(this.scaleX, this.scaleY)
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
                this.absoluteX - this.x,
                this.absoluteY - this.y,
                this.width ,
                this.height  
                )
                context.beginPath()
                context.fillStyle = 'red'
                context.arc( 0, 0, 5, 0, Math.PI * 2)
                context.fill()


                // Восстанавливает последнее сохраненное состояние холста.
             context.restore ()

        }
    }


    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Sprite = Sprite

})();