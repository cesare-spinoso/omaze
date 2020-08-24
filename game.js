var myGamePiece
var myObstacle = [] // for multiple obstables
var myScore

function startGame() {
")
        // For multiple obstacles
        this.frameNo = 0
        // at every 20 ms update frame
        this.interval = setInterval(updateGameArea, 20)
        window.addEventListener('keydown', function (e) {
            myGameArea.keyDown = e.key
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keyDown = false
            stopMove()
        })
    },
    clear: f    myGamePiece = new component(30, 30, "blue", 10, 120)
    // Add a text type because handled differently from rect
    myScore = new component("15px", "Consolas", "black", 360, 40, "text")
    myGameArea.start()
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480
        this.canvas.height = 270
        // getContext() is a built-in HTML object, with properties and methods for drawing
        this.context = this.canvas.getContext("2d")
        // insert canvas before anything in the html body
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.canvas.setAttribute("class","text-centerunction () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    stop: function () {
        clearInterval(this.interval);
        document.getElementById("last score").innerHTML = myGameArea.frameNo
        console.log("top score is" + document.getElementById("top score").innerHTML)
        console.log("score is" + myGameArea.frameNo)
        console.log("dom value is " +parseInt(document.getElementById("top score").innerHTML))
        if (document.getElementById("top score").innerHTML === ""||
            myGameArea.frameNo > parseInt(document.getElementById("top score").innerHTML)) {
            document.getElementById("top score").innerHTML = myGameArea.frameNo
        }
        // Restart game
        if (window.confirm("Game over! Would you like to play again?")){
            myGameArea.clear()
            myObstacle = []
            startGame()
        }
        else{
            alert("Sore loser...")
        }
    }
}

function component(width, height, color, x, y, type) {
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y
    this.type = type
    this.update = function () {
        if (this.type === "text") {
            // Custom context for text
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx = myGameArea.context
            ctx.fillStyle = color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    this.newPos = function () {
        this.x += this.speedX
        this.y += this.speedY
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    for (let i = 0; i < myObstacle.length; i++) {
        if (myGamePiece.crashWith(myObstacle[i])) {
            myGameArea.stop()
            return;
        }
    }
    myGameArea.clear()
    myGameArea.frameNo += 1
    // Every 150 ms new obstacles
    if (myGameArea.frameNo === 1 || everyinterval(150)) {
        // generate obstacles of random height at same x
        let x = myGameArea.canvas.width;
        let minHeight = 20
        let maxHeight = 200
        let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight)
        let minGap = 50
        let maxGap = 200
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)
        myObstacle.push(new component(10, height, "green", x, 0));
        myObstacle.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    // Move each obstacle
    for (let i = 0; i < myObstacle.length; i += 1) {
        myObstacle[i].x += -1;
        myObstacle[i].update();
    }
    if (myGameArea.keyDown) {
        if (myGameArea.keyDown === "ArrowLeft") {
            myGamePiece.speedX = -1;
        }
        if (myGameArea.keyDown === "ArrowRight") {
            myGamePiece.speedX = 1;
        }
        if (myGameArea.keyDown === "ArrowUp") {
            myGamePiece.speedY = -1;
        }
        if (myGameArea.keyDown === "ArrowDown") {
            myGamePiece.speedY = 1;
        }
    }
    myScore.text = "SCORE: " + myGameArea.frameNo
    myScore.update()
    myGamePiece.newPos()
    myGamePiece.update()
}

function everyinterval(n) {
    return (myGameArea.frameNo / n) % 1 === 0;

}

function moveUp() {
    myGamePiece.speedY -= 1
}

function moveDown() {
    myGamePiece.speedY += 1
}

function moveRight() {
    myGamePiece.speedX += 1
}

function moveLeft() {
    myGamePiece.speedX -= 1
}

function stopMove() {
    myGamePiece.speedX = 0
    myGamePiece.speedY = 0
}