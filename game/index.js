
const DEBUG_MOD = true
const { Body, Game, Scene , ArcadePhysics, Util, Sprite } = GameEngine

const mainScene = new Scene({
    name: 'mainScene',
    // Передадем обект состаящий из несколко методъй
    // autoStart: true,

    loading (loader) {
        // Обращение к екземпляру етому классу mainScene загрузка ресурсъй 
        loader.addImage('spriteSheet', 'static/Battle City Sprites.png')
        loader.addJson('atlas', 'static/manAtlas.json')
        loader.addSound('start', 'static/sound/stage_start.ogg')
    },

 
      // Инициируем все наши обектъй, sprite, Image 
      init () {
        
        const startSound = this.parent.loader.getSound('start') 
// console.log(startSound === game.loader.resources.sounds.start)
        startSound.play()
        
        Tank.texture = this.parent.loader.getImage('spriteSheet')
        Tank.atlas = this.parent.loader.getJson('atlas')

        this.arcadePhysics = new ArcadePhysics

        Bullet.texture = this.parent.loader.getImage('spriteSheet')
        Bullet.atlas = this.parent.loader.getJson('atlas')

        
		this.tank1 = new Tank({
			    debug: DEBUG_MODE,
			    x: this.parent.renderer.canvas.width / 2,
			    y: this.parent.renderer.canvas.height / 2 + 100,
		})
			
		this.tank2 = new Tank({
			    debug: DEBUG_MODE,
			    x: this.parent.renderer.canvas.width / 2,
			    y: this.parent.renderer.canvas.height / 2,
		})

        this.add(this.tank1, this.tank2)
        this.arcadePhysics.add(this.tank1, this.tank2)
        // Описъйваем невидимая стена
        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: -10,
            y: -10,
            width: this.parent.renderer.canvas.width + 20,
            height: 10
        }))

        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: -10,
            y: -10,
            width: 10,
            height: this.parent.renderer.canvas.width + 20
        }))
        },
      update () {
        const { keyboard } = this.parent
          this.tank1.movementUpdate(keyboard)


        if (keyboard.space && Util.delay('tank1' + this.tank1.uid, Tank.BULLET_TIMEOUT)) {
            const bullet = new Bullet ({
                debug: DEBUG_MOD ,
                x: this.tank1.x,
                y: this.tank1.y
            })
            // Скажем что ето булет птринадлежит етого танку
            this.tank1.bullets.push(bullet)
            // Запомним что булет является нашего танка
            bullet.tank1 = this.tank1
            if (this.tank1.animaion === 'moveUp') {
                bullet.velocity.y -= Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet', 'up')
            }

            this.add(bullet)
            this.arcadePhysics.add(bullet)
        }
        // Eсли в друг сталкеваеться
          this.arcadePhysics.processing()

          for ( const tank of [this.tank1, this.tank2 ]) {
              // Пробегаемся по все пуля танка
            for ( const bullet of tank.bullets ) {
                if ( bullet.toDestroy ) {
                    bullet.toDestroy ()
                }
            }
        }
    } 


//     init () {
//         Man.texture = this.parent.loader.getImage('man')
//         Man.atlas = this.parent.loader.getJson('manAtlas')

//         this.arcadePhysics = new ArcadePhysics

//         this.man1 = new Man({
//             x: this.parent.renderer.canvas.width / 2 - 100,
//             y: this.parent.renderer.canvas.height / 2,
//         })

//         this.man2 = new Man({
//             x: this.parent.renderer.canvas.width / 2 + 100,
//             y: this.parent.renderer.canvas.height / 2,
//         })
//         // Добавляем man в сценнъй 
//         this.add(this.man1, this.man2)
//          // Отрисовка после базовъй контейнер
//         this.arcadePhysics.add(this.man1, this.man2)
//     },
       
//     update (timestamp) {
//         const { keyboard } = this.parent

//         this.man1.velocity.x = 0 
//         this.man1.velocity.y = 0 

//         this.man2.velocity.x = 0 
//         this.man2.velocity.y = 0 
//         // Если нажат клавишу вверх
//         if (keyboard.arrowLeft) {
//             this.man1.velocity.x = -2

//             if (this.man1.animation !== 'moveLeft') {
//                 this.man1.startAnimation('moveLeft')
//             }
//         }

//             else if (keyboard.arrowDown) {
//                 this.man1.velocity.y = +2

//             if (this.man1.animation !== 'moveDown') {
//                 this.man1.startAnimation('moveDown')
//             }
//         }

//         else if (keyboard.arrowRight) {
//             this.men1.velocity.x = 2
//         }

//         else if (keyboard.arrowUp) {
//             this.men1.velocity.y = -2
//         }

//         else if (this.man1.animation === 'moveDown') {
//             this.man1.startAnimation('stayDown')
//         }

//         this.arcadePhysics.processing()
//     }
})  

    const intro = new Intro ({
        name: 'introScene',
        autoStart: true ,
        // Експортироваем картинка 
        loading (loader) {
            loader.addImage ('intro', 'static/intro.png')
        },

        init () {
            const { loader } = this.parent

            this.image = new Sprite (loader.getImage('intro'), {
                x: 0,
                y: 0,
                width : this.parent.renderer.canvas.width, 
                height : this.parent.renderer.canvas.height, 
            } )
            // Добавим его в сцену
            this.add( this.image )

            this.imageTweenStopper = Util.tween ({
                target: this.image ,
                duration: 3500,
                processer ( target, percent, context) {
                    if (percent  === 0) {
                        context.y = target.y
                    }

                    target.y = context.y * (1 - percent)
                }
            })
        } ,
        update ( timestamp ) {
            const { keyboard } = this.parent

            if (keyboard.space && this.imageTweenStopper) {
                // То мъй установим нашей стопер
                this.imageTweenStopper()
                this.image.y = 0
            }
        } 
    })

    // /home/dimitar/Desktop/Battle-city/static/intro.png

const game = new Game ({
    // Куда нужно установит игру,точка монтирование елемент
    el: document.body,
    width: 500,
    height: 500,
    background: 'grey',
    // Передаем набор сценнъй
    scenes: [  intro , mainScene]
})
