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