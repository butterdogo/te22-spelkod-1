export default class Platform {
    constructor(game, x, y, width, height) {
      this.game = game
      this.width = width
      this.height = height
      this.x = x
      this.y = y
    }
  
    update() {}
  
    draw(context) {
      context.fillStyle = '#795548'
      context.fillRect(this.x, this.y, this.width, this.height)
  
      if (this.game.debug) {
        context.fillStyle = 'black'
        context.strokeRect(this.x, this.y, this.width, this.height)
        context.font = '12px Arial'
        context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
        context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
      }
    }
  }