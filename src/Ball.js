import GameObject from "./GameObject"

export default class Ball extends GameObject {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color)
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.width, 0, 2 * Math.P1)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}