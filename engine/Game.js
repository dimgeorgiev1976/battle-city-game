; (function () {
    'use strict'

    class Game {
        constructor ( args = {}) {
            // Передаем canvas в конструктор Renderer и 
            // он cоздадют canvas с нужнъй нам размеръй
            this.renderer = new GameEngine.Renderer(args)
            this.loader = new GameEngine.Loader()
            this.scenesCollection = new GameEngine.Container()
            this.keyboard = new GameEngine.Keyboard()
                     
            // Проверяем если мъй передали сценнъй
            if (args.scenes ) {
                // Пробегаемся и добавлят все етъй сценнъй в колекцию
                this.addScene(...args.scenes)
            }
            // Проверяем если мъй передали точка монтирование то 
            // мъй добавлят где она должна бъйт
            if (args.el && args.el.appendChild) {
                args.el.appendChild(this.renderer.canvas)
            }
            // Массив все сценнъй у каторъй включон autoStart
            const autoStartedScenes = this.scenes.filter(x => x.autoStart)

            // Пробегаемся по все сценнъй каторъй активнъй на данной момент
            for( const scene of autoStartedScenes) {
                scene.status = 'loading'
                // То мъй для ее запускаем loading 
                // loader зарегестрирует все загружаемъйе в данной сценнъй материаллъй
                scene.loading(this.loader)
            }
            // Запускаем лоадер что бъй загрузит все 
            this.loader.load(() => {
                // После того как загружиться все наший даннъй то мъй eщо раз пробегаемся
                for( const scene of autoStartedScenes) {
                    scene.status = 'init'
                    scene.init()
                }

                // После того как инциализирулис все наший даннъй 
                for( const scene of autoStartedScenes) {
                    scene.status = 'started'
                   
                }
            })
            
            // Функция каторая постоянно въйзеваться что бъй обновлят
            // изображение на нашем canvas
            requestAnimationFrame(timestamp => this.tick(timestamp))
        }

        addScene (...scenes)  {
            this.scenesCollection.add(...scenes)
            // Пробегаемся по все сценнъй
            for (const scene of scenes) {
                // Любая сценнъй силается на game
                scene.parent = this
            }
        }

        get scenes () {
            return this.scenesCollection.displayObjects
        }
        // Инициируем функция tick
        tick (timestamp) {
            const startedScenes = this.scenes.filter( x => x.status === 'started')

            // Пробегаемся по все наший сценнъй 
            for (const scene of startedScenes){
                // Въйзаваем  update метод 
                scene.update(timestamp)
            }

            // Пробегаемся по все наший сценнъй 
            for (const scene of startedScenes){
                // Въйзаваем  update метод 
                scene.tick(timestamp)
            }
            
            // Въйзаваем функция clear перед каждой ъпдате
            this.renderer.clear()
            
            for (const scene of startedScenes){
                // Въйзаваем функция действие для отрисовку
                scene.draw(this.renderer.canvas, this.renderer.context)
            }

            // Что бъй внов и внов въйзавается функция tick
            requestAnimationFrame(timestamp => this.tick(timestamp))
        }

        getScene (name) {
            if (name instanceof GameEngine.Scene) {
                // Если вообще ткая сцена есть и она включена в комплект наши сценъй
                if(this.scenes.includes(name)) {
                    // То мъй ею вернюм
                    return name
                }
            }
            if (typeof name === 'string' ) {
                // Пробежимся по все наший сценнъй
                for (const sceneItem of this.scenes) {
                    if (sceneItem.name  === name ) {
                        return sceneItem
                    }
                }
            }
        }
        startScene (name) {
            const scene = this.getScene(name)
            // Если вдруг сцена не бъйла найдена
            if (!scene) {
                return false
            }
            // Запускаем scene если бъйла найдена
                scene.status = 'loading'
                // То мъй для ее запускаем loading 
                // loader зарегестрирует все загружаемъйе в данной сценнъй материаллъй
                scene.loading(this.loader)
            // Запускаем лоадер что бъй загрузит все 
            this.loader.load(() => {
                // После того как загружиться все наший даннъй то мъй eщо раз пробегаемся
                    scene.status = 'init'
                    scene.init()
                // После того как инциализирулис все наший даннъй 
                    scene.status = 'started'
            })

                return true
        }

        finishScene (name) {
            const scene = this.getScene(name)
            // Если вдруг сцена не бъйла найдена
            if (!scene) {
                return false
            }
            // Увидем над каким екземпляръй проводиться очистка
            scene.status = 'finished'
            this.scenesCollection.remove(scene)
            scene.beforeDestroy ()
            
        }
    }



    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Game = Game 

})();