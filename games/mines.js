// ================================
// ACE ARCADE - MINES 3.0
// ================================

const grid = document.getElementById("minesGrid");

let mineGame = [];
let bombs = [];
let gameRunning = false;
let currentBet = 0;
let revealed = 0;
let bombCount = 3;
// ----------------------------
// START
// ----------------------------

document.getElementById("startMines").onclick = function(){

    currentBet = Number(document.getElementById("minesBet").value);
    bombCount =
Number(document.getElementById("bombCount").value);

    if(currentBet <= 0){
        alert("Ungültiger Einsatz.");
        return;
    }
document.getElementById("minesMultiplier").textContent = "1.00x";
document.getElementById("mineWin").textContent = "0";
    if(player.coins < currentBet){
        alert("Nicht genügend Coins.");
        return;
    }

    addCoins(-currentBet);

    gameRunning = true;
    revealed = 0;
    updateChance();
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

        tile.style.background = "";
        
        tile.style.opacity = "";
        
        tile.style.boxShadow = "";
        
        tile.style.transform = "";
        
        tile.style.transition = "";

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

    while(bombs.length < bombCount){

        const random=Math.floor(Math.random()*25);

        if(!bombs.includes(random)){

            bombs.push(random);

        }

    }

    bombs.forEach(index=>{

        mineGame[index].bomb = true;

    });

}


function revealTile(index,tile){

    if(mineGame[index].opened)
        return;

    mineGame[index].opened = true;

    if(mineGame[index].bomb){

        tile.textContent = "💣";
        tile.style.background = "#ff3b30";
        tile.classList.add("open");
        tile.classList.add("bomb");
        tile.style.cursor = "default";
        tile.onclick = null;

        gameRunning = false;

        recordGame(false, currentBet); 

        // Alle Bomben zeigen
revealAllTiles();

alert("💥 Boom! Du hast verloren.");

return;

    }

    tile.textContent = "💎";
    tile.style.background = "#00ff88";
    tile.classList.add("open");

tile.style.cursor = "default";
tile.style.transform = "scale(0.95)";
tile.onclick = null;

revealed++;
updateChance();

const multiplier =
1 + (revealed * (bombCount / 8));

document.getElementById("minesMultiplier").textContent =
    multiplier.toFixed(2) + "x";

const currentWin = Math.floor(currentBet * multiplier);

document.getElementById("mineWin").textContent =
formatCoins(currentWin);
}
  
document.getElementById("cashOutMines").onclick = function(){

    if(!gameRunning) return;

    gameRunning = false;

   const multiplier =
(
    1 +
    (revealed * (bombCount / 8))
);

    const win = Math.floor(currentBet * multiplier);

    addCoins(win);
    addXP(20);

    recordGame(true, win);
    revealAllTiles();

    alert(
        "💰 Cash Out!\n\n" +
        "Multiplier: " + multiplier.toFixed(2) + "x\n" +
        "Gewinn: " + formatCoins(win) + " Coins"
    );

};

function updateChance(){

    const safeTiles = 25 - bombCount - revealed;
    const totalTiles = 25 - revealed;

    const chance = (safeTiles / totalTiles) * 100;

    document.getElementById("mineChance").textContent =
        chance.toFixed(1) + "%";

}

function revealAllTiles(){

    for(let i = 0; i < mineGame.length; i++){

        setTimeout(function(){

            const tile = document.querySelector(`[data-id="${i}"]`);

            tile.onclick = null;
            tile.style.cursor = "default";

            // kleine Aufdeck-Animation
            tile.style.transform = "scale(0)";
            tile.style.transition = "all .18s ease";

            setTimeout(function(){

                tile.style.transform = "scale(1)";

            },20);

            if(mineGame[i].bomb){

                // 💣 Bombe
                tile.textContent = "💣";
                tile.style.background = "#ff3b30";
                tile.classList.add("open","bomb");

            }else if(mineGame[i].opened){

                // 💎 Bereits gefunden
                tile.textContent = "💎";
                tile.style.background = "#00ff88";
                tile.style.boxShadow =
                    "0 0 18px rgba(0,255,136,.9)";
                tile.classList.add("open");

            }else{

                // 💎 Noch nicht gefunden
                tile.textContent = "💎";
                tile.style.background = "#475569";
                tile.style.opacity = "0.7";
                tile.classList.add("open");

            }

        }, i * 45); // 45ms Verzögerung pro Feld

    }

}
