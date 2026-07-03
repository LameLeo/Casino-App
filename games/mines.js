// ================================
// ACE ARCADE - MINES 3.0
// ================================

const grid = document.getElementById("minesGrid");

let mineGame = [];
let bombs = [];
let gameRunning = false;

// ----------------------------
// START
// ----------------------------

document.getElementById("startMines").onclick = function(){

    const bet = Number(document.getElementById("minesBet").value);

    if(bet <= 0){
        alert("Ungültiger Einsatz.");
        return;
    }

    if(player.coins < bet){
        alert("Nicht genügend Coins.");
        return;
    }

    addCoins(-bet);

    gameRunning = true;

    createBoard();

};

// ----------------------------
// FELDER ERZEUGEN
// ----------------------------

function createBoard(){

    grid.innerHTML = "";

    mineGame = [];

    bombs = [];

    for(let i=0;i<25;i++){

        const tile=document.createElement("div");

        tile.className="mineTile";

        tile.dataset.id=i;

        tile.onclick=function(){

            if(!gameRunning) return;

            revealTile(i,tile);

        };

        grid.appendChild(tile);

        mineGame.push({

            bomb:false,
            opened:false

        });

    }

}
function revealTile(index,tile){

    if(mineGame[index].opened)
        return;

    tile.textContent="💎";

    tile.style.background="#00ff88";

    mineGame[index].opened=true;

}
  

