import GameObject from "./GameObject.js"
import input from "./Input.js"
import Player from "./Player.js"
import Platform from "./Platform.js"

export default class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.input = new input(this)
        this.player = new Player(0, 0, 64, 64, "#ff0000", 0.3, this)
        this.platforms = [
            new Platform(this, this.width - 200, 280, 200, 100),
            new Platform(this, 200, 200, 300, 100),
            new Platform(this, 0, 420, 300, 100),
        ]
        
        function getPlatforms() {
            return this.platforms
        }
    }
    
    update(deltaTime) {
        //if (this.checkCollision(this.player, this.box)) {
        //  this.player.x = this.box.x
        //}

        /*this.platforms.forEach((platform) => {
            if (this.checkPlatformCollision(this.player, platform)) {
                this.player.speedY = 0
                this.player.y = platform.y - this.player.height
                this.player.grounded = true
            } else {
                this.player.grounded = false
            }
        })*/

        this.player.update(deltaTime)
    }

    draw(ctx) {
        this.player.draw(ctx)
        this.platforms.forEach((platform) => platform.draw(ctx))
    }

    checkOverlap(a, b) {
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
    }

    checkPlatformCollision(object, platform) {
        if (
            object.y + object.height >= platform.y &&
            object.y < platform.y &&
            object.x + object.width >= platform.x &&
            object.x <= platform.x + platform.width
        ) {
            if (object.grounded && object.y + object.height > platform.y && object.x > platform.x + platform.width && object.x + object.width < platform.x) {
                object.speedY = 0
                object.y = platform.y - object.height
            }
            return true
        } else {
            if (object.x > platform.x + platform.width || object.x + object.width < platform.x && object.y + object.height == platform.y) {
                return false
            }
            if (object.grounded && object.y + object.height < platform.y) {
            }
            return false
        }
    }
    
}
