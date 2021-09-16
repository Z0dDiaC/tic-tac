shape_option = document.querySelector(".shape-option");
const x_button = 'x';
const o_button = 'o';
const winning_combination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,4,8],
    [0,4,8],
    [2,4,6],
]
cellBoxes = document.querySelectorAll(".cell");
const gameBoard = document.querySelector(".game-board");
const winMsg = document.querySelector(".won-msg");
const win_Msg = document.getElementById('result_');
const reset_ = document.getElementById('reset');
const shapeX = document.getElementById('xshape');
const shapeO = document.getElementById('oshape');
let o_turn;

startgame()
reset_.addEventListener("click", startgame)


function startgame(){
    cellBoxes.forEach(cell => {
        cell.classList.remove(x_button)
        cell.classList.remove(o_button)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    win_Msg.classList.remove('show')

}

function handleClick(e){
    
    const cell = e.target;
    const currentClass= o_turn ? o_button : x_button;
    
    mark(cell, currentClass)
    
    if(win(currentClass)){
        gameEnd(false)
        

    }else if(isDraw()){
        gameEnd(true)
    }else{
        changeTurn()
    }
    
}

function mark(cell, currentClass){
    cell.classList.add(currentClass)
}
function isDraw(){
    return [...cellBoxes].every(cell =>{
        return cell.classList.contains(o_button) || 
        cell.classList.contains(x_button)
    })
}
function changeTurn(){
    o_turn =! o_turn
}
function win(currentClass){
     return winning_combination.some(combination =>{
         return combination.every(index =>{
             return cellBoxes[index].classList.contains(currentClass)
         })
     })
}
function gameEnd(draw){
    if(draw){
        winMsg.innerText = 'Its a Draw!'
    }else{
        winMsg.innerText = `${o_turn ? "O" : "X"} Wins!`
    }
    win_Msg.classList.add('show')
}
