const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
const spriteWidth = 48
const spriteHeight = 48
canvas.width = 800
canvas.height = 560

var treeFrame = 0;
var treeShown = false;
const treeSpriteHeight = 250;
const treeSpriteWidth = 175;
var frame = 0
var gameFrame = 0
var animationFrame = 3
var fps = 8
var i = 0
var jump = false
var hit = false
const gravity = 0.3

var tbox = document.getElementById("tbox");
var redOb = false;
var close = false

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
class Obstacle {
    constructor() {
        this.width = 20
        this.height = 20
        this.x = 200
        this.y = 500
        this.vx = 0
        this.vy = 0
    }
    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}
class Tree {
    constructor() {
        this.width = 175;
        this.height = 175;
        this.x = 100;
        this.y = 400;
        this.image = new Image();
        this.image.src = 'coin.png';
    }
    draw() {
        c.drawImage(this.image, treeSpriteWidth * treeFrame, 0, treeSpriteWidth, treeSpriteHeight, this.x, this.y, this.width, this.height)
    }

}

const chad = new Chad()
const obstacle = new Obstacle()
const treeOb = new Tree()



function animate() {
    if (treeShown && treeFrame < 3 && gameFrame % fps == 0) {
        treeFrame++;
    }
    gameFrame++
    c.clearRect(0, 0, canvas.width, canvas.height)
    if (treeFrame % fps) {
        treeOb.draw();
    }
    chad.update()
    obstacle.draw()

    if (hit && frame == animationFrame - 1) {
        console.log('last hit frame')
        chad.image.src = chad.vx ? '3 Cyborg/Cyborg_run.png' : '3 Cyborg/Cyborg_idle.png'
        hit = false
        animationFrame = chad.vx ? 5 : 3
    }
    requestAnimationFrame(animate)
    if (gameFrame % fps == 0) {
        // frame = frame % animationFrame;
        if (frame < animationFrame) frame++
            else frame = 0
    }
    if (chad.x >= obstacle.x - chad.width / 2 && chad.x <= obstacle.x + chad.width / 2 + obstacle.width) {
        close = true
        tbox.innerHTML = "Press E to use"

    } else {
        tbox.innerHTML = ""
        close = false

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
            frame = 0
            fps = 23
            jump = true
            break
        case 'e':
            if (close) {
                treeShown = true;
            }

    }
})
addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            chad.image.src = '3 Cyborg/Cyborg_idle.png'
            animationFrame = 3
            frame = 0
            chad.vx = 0
            break
        case 'a':
            chad.image.src = '3 Cyborg/Cyborg_idle.png'
            animationFrame = 3
            chad.vx = 0
            frame = 0
            break
    }
})