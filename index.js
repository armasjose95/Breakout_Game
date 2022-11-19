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

//draw my block
//only when we cann this function, we will create a block
function addBlock() {
    const block = document.createElement('div') //created a div using a js method and stored it as a block
    block.classList.add('block') //Give block the classList with the style of block located in css
    block.style.left = '100px' //left & bottom corner's margin are the same from the anchor point(bttm and left corner)
    block.style.bottom = '50px'
    grid.appendChild(block) //now that we have grid we put in newly created block using appchild with the style of block located in css
}

addBlock()

//
