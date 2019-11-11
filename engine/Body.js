; (function() {

    'use strict'

    // Унаследоваем класс от DisplayObject
    class Body extends GameEngine.Sprite {
        // Загруженое с клиентами изображение в аргументе
        constructor (texture , args = {}) {
            super(texture, args)
            const body = args.body || {}
            this.debug = args.debug || false
            // Создаем Обект 
            this.body = {}
            this.body.x = body.x || 0
            this.body.y = body.y || 0
            this.body.width = body.width || 1
            this.body.height = body.height || 1
        }
        draw (canvas, context ) {
            // Если не виден
            if ( !this.visible ) {
                return
            }

            // Сохраняет все состояние холста.
            context.save()
            // Передвигает canvas
            context.translate(this.x , this.y)
            // Напротив чесовое стрелки
            context.rotate (-this.rotation)

            context.scale(this.scaleX, this.scaleY)

            context.drawImage(
                // Передаюм ту текстуру каторой нужно отрисоват
                this.texture ,
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
               

                if ( this.debug ) {
                    context.fiLLStyle = 'rgba (255, 0, 0, 0.3 )'
                    context.beginPath()
                    context.rect(
                    // Координатъй участък где нужно отабразит на canvase
                    // верхние, левъй угъл
                    this.absoluteX - this.x + this.body.x * this.width,
                    this.absoluteY - this.y + this.body.y * this.height,
                    this.width * this.body.width ,
                    this.height * this.body.height  
                    )
                    context.fill()
                }

            // Восстанавливает последнее сохраненное состояние холста.
            context.restore ()
            }
        }


    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Body = Body

})();