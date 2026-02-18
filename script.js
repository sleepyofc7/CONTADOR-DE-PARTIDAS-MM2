// ---------- LOGIN ----------
let name = localStorage.getItem("name");

function saveName(){
  name = document.getElementById("nameInput").value;
  if(!name) return;

  localStorage.setItem("name", name);
  start();
}

if(name) start();

function start(){
  document.getElementById("loginBox").style.display="none";
  document.getElementById("app").style.display="block";
  updatePlayerInfo();
}

// ---------- SOM ----------
const clickSound = new Audio("click.mp3");
let soundOn = localStorage.getItem("sound") !== "off";

function playClick(){
  if(soundOn){
    clickSound.currentTime=0;
    clickSound.play();
  }
}

document.getElementById("soundToggle").onclick=()=>{
  soundOn=!soundOn;
  localStorage.setItem("sound",soundOn?"on":"off");
};

// ---------- DADOS ----------
let count = parseInt(localStorage.getItem("count")) || 0;
let xp = parseInt(localStorage.getItem("xp")) || 0;
let lastLogin = localStorage.getItem("loginDay");

// ---------- RESET DIÁRIO ----------
function checkDay(){
  let today = new Date().toLocaleDateString();

  if(lastLogin !== today){
    xp += 1000; // login reward
    localStorage.setItem("loginDay",today);

    randomizeRanking();
  }
}

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

  return current;
}

// ---------- XP BAR ----------
function updateXP(){
  let current = getRank();
  let next = ranks[ranks.indexOf(current)+1];

  if(!next) return;

  let progress = (xp - current.xp)/(next.xp-current.xp)*100;

  document.getElementById("xpFill").style.width = progress+"%";
}

// ---------- INFO ----------
function updatePlayerInfo(){
  let r = getRank();
  document.getElementById("playerInfo").innerText =
    `${r.icon} ${name} - ${r.name} (${xp} XP)`;
}

// ---------- BOTÕES ----------
document.getElementById("addBtn").onclick=()=>{
  count++;
  xp+=10;
  update();
};

document.getElementById("minusBtn").onclick=()=>{
  if(count>0){
    count--;
    update();
  }
};

document.getElementById("resetBtn").onclick=()=>{
  count=0;
  update();
};

function update(){
  document.getElementById("counter").innerText = count;
  localStorage.setItem("count",count);
  localStorage.setItem("xp",xp);

  updateXP();
  updatePlayerInfo();
}

// ---------- HISTÓRICO ----------
function saveHistory(){
  let h = JSON.parse(localStorage.getItem("history"))||[];

  h.push({date:new Date().toLocaleDateString(),count});
  localStorage.setItem("history",JSON.stringify(h));
}

// ---------- RANK FAKE ----------
function randomizeRanking(){
  let fake = [
    {name:"Shadow"},
    {name:"Ghost"},
    {name:"Ninja"},
    {name:"Speed"}
  ];

  fake.forEach(p=>{
    p.score = Math.floor(Math.random()*1000)+10;
  });

  localStorage.setItem("fakeRank",JSON.stringify(fake));
}

function loadRanking(){
  let fake = JSON.parse(localStorage.getItem("fakeRank"))||[];
  fake.push({name:name,score:count});

  fake.sort((a,b)=>b.score-a.score);

  let ul = document.getElementById("rankList");
  ul.innerHTML="";

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

toggleHistory.onclick=()=>toggle("historyMenu");
toggleRank.onclick=()=>toggle("rankMenu",loadRanking);
toggleMissions.onclick=()=>toggle("missionsMenu",loadMissions);
toggleMeta.onclick=()=>toggle("metaMenu",updateMeta);

// ---------- START ----------
checkDay();
update();
updateXP();
updateMeta();
