import GameObject from "./GameObject";

export default class Player extends GameObject {
    constructor(x, y, width, height, color, speed, game) {
        super(x, y, width, height, color)
        this.game = game
        this.speedX = 0

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

        this.maxSpeedX = speed
        this.speedY = 0
        this.maxSpeedY = speed
        this.height = height
        this.width = width

        this.dashSpeed = 30
        this.dashCount = 0
        this.dashDelay = true
        this.dashDirection = 0
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

        if (this.game.input.keys.has("Shift") && this.dashCount > 0 && this.dashDelay) {
            console.log("Dash")
            if (this.game.input.keys.has("ArrowRight")){
                this.dashDirection = 0
            }
            if (this.game.input.keys.has("ArrowLeft")){
                this.dashDirection = 180
            }
            if (this.game.input.keys.has("ArrowUp")){
                this.dashDirection = ((this.dashDirection+90)/2)
            }
            if (this.game.input.keys.has("ArrowDown")){
                this.dashDirection = ((this.dashDirection+270)/2)
            }

            this.speedX = Math.cos(this.dashDirection) * this.dashSpeed
            this.speedY = Math.sin(this.dashDirection) * this.dashSpeed

            
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
        if (this.dashCount > 0 && this.dashDelay) {
            ctx.fillStyle = "blue"
        } else {
            ctx.fillStyle = "red"
        }
        ctx.fillRect(this.x, this.y, this.width, this.height)

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
}