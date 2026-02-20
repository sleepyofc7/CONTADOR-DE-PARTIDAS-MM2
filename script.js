const counterEl = document.getElementById("counter");
const historyList = document.getElementById("historyList");
const rankList = document.getElementById("rankList");
// ---------- LOGIN ----------
let name = localStorage.getItem("name");

const historyMenu = document.getElementById("historyMenu");
const rankMenu = document.getElementById("rankMenu");
function saveName(){
  name = document.getElementById("nameInput").value;
  if(!name) return;

const addBtn = document.getElementById("addBtn");
const minusBtn = document.getElementById("minusBtn");
const resetBtn = document.getElementById("resetBtn");
  localStorage.setItem("name", name);
  start();
}

const toggleHistory = document.getElementById("toggleHistory");
const toggleRank = document.getElementById("toggleRank");
const soundToggle = document.getElementById("soundToggle");
if(name) start();

// 🔊 som
const clickSound = new Audio("click.mp3");
function start(){
  document.getElementById("loginBox").style.display="none";
  document.getElementById("app").style.display="block";
  updatePlayerInfo();
}

// ---------- SOM ----------
const clickSound = new Audio("click.mp3");
let soundOn = localStorage.getItem("sound") !== "off";

function updateSoundIcon() {
  soundToggle.textContent = soundOn ? "🔊" : "🔇";
}
updateSoundIcon();

function playClick() {
  if (soundOn) {
    clickSound.currentTime = 0;
function playClick(){
  if(soundOn){
    clickSound.currentTime=0;
clickSound.play();
}
}

// 📊 dados
let count = parseInt(localStorage.getItem("count")) || 0;
let lastDate = localStorage.getItem("lastDate");
document.getElementById("soundToggle").onclick=()=>{
  soundOn=!soundOn;
  localStorage.setItem("sound",soundOn?"on":"off");
};

// 📅 novo dia
function checkNewDay() {
  const now = new Date().toLocaleDateString("pt-BR");
// ---------- DADOS ----------
let count = parseInt(localStorage.getItem("count")) || 0;
let xp = parseInt(localStorage.getItem("xp")) || 0;
let lastLogin = localStorage.getItem("loginDay");

  if (lastDate !== now) {
    if (lastDate !== null) saveHistory();
// ---------- RESET DIÁRIO ----------
function checkDay(){
  let today = new Date().toLocaleDateString();

    count = 0;
    lastDate = now;
  if(lastLogin !== today){
    xp += 1000; // login reward
    localStorage.setItem("loginDay",today);

    localStorage.setItem("lastDate", now);
    localStorage.setItem("count", count);
    randomizeRanking();
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
// ---------- PATENTES ----------
const ranks = [
  {name:"Iniciante", xp:0, icon:"🔰"},
  {name:"Bronze 1", xp:2000, icon:"🥉"},
  {name:"Bronze 2", xp:3000, icon:"🥉"},
  {name:"Bronze 3", xp:4000, icon:"🥉"},
  {name:"Prata 1", xp:5000, icon:"🥈"},
  {name:"Prata 2", xp:6000, icon:"🥈"},
  {name:"Prata 3", xp:7000, icon:"🥈"},
  {name:"Ouro 1", xp:9000, icon:"🥇"},
  {name:"Platina", xp:12000, icon:"💎"},
  {name:"Diamante", xp:20000, icon:"💠"},
  {name:"Mestre", xp:50000, icon:"👑"},
  {name:"Lendário", xp:500000, icon:"🔥"}
];

function getRank(){
  let current = ranks[0];

  for(let r of ranks){
    if(xp >= r.xp) current = r;
  }

    li.innerHTML = `#${i+1} ${p.name} <span>${p.score}</span>`;
    rankList.appendChild(li);
  });
  return current;
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
// ---------- XP BAR ----------
function updateXP(){
  let current = getRank();
  let next = ranks[ranks.indexOf(current)+1];

    p.style.background = `hsl(${Math.random()*360},100%,70%)`;
  if(!next) return;

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 60 + 20;
  let progress = (xp - current.xp)/(next.xp-current.xp)*100;

    p.style.setProperty("--x", Math.cos(angle)*distance + "px");
    p.style.setProperty("--y", Math.sin(angle)*distance + "px");

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 600);
  }
  document.getElementById("xpFill").style.width = progress+"%";
}

// 💥 animação contador
function bumpCounter() {
  counterEl.classList.add("bump");
  setTimeout(()=>counterEl.classList.remove("bump"),200);
// ---------- INFO ----------
function updatePlayerInfo(){
  let r = getRank();
  document.getElementById("playerInfo").innerText =
    `${r.icon} ${name} - ${r.name} (${xp} XP)`;
}

// ➕
addBtn.onclick = (e)=>{
  playClick();
  checkNewDay();

// ---------- BOTÕES ----------
document.getElementById("addBtn").onclick=()=>{
count++;
  xp+=10;
update();
  bumpCounter();
  spawnParticles(e.clientX, e.clientY);
};

// ➖
minusBtn.onclick = (e)=>{
  playClick();
  checkNewDay();

document.getElementById("minusBtn").onclick=()=>{
if(count>0){
count--;
update();
    bumpCounter();
}
};

  spawnParticles(e.clientX, e.clientY);
document.getElementById("resetBtn").onclick=()=>{
  count=0;
  update();
};

// 🔄
resetBtn.onclick = (e)=>{
  playClick();
function update(){
  document.getElementById("counter").innerText = count;
  localStorage.setItem("count",count);
  localStorage.setItem("xp",xp);

  if(confirm("Resetar dia?")){
    saveHistory();
    count=0;
    update();
  }
  updateXP();
  updatePlayerInfo();
}

  spawnParticles(e.clientX, e.clientY);
};
// ---------- HISTÓRICO ----------
function saveHistory(){
  let h = JSON.parse(localStorage.getItem("history"))||[];

// 🔊
soundToggle.onclick = ()=>{
  soundOn = !soundOn;
  localStorage.setItem("sound", soundOn?"on":"off");
  updateSoundIcon();
};
  h.push({date:new Date().toLocaleDateString(),count});
  localStorage.setItem("history",JSON.stringify(h));
}

// 📊 histórico
toggleHistory.onclick = ()=>{
  playClick();
// ---------- RANK FAKE ----------
function randomizeRanking(){
  let fake = [
    {name:"Shadow"},
    {name:"Ghost"},
    {name:"Ninja"},
    {name:"Speed"}
  ];

  historyMenu.classList.toggle("hidden");
  fake.forEach(p=>{
    p.score = Math.floor(Math.random()*1000)+10;
  });

  if(!historyMenu.classList.contains("hidden")){
    loadHistory();
  }
};
  localStorage.setItem("fakeRank",JSON.stringify(fake));
}

// 🏆 ranking
toggleRank.onclick = ()=>{
  playClick();
function loadRanking(){
  let fake = JSON.parse(localStorage.getItem("fakeRank"))||[];
  fake.push({name:name,score:count});

  rankMenu.classList.toggle("hidden");
  fake.sort((a,b)=>b.score-a.score);

  if(!rankMenu.classList.contains("hidden")){
    generateRanking();
  }
};
  let ul = document.getElementById("rankList");
  ul.innerHTML="";

// atualizar
function update(){
  counterEl.textContent = count;
  localStorage.setItem("count", count);
  fake.forEach((p,i)=>{
    let li=document.createElement("li");
    li.innerText = `#${i+1} ${p.name} - ${p.score}`;
    ul.appendChild(li);
  });
}

// ---------- MISSÕES ----------
function loadMissions(){
  let ul = document.getElementById("missionsList");
  ul.innerHTML="";

  let missions = [
    {txt:"Ver vídeo", xp:500, link:"https://youtu.be/JO99NJNZpkc?si=qrZS6qDkpNtnbK2P"},
    {txt:"Jogar 20 partidas", xp:100},
    {txt:"Jogar 100 partidas", xp:300}
  ];

  missions.forEach(m=>{
    let li=document.createElement("li");
    li.innerText = `${m.txt} (+${m.xp} XP)`;

    li.onclick=()=>{
      xp+=m.xp;
      if(m.link) window.open(m.link);
      update();
    };

    ul.appendChild(li);
  });
}

// ---------- META ----------
function updateMeta(){
  let goal = 100;
  document.getElementById("metaText").innerText =
    `${count}/${goal} partidas`;
}

// ---------- TOGGLES ----------
function toggle(id,load){
  let el=document.getElementById(id);
  el.classList.toggle("hidden");
  if(load) load();
}

// iniciar
checkNewDay();
toggleHistory.onclick=()=>toggle("historyMenu");
toggleRank.onclick=()=>toggle("rankMenu",loadRanking);
toggleMissions.onclick=()=>toggle("missionsMenu",loadMissions);
toggleMeta.onclick=()=>toggle("metaMenu",updateMeta);

// ---------- START ----------
checkDay();
update();
loadHistory();
updateXP();
updateMeta();