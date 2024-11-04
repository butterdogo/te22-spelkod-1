export default class GameObject {
    constructor(game, x, y, width, height, color, maxSpeed) {
        this.game = game
        this.x = x
        this.y = y
        this.width = width * 40
        this.height = height * 5
        this.color = color
        this.currentSpeed = 0
        this.maxSpeed = maxSpeed
        this.direction = 1
    }

    update(deltaTime) {
        this.x = this.x + this.maxSpeed / 1000 * deltaTime * this.direction
        if (this.x > this.game.width + 100 - this.width) this.direction = -1
        if (this.x < 0-100) this.direction = 1
    }

    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}