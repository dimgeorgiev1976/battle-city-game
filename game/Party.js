class Party extends GameEngine.Scene {
    constructor (args = {}) {
        super({
            name: 'party',
            ...args
        })
        
        this.enemies = new Set
    }
}