;(function() {
    'use strict'    
    
    class Loader {
        constructor () {
            // Очеред загрузка
            this.loadOrder = {
                images: [],
                jsons: [],
                sounds: []
            }
            // ресурсъй каторъй уже загрузилис
            this.resources = {
                images: {},
                jsons: {},
                sounds: {},
           }
        }
        // метод добавления имени картинки и путь к ней
        addImage (name, src) {
            this.loadOrder.images.push({ name, src })
        } 

        // Метод добавления json и путь к файлу с сервере на клиента
        addJson (name, address) {
            this.loadOrder.jsons.push({ name, address })
        }  
        // Метод добавления sounds 
        addSound (name, src ) {
            this.loadOrder.sounds.push({ name, src })
        }

        // Метод для въйтаскаем из самого екземпляру класса 
        // тот ресурс каторой мъй запросили

        getImage (name) {
            // Метод для возвращение записъй каторъй уже храняться в resources
            return this.resources.images[name]
        }
        
        getJson (name) {
            // Метод для возвращение записъй каторъй уже храняться в resources
            return this.resources.jsons[name]
        }

        getSound (name) {
            // Метод для возвращение записъй каторъй уже храняться в resources
            return this.resources.sounds[name]
        }

        // Логика загрузке изображения после все json file будут загруженнъй
        load (callback) {
            const promises = []

            // перебираем все изображения в loadOrder
            for ( const imageData of this.loadOrder.images ){

                const  { name, src } = imageData

                const promise = Loader
                    .loadImage(src)
                    // когда изображение будет загружено, записываем его в resources 
                    .then(image => { // подписаваяс на резултату
                        // Добавляю по именем
                        this.resources.images[name] = image
                        // удаляем от необходимости загрузке изображение in loadOrder
                       if (this.loadOrder.images.includes(imageData)) {
                           const index = this
                                .loadOrder.images.indexOf(imageData)
                            this.loadOrder.images.splice(index, 1)
                       }
                    })
                    // Добавляю в масиве promises 
                promises.push(promise)
            }

             // Пройдем ся по все json file
             for ( const jsonData of this.loadOrder.jsons ){
                const  { name, address } = jsonData

                // Скачиваем с сервака
                const promise = Loader
                    .loadJson(address)
                    .then(json => { // подписаваяс на резултату
                        // Регистрируем в jsons в загрузка
                        this.resources.jsons[name] = json

                        // Утдаляю от необходимости загрузке jsons in loadOrder
                       if (this.loadOrder.jsons.includes(jsonData)) {
                           const index = this
                                .loadOrder.jsons.indexOf(jsonData)
                            this.loadOrder.jsons.splice(index, 1)

                       }
                    })
                    // Добавляю в масиве promises 
                promises.push(promise)
            }

          // Пройдем ся по все sounds file
            for ( const soundData of this.loadOrder.sounds ){
               const  { name, src } = soundData

               // Скачиваем с сервака
                const promise = Loader
                    .loadSound(src)
                    .then(audio => { // подписаваяс на резултату
                        // Регистрируем в audio в загрузка
                    this.resources.sounds[name] = audio

                    // Утдаляю от необходимости загрузке sounds in loadOrder
                if (this.loadOrder.sounds.includes(soundData)) {
                    const index = this
                            .loadOrder.sounds.indexOf(soundData)
                        this.loadOrder.sounds.splice(index, 1)
                    }
                })
            // Добавляю в масиве promises 
            promises.push(promise)
    }
            // Ждем когда выполняться все промисы запускаем колбек функцию
            Promise.all(promises).then(callback)
        }
 

        // Метод загружаем даннъй из цикле
        // Этот метод виден только самому классу, но не его экземплярам
        static loadImage (src) {
            return new Promise((resolve, reject ) => {
                try { 
                    const image = new Image
                    image.onload = () => resolve (image)
                    image.src = src
                }
                catch (err) {
                    reject(err)
                }
            })
        } 
        // Метод по адресу должно загрузит json file
        static loadJson (address) {
            return new Promise (( resolve, reject ) => {
                // Способ загрузит данни с сервера на клиента
                fetch (address)
                    .then(result => result.json()) // интерпретируем резултат как json 
                    .then(result => resolve(result))   // передаю в resolve
                    .catch( err => reject(err))        // подпис на ошибку промиса
            })
        }
        static loadSound (src) {
            return new Promise ((resolve, reject ) => {
                try {
                    const audio = new Audio 
                    audio.addEventListener('canplaythrough', () => 
                        waiter ('canplaythrough'))
                    audio.addEventListener('ended', () => 
                        waiter ('ended'))
                    audio.src = src

                    function waiter () {

                    }
                }
                catch (error) {
                    reject (error)
                }
            })
        }
    }
    
        window.GameEngine = window.GameEngine || {}
        window.GameEngine.Loader = Loader

})();