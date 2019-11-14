class Bullet extends GameEngine.Body {
    constructor (originalArgs = {}) {
        const args = Object.assign({
            anchorX: 0.5,
            anchorY: 0.5
        }, originalArgs)

        super(Bullet.texture, args)
        // По умолчание танк не определен 
        this.tank = null
        this.toDestroy = false

        this.setFramesCollection(Bullet.atlas.frames)
        this.setAnimationsCollection(Bullet.atlas.actions)

        this.on('collision', (a, b) => {
            // Если пуля с чего-то сталкнулас
            if (b === this.tank) {
                // To ничего не делаем
                return
            }
            // Если пуля сталкевается с чего то он уничтожаеться
            this.toDestroy = true
        })
    }

    destroy () {
        // Утдалим ето елемент из все пуля
        Util.removeElements(this.tank.bullets, this)
     
        // Утдалим ето танк
        delete this.tank

        const scene = Util.getScene(this)
        scene.remove(this)
        scene.arcadePhysics.remove(this)
    }
}




Bullet.texture = null
Bullet.atlas = null

Bullet.NORMAL_SPEED = 5