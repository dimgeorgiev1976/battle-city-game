 ; (function() {

    'use strict'

    // Toт дисплей каторого нужно отобразит
    class DisplayObject {
        constructor ( args = {}) {
        // Oтрисовка cущност objecta координатъй sprite
            this.x = args.x || 0
            this.y = args.y || 0

            this.width = args.width || 0
            this.height = args.height || 0

            this.rotation = args.rotation || 0
             // Kakая част от изображение, нужно взят в % что бъй появлилас
            //  настаящий център изображение
            this.anchorX = args.x || 0 
            this.anchorY = args.y || 0 
            // въйчисляемъй масщаб 
            this.scaleX = args.scaleX || 1
            this.scaleY = args.scaleY || 1
            // Досчутатся до родителей по очеред
            this.parent = null 
            // Нужно ли отрисоват обект либо нет !
            this.visible = true 
            // Если присуствует scale
            if ( args.scale !== undefined  ) {
                this.setScale(args.scale)
            }
        }

        // Функция для задание значение sprite на лету
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
            
        // Устновляем его значенуе в DisplayObject
        setScale (scale) {
            this.scaleX = scale
            this.scaleY = scale
        }
        // Динамически связат и утдалят из аднаго контейнера в другое
        setParent (parent) {
            // Если в друг уже есть parent
            if (this.parent){
                // родителски елемент попросим нас удалит
                this.parent.remove(this)
            }

            if (parent) {
                //  Новъй родителски елемент попросим нас добавит
                parent.add(this )
                this.parent = parent
            }
        }
        // Тип филтур каторой срабатуйвает если обект толко будет виден
        draw (callback) {
            if (this.visible ) {
                callback ()
            }
        }
    }


    window.GameEngine = window.GameEngine || {}
    window.GameEngine.DisplayObject = DisplayObject 

 }) ();