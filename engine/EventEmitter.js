; (function() {

    'use strict'

    // Генерирует события

    class EventEmitter {
        constructor () {
            this.handlers = {}
        }
        // Каротка форма запис етих двух метода
        on (...args) {
            this.addEventListener(...args)
        }

        off (...args) {
            this.removeEventListener(...args)
        }

        addEventListener (name, handler) {
            // Ето же обект ,если отсутвует
            if (!this.handlers.hasOwnProperty(name)) {
                this.handlers[name] = []
            }
            
            // то мъй его добавим
            this.handlers[name].push(handler)
        }

        removeEventListener (name = null, handler = null) {}

        emit (name, ...args) {
            // Если у нас нет такое события то, мъй ничево не делаем
            if (!this.handlers.hasOwnProperty(name)) {
                return
            }
            // Иначе пробегаемся по все ети хендлера
            for (const handler of this.handlers[name]) {
                // Просто регистритуем их въйзов
                handler(...args)
            }
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.EventEmitter = EventEmitter

})();        
