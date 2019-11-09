const {Body, Game, Scene , Point, Line, Container } = GameEngine

const mainScene = new Scene({
    name: 'mainScene',
    // Передадем обект состаящий из несколко методъй
    autoStart: true,
    loading (loader) {
        // Обращение к екземпляру етому классу mainScene загрузка ресурсъй 
        loader.addImage('bunny', 'static/bunny.jpeg')
        loader.addJson('persons', 'static/persons.json')
    },

    init () {
        // Инициируем все наши обектъй, sprite, Image 
        const bunnyTexture = this.parent.loader.getImage('bunny')
        
        this.bunny = new Body(bunnyTexture , {
            scale: 0.75 ,
            anchorX: 0.5 ,
            anchorY: 0.5 ,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height / 2,
            debug: true,
            body: {
                x: 0,
                y: 0.5,
                width: 1,
                height: 0.5
            }
        })

       
        // Добавляем bunny в сценнъй 
         this.add( this.bunny)
         // Отрисовка после базовъй контейнер
        },

    update (timestamp) {
        const { keyboard } = this.parent

        let speedRotation = keyboard.space ? Math.PI / 100 : Math.PI / 200
        // Если нажат клавишу вверх
        if (keyboard.arrowUp) {
            this.bunny.rotation += speedRotation
           
        }
        if (keyboard.arrowDown) {
            this.bunny.rotation -= speedRotation
        }

    }
})



const game = new Game ({
    // Куда нужно установит игру,точка монтирование елемент
    el: document.body,
    width: 500,
    height: 500,
    background: 'green',
    // Передаем набор сценнъй
    scenes: [mainScene]
})