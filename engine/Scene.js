; (function () {
    'use strict'

    class Scene extends GameEngine.Container {
        // Передаюм обект аrgs в конструктор 
        constructor (args = {}) {
            // Scene ето сontainer
            super ()
            //Будет или не будет стартоват автоматически
            this.autoStart = args.autoStart || false
            // Назъйваем все колекций дочернъй елементъй stage
            this.stage = this.displayObjects

            if(args.loading) {
                // Создаем копие етой функцию но заранее привязъйваем контекст к 
                // екземпляру етому классу -> mainScene
                this.loading = args.loading.bind(this) 
            }

            if(args.init) {
                this.init = args.init.bind(this) 
            }

            if(args.update) {
                this.update = args.update.bind(this) 
            }

        }
        // Свой методъй 
        loading () {} 
        init () {}
        update () {}

    }



    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Scene = Scene 

})();