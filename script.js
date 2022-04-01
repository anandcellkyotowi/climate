const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
const spriteWidth = 48
const spriteHeight = 48
canvas.width = 800
canvas.height = 560
var frame = 0
var gameFrame = 0
var animationFrame = 3
var fps = 8
var i = 0
var jump = false
var hit = false
const gravity = 0.3

class Chad {
    constructor() {
        this.width = 150
        this.height = 150
        this.x = 0
        this.y = 100
        this.vx = 0
        this.vy = 0
        this.image = new Image()
        this.src = "3 Cyborg/Cyborg_idle.png"
        this.image.src = this.src
    }
    draw() {
        c.drawImage(this.image, spriteWidth * frame, 0, spriteWidth, spriteHeight, this.x, this.y, this.width, this.height)
    }
    update() {
        if (this.y + this.height + this.vy <= canvas.height)
            this.vy += gravity;

        else {
            this.vy = 0;
            jump = false
            fps = 8
            chad.image.src = chad.vx ? '3 Cyborg/Cyborg_run.png' : '3 Cyborg/Cyborg_idle.png'
            if (hit) {
                chad.image.src = chad.vx ? '3 Cyborg/Cyborg_run_attack.png' : '3 Cyborg/Cyborg_attack1.png'
                animationFrame = 5
            }
        }
        this.draw()
        this.x += this.vx
        this.y += this.vy
    }
}
const chad = new Chad()


function animate() {
    gameFrame++
    c.clearRect(0, 0, canvas.width, canvas.height)
    chad.update()
    if (hit && frame == animationFrame - 1) {
        console.log('last hit frame')
        chad.image.src = chad.vx ? '3 Cyborg/Cyborg_run.png' : '3 Cyborg/Cyborg_idle.png'
        hit = false
        animationFrame = chad.vx ? 5 : 3
    }
    requestAnimationFrame(animate)
    if (gameFrame % fps == 0) {
        if (frame < animationFrame) frame++
            else frame = 0
    }
}
animate()

addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            chad.image.src = '3 Cyborg/Cyborg_run.png'
            animationFrame = 5
            chad.vx = 4.5
            break
        case 'f':
            animationFrame = 5
            frame = 0
            hit = true
            break
        case 'a':
            chad.x = 0
            break
        case 'w':
            if (!jump) {
                chad.vy = -10
            }
            chad.image.src = '3 Cyborg/Cyborg_jump.png'
            animationFrame = 3
            gameFrame = 0
            fps = 19
            jump = true
            break
    }
})
addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            chad.image.src = '3 Cyborg/Cyborg_idle.png'
            animationFrame = 3
            chad.vx = 0
            break
        case 'a':
            chad.image.src = '3 Cyborg/Cyborg_idle.png'
            animationFrame = 3
            chad.vx = 0
            break
    }
})