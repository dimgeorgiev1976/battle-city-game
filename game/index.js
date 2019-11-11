const { Body, Game, Scene , Container } = GameEngine

const mainScene = new Scene({
    name: 'mainScene',
    // Передадем обект состаящий из несколко методъй
    autoStart: true,
    loading (loader) {
        // Обращение к екземпляру етому классу mainScene загрузка ресурсъй 
        loader.addImage('man', 'static/man.png')
        loader.addJson('manAtlas', 'static/manAtlas.json')
    },

    init () {
        // Инициируем все наши обектъй, sprite, Image 
        const manTexture = this.parent.loader.getImage('man')

        const manAtlas = this.parent.loader.getJson('manAtlas')

        console.log(this.parent.loader.getJson('manAtlas'))
        this.man = new Body(manTexture , {
            atlas: manAtlas ,
            frameKeys: [],
            anchorX: 0.5 ,
            anchorY: 0.5 ,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height / 2,
            // width: this.parent.renderer.canvas.width,
			// height: this.parent.renderer.canvas.height,
            // debug: true,
            body: {
                x: 0,
                y: 0.5,
                width: 1,
                height: 0.5
            }
        })

       
        // Добавляем man в сценнъй 
         this.add( this.man)
         // Отрисовка после базовъй контейнер
        },

    update (timestamp) {
        const { keyboard } = this.parent

        this.man.velocity.x = 0 
        this.man.velocity.y = 0 
        // Если нажат клавишу вверх
        if (keyboard.arrowUp) {
            this.man.velocity.y = -5
        }

        if (keyboard.arrowDown) {
            this.man.velocity.y = +5
        }
    }
})

const game = new Game ({
    // Куда нужно установит игру,точка монтирование елемент
    el: document.body,
    width: 500,
    height: 500,
    background: 'white',
    // Передаем набор сценнъй
    scenes: [mainScene]
})