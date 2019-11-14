const { Body, Game, Scene , ArcadePhysics} = GameEngine

const mainScene = new Scene({
    name: 'mainScene',
    // Передадем обект состаящий из несколко методъй
    autoStart: true,
    loading (loader) {
        // Обращение к екземпляру етому классу mainScene загрузка ресурсъй 
        loader.addImage('man', 'static/man.png')
        loader.addJson('manAtlas', 'static/manAtlas.json')
    },


        // Инициируем все наши обектъй, sprite, Image 
    init () {
        Man.texture = this.parent.loader.getImage('man')
        Man.atlas = this.parent.loader.getJson('manAtlas')

        this.arcadePhysics = new ArcadePhysics

        this.man1 = new Man({
            x: this.parent.renderer.canvas.width / 2 - 100,
            y: this.parent.renderer.canvas.height / 2,
        })

        this.man2 = new Man({
            x: this.parent.renderer.canvas.width / 2 + 100,
            y: this.parent.renderer.canvas.height / 2,
        })
        // Добавляем man в сценнъй 
        this.add(this.man1, this.man2)
         // Отрисовка после базовъй контейнер
        this.arcadePhysics.add(this.man1, this.man2)
    },
       
    update (timestamp) {
        const { keyboard } = this.parent

        this.man.velocity.x = 0 
        this.man.velocity.y = 0 
        // Если нажат клавишу вверх
        if (keyboard.arrowLeft) {
            this.man.velocity.x = -2

            if (this.man.animation !== 'moveLeft') {
                this.man.startAnimation('moveLeft')
            }
        }

            else if (keyboard.arrowDown) {
                this.man.velocity.y = +2

            if (this.man.animation !== 'moveDown') {
                this.man.startAnimation('moveDown')
            }
        }

        else if (this.man.animation === 'moveDown') {
            this.man.startAnimation('stayDown')
        }
    }
})

const game = new Game ({
    // Куда нужно установит игру,точка монтирование елемент
    el: document.body,
    width: 500,
    height: 500,
    background: 'grey',
    // Передаем набор сценнъй
    scenes: [ mainScene]
})
