const counterEl = document.getElementById("counter");
const historyList = document.getElementById("historyList");
const rankList = document.getElementById("rankList");

const historyMenu = document.getElementById("historyMenu");
const rankMenu = document.getElementById("rankMenu");

const addBtn = document.getElementById("addBtn");
const minusBtn = document.getElementById("minusBtn");
const resetBtn = document.getElementById("resetBtn");

const toggleHistory = document.getElementById("toggleHistory");
const toggleRank = document.getElementById("toggleRank");
const soundToggle = document.getElementById("soundToggle");

// 🔊 som
const clickSound = new Audio("click.mp3");

let soundOn = localStorage.getItem("sound") !== "off";

function updateSoundIcon() {
  soundToggle.textContent = soundOn ? "🔊" : "🔇";
}
updateSoundIcon();

function playClick() {
  if (soundOn) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
}

// 📊 dados
let count = parseInt(localStorage.getItem("count")) || 0;
let lastDate = localStorage.getItem("lastDate");

// 📅 novo dia
function checkNewDay() {
  const now = new Date().toLocaleDateString("pt-BR");

  if (lastDate !== now) {
    if (lastDate !== null) saveHistory();

    count = 0;
    lastDate = now;

    localStorage.setItem("lastDate", now);
    localStorage.setItem("count", count);
  }
}

// 💾 histórico
function saveHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.push({
    date: lastDate,
    matches: count
  });

  localStorage.setItem("history", JSON.stringify(history));
}

function loadHistory() {
  historyList.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.slice().reverse().forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.date} - ${item.matches}`;
    historyList.appendChild(li);
  });
}

// 🏆 ranking fake
function generateRanking() {
  let players = [
    {name:"ProPlayer", score:120},
    {name:"Shadow", score:98},
    {name:"Ghost", score:85},
    {name:"Ninja", score:70},
    {name:"Speed", score:60}
  ];

  players.push({name:"Você", score:count});

  players.sort((a,b)=>b.score-a.score);

  rankList.innerHTML = "";

  players.forEach((p,i)=>{
    let li = document.createElement("li");
    li.className = "rank-item";

    if(p.name==="Você") li.classList.add("me");

    li.innerHTML = `#${i+1} ${p.name} <span>${p.score}</span>`;
    rankList.appendChild(li);
  });
}

// ✨ partículas
function spawnParticles(x, y) {
  for (let i = 0; i < 8; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const size = Math.random() * 6 + 4;
    p.style.width = size + "px";
    p.style.height = size + "px";

    p.style.left = x + "px";
    p.style.top = y + "px";

    p.style.background = `hsl(${Math.random()*360},100%,70%)`;

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 60 + 20;

    p.style.setProperty("--x", Math.cos(angle)*distance + "px");
    p.style.setProperty("--y", Math.sin(angle)*distance + "px");

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 600);
  }
}

// 💥 animação contador
function bumpCounter() {
  counterEl.classList.add("bump");
  setTimeout(()=>counterEl.classList.remove("bump"),200);
}

// ➕
addBtn.onclick = (e)=>{
  playClick();
  checkNewDay();

  count++;
  update();
  bumpCounter();
  spawnParticles(e.clientX, e.clientY);
};

// ➖
minusBtn.onclick = (e)=>{
  playClick();
  checkNewDay();

  if(count>0){
    count--;
    update();
    bumpCounter();
  }

  spawnParticles(e.clientX, e.clientY);
};

// 🔄
resetBtn.onclick = (e)=>{
  playClick();

  if(confirm("Resetar dia?")){
    saveHistory();
    count=0;
    update();
  }

  spawnParticles(e.clientX, e.clientY);
};

// 🔊
soundToggle.onclick = ()=>{
  soundOn = !soundOn;
  localStorage.setItem("sound", soundOn?"on":"off");
  updateSoundIcon();
};

// 📊 histórico
toggleHistory.onclick = ()=>{
  playClick();

  historyMenu.classList.toggle("hidden");

  if(!historyMenu.classList.contains("hidden")){
    loadHistory();
  }
};

// 🏆 ranking
toggleRank.onclick = ()=>{
  playClick();

  rankMenu.classList.toggle("hidden");

  if(!rankMenu.classList.contains("hidden")){
    generateRanking();
  }
};

// atualizar
function update(){
  counterEl.textContent = count;
  localStorage.setItem("count", count);
}

// iniciar
checkNewDay();
update();
loadHistory();
