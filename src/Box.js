import GameObject from "./GameObject";

export default class Box extends GameObject {
    constructor(game, x, y, width, height) {
      super(x, y, width, height)
      this.game = game
      this.color = "green"
    }
}