;(function() {
    'use strict'    
    
    class Loader {
        constructor () {
            // Очеред загрузка
            this.loadOrder = {
                images: [],
                jsons: []
            }
            // ресурсъй каторъй уже загрузилис
            this.resources = {
                images: [],
                jsons: []

           }
        }

        addImage (name, src) {
            this.loadOrder.images.push({ name, src })
        } 

        // Загрузке json с сервере на клиента
        addJson (name, address) {
            this.loadOrder.jsons.push({ name, address })
        }


        // Логика загрузке изображения после все json file будут загруженнъй
        load (callback) {
            const promises = []

            // Пройдем ся по все изображения
            for ( const imageData of this.loadOrder.images ){

                const  { name, src } = imageData

                const promise = Loader
                    .loadImage(src)
                    .then(image => { // подписаваяс на резултату
                        // Добавляю по именем
                        this.resources.images[name] = image
                        // Утдаляю от необходимости загрузке изображение in loadOrder
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
                    .then(image => { // подписаваяс на резултату
                        // Регистрируем в jsons в загрузка
                        this.resources.jsons[name] = image

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
            // ждет когда въйполниться все обещания
            Promise.all(promises).then(callback)
        }
 

        // Метод загружаем даннъй из цикле
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
        // По адресу должно загрузит 
        static loadJson (address) {
            return new Promise (( resolve, reject ) => {
                // Способ загрузит данни с сервера на клиента
                fetch (address)
                    .then(result => result.json) // интерпретируем резултат как json 
                    .then(result => resolve(result))   // передаю в resolve
                    .catch( err => reject(err))        // подпис на ошибку промиса
            })
        }
    }
    
        window.GameEngine = window.GameEngine || {}
        window.GameEngine.Loader = Loader



})();