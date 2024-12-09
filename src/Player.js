import GameObject from "./GameObject";
import Platform from "./Platform";
import Game from "./Game.js"

export default class Player extends GameObject {
    constructor(x, y, width, height, color, speed, game) {
        super(x, y, width, height, color)
        this.game = game
        
        this.image = new Image()
        this.image.src = "/src/assets/foxy.png"
        
        this.frameWidth = 33
        this.frameHeight = 32
        this.frameX = 0
        this.frameY = 0
        this.flip = false
        this.maxFrames = 4
        this.timer = 0
        this.fps = 20
        
        this.speedX = 0
        this.maxSpeedX = speed
        this.speedY = 0
        this.maxSpeedY = speed
        this.height = height
        this.width = width

        this.dashSpeed = 30
        this.dashCount = 0
        this.dashDelay = true
        this.dashDirection = 0

        console.log(Game)
        //const platforms = getPlatforms()
    }
    
    update(deltaTime) {
        // console.log(this.grounded)
        // console.log(this.x, this.y)
        // console.log(this.speedX, this.speedY)

        this.oldX = this.x
        this.oldY = this.y

        if (this.game.input.keys.has("ArrowLeft")) {
            this.speedX -= this.maxSpeedX
            this.flip = true
        }

        if (this.game.input.keys.has("ArrowRight")) {
            this.speedX += this.maxSpeedX
            this.flip = false
        }

        if (this.game.input.keys.has("ArrowRight") || this.game.input.keys.has("ArrowLeft")) {
            this.frameY = 1
            this.maxFrames = 6
            this.fps = Math.abs(this.speedX) * 5
        }

        //dash
        if (this.game.input.keys.has("Shift") && this.dashCount > 0 && this.dashDelay) {
            console.log("Dash")
            if (this.game.input.keys.has("ArrowRight")){
                this.speedX = this.dashSpeed
            }
            if (this.game.input.keys.has("ArrowLeft")){
                this.speedX = -this.dashSpeed
            }
            if (this.game.input.keys.has("ArrowUp")){
                this.speedY = -this.dashSpeed
            }
            if (this.game.input.keys.has("ArrowDown")){
                this.speedY = this.dashSpeed
            }
            
            this.dashCount--
            this.dashDelay = false

            setTimeout(() => {
                this.dashDelay = true
            }, 200);
        }

        if (this.grounded) {
            if (this.dashCount == 0 && this.dashDelay) {
                this.dashCount++
            }
            this.speedY = 0
            if (this.game.input.keys.has("ArrowUp") || this.game.input.keys.has(" ")) {
                this.speedY -= 20
                this.grounded = false
            }
            if (this.game.input.keys.has("ArrowRight") && this.game.input.keys.has("ArrowLeft") || !this.game.input.keys.has("ArrowRight") && !this.game.input.keys.has("ArrowLeft") || this.speedX > 0 && this.game.input.keys.has("ArrowLeft") || this.speedX < 0 && this.game.input.keys.has("ArrowRight")) {
                this.speedX *= 0.6
                this.frameY = 0
                this.maxFrames = 4
                this.fps = 15
                if (this.speedX < 0.1 && this.speedX > -0.1) {
                    this.speedX = 0
                }
            }
        } else {
            this.speedY += 1
        }

        /*//Horizontal collision
        let horizontal = {
            x: this.x + this.speedX,
            y: this.y,
            widht: this.width,
            height: this.height
        }

        //Vertical collision
        let vertical = {
            x: this.x,
            y: this.y + this.speedY,
            widht: this.width,
            height: this.height
        }

        //check intersection
        for (let i = 0; i < platforms.length; i++) {
            console.log(i)
            let platform = {
                x: this.platforms[i].x,
                y: this.platforms[i].y,
                width: this.platforms[i].width,
                height: this.platforms[i].height,
            }
            if (this.checkCollision(horizontal, platform)) {
                this.speedX = 0;
            }
            if (this.checkCollision(vertical, platform)) {
                this.speedY = 0;
            }
        }*/

        this.x += this.speedX
        this.y += this.speedY

        if (this.speedY < 0) {
            this.frameY = 5
            this.maxFrames = 1
        }

        this.interval = 1000 / this.fps

        if (this.timer > this.interval) {
            this.frameX++
            this.timer = 0
        } else {
            this.timer += deltaTime
        }

        if (this.frameX >= this.maxFrames) {
            this.frameX = 0
        }

        if (this.speedY > 0) {
            this.frameY = 5
            this.frameX = 1
        }

        if (this.x < 0) {
            this.x = 0
            this.speedX = 0
        }

        if (this.x + this.width > 854) {
            this.x = 854 - this.width
            this.speedX = 0
        }

        if (this.y > 500) {
            this.x = 0;
            this.y = 0;
        }
    }

    draw(ctx) {
        /*if (this.dashCount > 0 && this.dashDelay) {
            ctx.fillStyle = "blue"
        } else {
            ctx.fillStyle = "red"
        }
        ctx.fillRect(this.x, this.y, this.width, this.height)*/

        if (this.flip) {
            ctx.save()
            ctx.scale(-1, 1)
        }

        ctx.globalAlpha = 0.1
        
        ctx.drawImage(
            this.image,
            this.frameWidth * this.frameX,
            this.frameHeight * this.frameY,
            this.frameWidth,
            this.frameHeight,
            this.flip ? this.oldX * -1 - this.width : this.oldX,
            this.oldY,
            this.width,
            this.height)
            
            ctx.globalAlpha = 1
            
        ctx.drawImage(
            this.image,
            this.frameWidth * this.frameX,
            this.frameHeight * this.frameY,
            this.frameWidth,
            this.frameHeight,
            this.flip ? this.x * -1 - this.width : this.x,
            this.y,
            this.width,
            this.height)

        if (this.flip) {
            ctx.restore()
        }
    }

    checkCollision(r1, r2) {
        if (r1.x >= r2.x + r2.width) {
            return false;
        } else if (r1.x + r1.width <= r2.x) {
            return false;
        } else if (r1.y >= r2.y + r2.height) {
            return false;
        } else if (r1.y + r1.height <= r2.y) {
            return false;
        } else {
            return true
        }
    }
}