; (function () {
    'use strict'

    class Point extends GameEngine.DisplayObject {  
        constructor ( args = {}) {
            super(args)

            this.color = args.color || 'red'
        }
        draw () {
            super.draw ( () => {
                context.fillStyle = this.color
                context.beginPath()
                context.arc(this.x, this.y, 5, 0, Math.PI * 2)
                context.fill()
            })
        } 
    }



    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Point = Point 

})();