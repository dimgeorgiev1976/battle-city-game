; (function () {
    'use strict'


    const delayColection = {}
    // Масив uids
    const uids = []
    const Util = {}
        
    
        Util.delay = function delay ( name, timeoff = 0) {
            // Если отсуствует delayColection[name]
            // въйзъйваем первъй раз
            if (!delayColection[name] ) {
                 // Запишем
                delayColection[name] = Date.now()
                return true
            }
            // Если ещо раз въйзъйваем delayColection[name]
            if (delayColection[name].lastMoment + timeoff > Date.now() ) {
                return false
            }
            // Иначе
            delayColection[name] = Date.now()
            delayColection.timeoff = timeoff
            return true
        }
        // Uid уникальнъй Id каторъй присвайваеться к обекту
        Util.generateUid = function generateUid ( size = 10) {
            // Создоют какой-то случайну строчку
            let uid = getRandomString()
            // Если такая же строчка бъйла создана ране, он просто ее пресаздают
            // до тех пор пока не создат новая строчка
            while (uids.includes(uid)) {
                uid = getRandomString()
            }

            return uid
        }
        // Функция каторая возвращает true если в друг точка поинта находиться
        // внутртее ректангле
        Util.isInside = function isInside (point, rect) {
            return rect.x < point.x && point.x < rect.x + rect.width
                && rect.y < point.y && point.y < rect.y + rect.height
        }

        Util.removeElements = function removeElements (array, ...elements) {
            for (const element of array) {
                if (array.includes(element)) {
                    const index = array.indexOf(element)
                    array.splice(index, 1)
                }
            }
        }

        Util.getScene = function getScene (obj) {
            // Если обелт отсуствует или является екземпляр класс сцена
            if (!obj || obj instanceof GameEngine.Scene) {
         
                // То значит возвращает конктретно ето елемент
                return obj
            }
    
            return Util.getScene(obj.parent)
        }
    
        Util.tween = function tween ( params) {
            // По умолчание должно всегда присуствует
            let { target , duration , processer } = params 

            if  (!target) {
                throw new Error ('tween without target object!')
            }
            let createAt = Date.now()
            let context = {}
            let stopped = false

            let tweenFunction = () => {
                // Сколко прошло времене с самаго начала и берем мин между 100 % и то-же времене
                const percent = Math.min ( (Date.now() - createAt) / duration, 1)
                processer (target, percent, context ) 
                // Продолжаться до теж пор пока 
                if (percent >= 1 ) {
                    stopped = true
                    // Очистим context ,target , и processer
                    context = null
                    target = null
                    processer = null
                    tweenFunction = null 

                    clearInterval (intervalFlag)
                }
            }

            // Въйзъйваем tweenFunction один раз сразу
            tweenFunction()

            // Въйзъйваем setInterval
            const intervalFlag = setInterval (tweenFunction)

            return () => {
                if ( stopped) {
                    return
                }
                stopped = true
                // Очистим context ,target , и processer
                context = null
                target = null
                processer = null
                tweenFunction = null 
                clearInterval(intervalFlag) 
            }
        }


    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Util = Util

    const alphabet = 'qwerrtyadsgdfhjklzxcvbnmqwertyuiop1234567890'
    // Спомагателная функция возвращаяща случайнъй символ
    function getRandomLetter () {
        return alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    // Спомагателная функция возвращаяща страку и случайнъй символ с размера 10
    function getRandomString ( size = 10) {
        let str = ''
         
        while (str.length < size ) {
            str += getRandomLetter ()
        }
        return str

    }

})();