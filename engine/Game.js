; (function () {
    'use strict'

    class Game {
        constructor ( args = {}) {
            // Передаем canvas в конструктор Renderer и 
            // он cоздадют canvas с нужнъй нам размеръй
            this.renderer = new GameEngine.Renderer(args)
            this.loader = new GameEngine.Loader()
            this.scenesCollection = new GameEngine.Container()
            // Задайем куда установит canvas
           
            // Проверяем если мъй передали сценнъй
            if (args.csenes ) {
                // Пробегаемся и добавлят все етъй сценнъй
                this.scenesCollection.add(...args.scenes)
            }

            if (args.el && args.el.appendChild) {
                args.el.appendChild(this.renderer.canvas)
            }
            // Пробегаемся по все сценнъй каторъй активнъй на данной момент
            for( const scene of this.scenes) {
                if (scene.autoStart ) {
                    // То мъй ее запускаем
                    scene.loading(this.loader)
                }
            }
        }

        get scenes () {
            return this.scenesCollection.displayObjects
        }
    }



    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Game = Game 

})();