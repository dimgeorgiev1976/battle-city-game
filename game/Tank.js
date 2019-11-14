class Tank extends GameEngine.Body {
    constructor (originalArgs = {}) {
        const args = Object.assign({
            scale: 4,
            anchorX: 0.5,
            anchorY: 0.5
        }, originalArgs)

        super(Tank.texture, args)

        this.bullets = []

        this.setFramesCollection(Tank.atlas.frames)
        this.setAnimationsCollection(Tank.atlas.actions)
        this.startAnimation('moveUp')

        this.on('collision', (a, b) => {
            // Проверяем если ето пуля && ето мая пуля
            if (b instanceof Bullet) {
                // Если ето наша пуля
                if (this.bullets.includes(b)) {
                    // To ничего не делаем
                    return
                }
                // Иначе самоуничтожаемся , стал невидим
                else {
                    this.visible = false
                    Util.getScene(this).arcadePhysics.remove(this)
                }
            }

            a.velocity.y = 0
            a.velocity.y = 0
        })
    }

    movementUpdate (keyboard) {
        this.velocity.x = 0
        this.velocity.y = 0

        if (keyboard.arrowLeft) {
            this.velocity.x = -Tank.NORMAL_SPEED
        }
        
        else if (keyboard.arrowRight) {
            this.velocity.x = Tank.NORMAL_SPEED            
        }
        
        else if (keyboard.arrowDown) {
            this.velocity.y = Tank.NORMAL_SPEED
        }
        
        else if (keyboard.arrowUp) {
            this.velocity.y = -Tank.NORMAL_SPEED
        }

        if (keyboard.space && Util.delay('tank' + this.uid, Tank.BULLET_TIMEOUT)) {
            const bullet = new Bullet ({
                debug: DEBUG_MOD ,
                x: this.x,
                y: this.y
            })
            // Скажем что ето булет птринадлежит етого танку
            this.bullets.push(bullet)
            // Запомним что булет является нашего танка
            bullet.tank = this

            if (this.animaion === 'moveUp') {
                bullet.velocity.y -= Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet', 'up')
            }
            this.parent.add(bullet)
        }
    }
}

Tank.texture = null
Tank.atlas = null

Tank.NORMAL_SPEED = 2
Tank.BULLET_TIMEOUT = 1000