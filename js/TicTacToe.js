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
let winner = false;
let blockGame = false;
const cells = [...document.querySelectorAll('.cell')];
cells.forEach(cell => cell.addEventListener('click', write));
const btn = document.getElementById(String(10));
btn.addEventListener('click', reset);
const infoWin = document.getElementById(String(11));

function write(event) {
    if (blockGame === false) {
        let tempPlayer = document.getElementById(event.target.id);
        if (tempPlayer.innerText === "") {
            let text = document.createTextNode(player);
            tempPlayer.appendChild(text);
            playersMoves.push(Number(event.target.id));
            turn++;
            check(playersMoves);
            if (winner === true) {
                infoWin.innerText = "X wins! Please wait for reset.";
                blockGame = true;
                setTimeout(reset, 3000);
            } else {
                computer();
            }
        }
        if (turn === 9) {
            check(playersMoves);
            if (winner === true) {
                infoWin.innerText = "X wins! Please wait for reset.";
                blockGame = true;
                setTimeout(reset, 3000);
            } else {
                check(compMoves);
                if (winner === true) {
                    infoWin.innerText = "O wins! Please wait for reset.";
                    blockGame = true;
                    setTimeout(reset, 3000);
                } else {
                    infoWin.innerText = "Draw! Please wait for reset.";
                    blockGame = true;
                    setTimeout(reset, 3000);
                }
            }
        }
    }
}

function computer() {
    let empty = true;
    if (turn < 8) {
        while (empty === true) {
            let tempComp = document.getElementById(String(randomize()));
            if (tempComp.innerText === "") {
                let text = document.createTextNode(comp);
                tempComp.appendChild(text);
                compMoves.push(Number(tempComp.id));
                turn++;
                empty = false;
                check(compMoves);
                if (winner === true) {
                    infoWin.innerText = "O wins! Please wait for reset.";
                    blockGame = true;
                    setTimeout(reset, 3000);
                }
            }
        }
    }
}


const randomize = () => { return Math.floor((Math.random() * 9));};

function reset() {
    for (let i = 0; i < 9; i++) {
        let res = document.getElementById(String(i));
        res.innerText = "";
    }
    turn = 0;
    winner = false;
    playersMoves.length = 0;
    compMoves.length = 0;
    infoWin.innerHTML = "";
    blockGame = false;

}

function check(moves) {
    for (let i = 0; i < 8; i++) {
        if (includesAll(moves, winConditions[i])) {
            winner = true;
            break;
        }
    }
}

const includesAll = (array_to_check, arr) => arr.reduce(
    (accumulator, current) => accumulator && array_to_check.includes(current),
    true);

