// ===================================
// ACE ARCADE v2
// Modul 1 - Core System
// ===================================

// ---------- Spielerdaten ----------
let player = {
    coins: Number(localStorage.getItem("aa_coins")) || 1000,
    xp: Number(localStorage.getItem("aa_xp")) || 0
};

// ---------- Speichern ----------
function savePlayer() {
    localStorage.setItem("aa_coins", player.coins);
    localStorage.setItem("aa_xp", player.xp);
}

// ---------- Level berechnen ----------
function getLevel() {
    return Math.floor(player.xp / 500) + 1;
}

// ---------- Anzeige ----------
function updateUI() {

    document.getElementById("coins").textContent = player.coins;
    document.getElementById("walletCoins").textContent = player.coins;

    const level = getLevel();

    document.getElementById("level").textContent = level;
    document.getElementById("walletLevel").textContent = level;
}

// ---------- Coins ----------
function addCoins(amount){

    player.coins += amount;

    if(player.coins < 0)
        player.coins = 0;

    savePlayer();
    updateUI();

}

// ---------- XP ----------
function addXP(amount){

    player.xp += amount;

    savePlayer();
    updateUI();

}

// ---------- Seiten wechseln ----------
function showPage(page){

    document.querySelectorAll(".page").forEach(p=>{

        p.classList.remove("active");

    });

    document.getElementById(page).classList.add("active");

}

// ---------- Daily Reward ----------
const dailyBtn = document.getElementById("dailyRewardBtn");

if(dailyBtn){

dailyBtn.onclick = function(){

const last =
Number(localStorage.getItem("aa_daily")) || 0;

const now = Date.now();

const cooldown = 24*60*60*1000;

if(now-last >= cooldown){

addCoins(250);
addXP(100);

localStorage.setItem("aa_daily",now);

alert("🎉 Daily Reward!\n\n+250 Coins\n+100 XP");

}else{

const left = cooldown-(now-last);

const hours = Math.floor(left/3600000);
const mins = Math.floor((left%3600000)/60000);

alert("⏳ Bitte warte noch\n"+hours+"h "+mins+"min");

}

}

}

// ---------- Start ----------
updateUI();
