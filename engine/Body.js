; (function() {

    'use strict'

    // Унаследоваем класс от DisplayObject
    class Body extends GameEngine.Sprite {
        // Загруженое с клиентами изображение в аргументе
        constructor (texture , args = {}) {
            super(texture, args)
            const body = args.body || {}

            this.debug = args.debug || false
            // Статически тела не прооверяеться на сталкновение
            this.static = args.static || false

            // Создаем Обект 
            this.body = {}
            this.body.x = body.x || 0
            this.body.y = body.y || 0
            this.body.width = body.width || 1
            this.body.height = body.height || 1
        }
     
            // Получаем x, y , width, width относително нашего тело
            get bodyRect () {
                return {
                    x: this.absoluteX + this.width * this.scaleX * this.body.x,
                    y: this.absoluteY + this.height * this.scaleY * this.body.y,
                    width: this.width * this.scaleX * this.body.width,
                    height: this.height * this.scaleY * this.body.height
                }
            }
            // Boврошает массив все вершинъй
            get tops () {
                const { x, y, width, height } = this.bodyRect
    
                return [
                    [x, y],
                    [x + width, y],
                    [x, y + height],
                    [x + width, y + height]
                ]
            }

            // Функция определяет если едно тело находится внутри другое тело
            isInside (x, y) {
                // Получаем Координатъй и определяем находиться ли в нутрее
                return GameEngine.Util.isInside({ x, y }, this.bodyRect)
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

            // context.scale(this.scaleX, this.scaleY)
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
                this.width * this.scaleX,
                this.height * this.scaleY
            )
               

            if (this.debug) {
                const { x, y, width, height } = this.bodyRect

                context.fillStyle = 'rgba(255, 0, 0, 0.2)'
                context.beginPath()
                context.rect(x - this.x, y - this.y, width, height)
                context.fill()

                context.fillStyle = 'rgb(0, 255, 0)'
                context.beginPath()
                context.arc(0, 0, 3, 0, Math.PI * 2)
                context.fill()
            }

            // Восстанавливает последнее сохраненное состояние холста.
            context.restore ()
            }
        }


    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Body = Body

})();