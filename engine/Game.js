; (function () {
    'use strict'

    class Game {
        constructor ( args = {}) {
            // cоздадем canvas с нужнъй нам размеръй
            this.renderer = new GameEngine.Renderer(args)
            // Задайем куда установливат canvas
            if (args.el && args.el.appendChild) {

            }
        }
    }




    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Game = Game 

})();