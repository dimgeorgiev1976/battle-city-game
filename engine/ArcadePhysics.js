; (function () {
    'use strict'

    // Что бъй понят сталкивается елементъй или нет!
    class ArcadePhysics {
        constructor () {
            // Колекия типа масива не может бъйт единакъв елемента
            this.objects = new Set
        }

       
        add (...objects) {
            for (const object of objects) {
                this.objects.add(object)
            }
        }

        remove (...objects) {
            for (const object of objects) {
                this.objects.delete(object)
            }
        }

        processing () {
            // Преврашаем колекцию Set в масив
            const objects = Array.from(this.objects)
            // Перебираем все възможнъй пара у аднаво обекта все его вершинъй
            // и скорост по оси х и у
            for (let i = 0; i < objects.length - 1; i++) {
                const a = objects[i]
                const bodyA = a.bodyRect
                const topsA = a.tops
                const vxA = a.velocity.x
                const vyA = a.velocity.y
                
                for (let j = i + 1; j < objects.length; j++) {
                    const b = objects[j]
                    const bodyB = b.bodyRect
                    const topsB = b.tops
                    const vxB = b.velocity.x
                    const vyB = b.velocity.y
                    // Проверяем входит ли една точку в другую после 
                    // перевежение обекта
                    if (a.static && b.static) {
                        continue
                    }

                    let crossing = false
                    // Пробежимся по все топамА и топамВ
                    for (const topA of topsA) {
                        // Если вдруг ето точка внутре
                        crossing = GameEngine.Util.isInside(
                            {  //  Kooрдинатъй точка вершинъй после перемешение
                                x: topA[0] + vxA,
                                y: topA[1] + vyA
                            },
                            {  // Kooрдинатъй прямоугольник
                                x: bodyB.x + vxB,
                                y: bodyB.y + vyB,
                                width: bodyB.width,
                                height: bodyB.height
                            }
                        )

                        if (crossing) {
                            break
                        }
                    }
                    // Если вдруг флаг еще false то тоже самое относительно вершина В
                    if (crossing === false) {
                        for (const topB of topsB) {
                            crossing = GameEngine.Util.isInside(
                                {
                                    x: topB[0] + vxB,
                                    y: topB[1] + vyB
                                },
                                {
                                    x: bodyA.x + vxA,
                                    y: bodyA.y + vyA,
                                    width: bodyA.width,
                                    height: bodyA.height
                                }
                            )
    
                            if (crossing) {
                                break
                            }
                        }
                    }
                    // если crossing будет true
                    if (crossing) {
                        // console.log(a, b)
                        a.emit('collision', a, b)
                        b.emit('collision', b, a)
                    }
                }
            }
        }
    }    

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.ArcadePhysics = ArcadePhysics

})();
 


