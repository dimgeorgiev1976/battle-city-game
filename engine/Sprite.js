; (function() {

    'use strict'

    class Sprite {
        // Загруженое с клиентами изображение в аргументе
        constructor (textura) {
            this.textura = textura
            // Кусочек изображение каторой нужни отрисовать
            this.frame = {
                x: 0,
                y: 0,
                width: textura.width,
                height: textura.height
            }
            // Oтрисовка sprite
            this.x = 0
            this.y = 0
            this.width = this.frame.width
            this.height = this.frame.height
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
                this.x ,
                this.y ,
                this.width ,
                this.height 
            )
        }
    }






    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Sprite = Sprite

})();