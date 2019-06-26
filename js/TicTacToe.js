let turn = 0;
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];
const player = 'X';
const comp = 'O';
let playersMoves = [];
let compMoves = [];
let winner = 0;
let block = 0;
const cells = [...document.querySelectorAll('.cell')];
cells.forEach(cell => cell.addEventListener('click', write));
const btn = document.querySelector('#reset');
btn.addEventListener('click', reset);
const infoWin = document.querySelector('#info')

function write(event) {
    if (block == 0) {
        let tempPlayer = document.getElementById(event.target.id);
        if (tempPlayer.innerText == "") {
            let text = document.createTextNode(player);
            tempPlayer.appendChild(text);
            playersMoves.push(Number(event.target.id));
            turn++;
            check(playersMoves);
            if (winner == 1) {
                infoWin.innerText = "X wins! Please wait for reset.";
                block = 1;
                setTimeout(reset, 3000);
            } else {
                computer();
            }
        }
        if (turn == 9) {
            check(playersMoves);
            if(winner == 1){
                infoWin.innerText = "X wins! Please wait for reset.";
                block = 1;
                setTimeout(reset, 3000);
            }
            else {
                check(compMoves);
                if(winner == 1){
                    infoWin.innerText = "O wins! Please wait for reset.";
                    block = 1;
                    setTimeout(reset, 3000);
                }
                else {
                    infoWin.innerText = "Draw! Please wait for reset.";
                    block = 1;
                    setTimeout(reset, 3000);
                }
            }
        }
    }
}

function computer() {
    let empty = 1;
    if (turn < 8) {
        while (empty == 1) {
            let tempComp = document.getElementById(randomize());
            if (tempComp.innerText == "") {
                let text = document.createTextNode(comp);
                tempComp.appendChild(text);
                compMoves.push(Number(tempComp.id));
                turn++;
                empty = 0;
                check(compMoves);
                if (winner == 1) {
                    infoWin.innerText = "O wins! Please wait for reset.";
                    block = 1;
                    setTimeout(reset, 3000);
                }
            }
        }
    }
}

function randomize() {
    let randomNumber = Math.floor((Math.random() * 9))
    return randomNumber;
}

function reset() {
    for (let i = 0; i < 9; i++) {
        let res = document.getElementById(i);
        res.innerText = "";
    }
    turn = 0;
    winner = 0;
    playersMoves.length = 0;
    compMoves.length = 0;
    infoWin.innerHTML = "";
    block = 0;
}

function check(moves) {
    for (let i = 0; i < 8; i++) {
        if (includesAll(moves, winConditions[i])) {
            winner = 1;
            break;
        }
    }
}

const includesAll = (array_to_check, arr) => arr.reduce(
    (accumulator, current) => accumulator && array_to_check.includes(current),
    true);

