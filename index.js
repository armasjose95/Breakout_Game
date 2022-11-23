const grid = document.querySelector('.grid') //looking for class of grid. Storing elment as grid.
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20 //w&h of 20 we gave ball in css
const boardWidth = 560 //lenght of width we created in css
const boardHeight = 300
let timerId
let xDirection = -2
let yDirection = 2
let score = 0

const userStart = [230,10] // users will always start here
let currentPosition = userStart // need to move user left and right and need to track this

const ballStart = [270,40]
let ballCurrentPosition = ballStart

//create block individual
class block{
    //Using x&y axis I can decipher all 4 pts of my block & where they are on my grid using width & height of the block.
    // we can decipher all of those from the bottom left x and y axis
    constructor(xAxis, yAxis) {  //bottom left of our block 
        //bottomLeft is x&y axis. Whatever we pass into block constructor it's going to be the bttm left of our block
        this.bottomLeft = [xAxis,yAxis] 
        this.bottomRight = [xAxis + blockWidth, yAxis] //get bottom right of x axis we have to add to x axis(100px)
        this.topLeft = [xAxis, yAxis + blockHeight] //get top left by adding height to y axis(20px)
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight] //opposite of other corner. 
    }
}

//all my blocks
const blocks = [
    new block(10,270), // x and y axis
    new block(120,270),
    new block(230,270),
    new block(340,270),
    new block(450,270),
    new block(10,240), 
    new block(120,240),
    new block(230,240),
    new block(340,240),
    new block(450,240),
    new block(10,210),
    new block(120,210),
    new block(230,210),
    new block(340,210),
    new block(450,210),
]




//draw all my blocks
//only when we cann this function, we will create a block
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) { //as long as i is smaller than blocks array lenght, add 1
    const block = document.createElement('div') //created a div using a js method and stored it as a block
    block.classList.add('block') //Give block the classList with the style of block located in css
    //left & bottom corner's margin are the same from the anchor point(bttm and left corner)
    // going into blocks array next line down. Assigning x axis to the left. give styling of 10 px(x axis)
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    //getting 2nd value(y axis which is 270px)
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block) //now that we have grid we put in newly created block using appchild with the style of block located in css
    }
}

addBlocks()


//add user
const user = document.createElement('div') //create a div
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw the user
function drawUser() {
    user.style.left = currentPosition[0] + 'px' //get x axis
    user.style.bottom = currentPosition[1] + 'px' //get y axis  
}


//draw the ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}


//move user
function moveUser(e) { // pass through an event
    switch(e.key) { // if it equals the case then you execute the code
        case 'ArrowLeft':
            //stopping user from leaving square.
            if (currentPosition[0] > 0) { //as long as x-axis of our user is larger than 0, then we execute
                currentPosition[0] -= 10 //take away from our x axis and move x position
                drawUser() //redraw the user
            }
            break;
        case 'ArrowRight':
            /* -blockWidth because it goes over right side of box because it stops at left corner of the box is over
            which pulls entire block outside of box */
            if (currentPosition[0] < boardWidth - blockWidth) { 
                currentPosition[0] += 10
                drawUser() //redraw the user
            }
            break;
    }
}

/*listening out to anytime I press any key on the keyboard and going to invoke movesUser function
and then see if the ksy is our left and if it is we're going to move the x axis of current position
*/
document.addEventListener('keydown', moveUser) 



//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball) //putting ball inside of the parent:grid

//moving the ball
function moveBall() { //want ball to move by adding an x and y axis
    ballCurrentPosition[0] += xDirection //moves our ball
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions() //every 30 milliseconds we want to check for a collision
}

//Need to clear timerId when we want the ball to stop. Stop by getting timerID & passing it through clear interval.
timerId = setInterval(moveBall, 30) //30 milliseconds

// check for collisions
function checkForCollisions() {
    //check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        if ( // check if ball is in between the block's bttm left x-axis & bttm right x-axis & in the height(means a collision)
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block') //visually won't see the block now
            blocks.splice(i, 1) //remove specefic block from our blocks array by using splice
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
        }
    }
    //check for wall collisions
    //if larger we know it's off the grid & we need to change direction
    //account for ball width itself as ball width and height are the same
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0  //goes off l hand side of board, change direction b4 it happens
        ) {
        changeDirection()
    } 
    //check for game over
    if (ballCurrentPosition[1] <= 0) { //goes off bottom of board, change direction b4 it happens
        clearInterval(timerId) //want to stop it
        scoreDisplay.innerHTML = 'You lose!'
        document.removeEventListener('keydown', moveUser) //so we can't move the user anymore
    }
}


//currently we know ball is moving +2 x&Y and need to change these values
function changeDirection() {
    //if xDirection on collision === 2 & yDirection === 2 on collison
    //essentially ball is moving to the top right corner of the grid, we want to change the direction
    if (xDirection === 2 && yDirection === 2) { 
        yDirection = -2 // to make sure ball has proper phsyics collison
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}

