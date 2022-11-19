const grid = document.querySelector('.grid') //looking for class of grid. Storing elment as grid.
const blockWidth = 100
const blockHeight = 20

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


