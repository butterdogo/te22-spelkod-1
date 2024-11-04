import GameObject from "./GameObject.js"

export default class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.gameObjects = [
            new GameObject(this, 0, 100, 20, 20, '#000', 100, 1),
            new GameObject(this, 0, 200, 20, 20, '#f00', 200, 1),
            new GameObject(this, 834, 300, 20, 20, '#ff0', 300, -1),
        ]
    }

    update(deltaTime) {
        this.gameObjects.forEach(gameObject => {
            gameObject.update(deltaTime)
        })
    }

    draw(ctx) {
        this.gameObjects.forEach(gameObject => {
            gameObject.draw(ctx)
        })
    }
}