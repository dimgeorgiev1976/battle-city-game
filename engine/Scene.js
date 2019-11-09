; (function () {
    'use strict'

    class Scene extends GameEngine.Container {
        // Передаюм обект аrgs в конструктор 
        constructor (args = {}) {
            // Scene ето сontainer
            super ()
            //Будет или не будет стартоват автоматически
            this.autoStart = args.autoStart || false
            this.name = args.name || ''
            this.status = 'waiting'
            // Назъйваем все колекций дочернъй елементъй stage
            this.stage = this.displayObjects
            this.game = null

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

            if(args.beforeDestroy) {
                this.beforeDestroy = args.beforeDestroy.bind(this) 
            }

        }
        // Свой методъй 
        loading () {} 
        init () {}
        update () {}
        // Утдаляем все что есть в this сценъй
        beforeDestroy () {}
    }



    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Scene = Scene 

})();