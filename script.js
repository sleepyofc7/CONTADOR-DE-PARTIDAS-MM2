const counterEl = document.getElementById("counter");
const historyList = document.getElementById("historyList");
const historyMenu = document.getElementById("historyMenu");

const addBtn = document.getElementById("addBtn");
const minusBtn = document.getElementById("minusBtn");
const resetBtn = document.getElementById("resetBtn");

const toggleHistory = document.getElementById("toggleHistory");
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

// 📅 verifica mudança de dia (BR)
function checkNewDay() {
  const now = new Date().toLocaleDateString("pt-BR");

  if (lastDate !== now) {
    if (lastDate !== null) {
      saveHistory();
    }

    count = 0;
    lastDate = now;

    localStorage.setItem("lastDate", now);
    localStorage.setItem("count", count);
  }
}

// 💾 salvar histórico
function saveHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.push({
    date: lastDate,
    matches: count
  });

  localStorage.setItem("history", JSON.stringify(history));
}

// 📊 carregar histórico
function loadHistory() {
  historyList.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.slice().reverse().forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.date} - ${item.matches} partidas`;
    historyList.appendChild(li);
  });
}

// ➕ adicionar
addBtn.onclick = () => {
  playClick();
  checkNewDay();

  count++;
  update();
};

// ➖ diminuir
minusBtn.onclick = () => {
  playClick();
  checkNewDay();

  if (count > 0) {
    count--;
    update();
  }
};

// 🔄 reset
resetBtn.onclick = () => {
  playClick();

  if (confirm("Resetar o dia atual?")) {
    saveHistory();
    count = 0;
    update();
  }
};

// 🔊 toggle som
soundToggle.onclick = () => {
  soundOn = !soundOn;
  localStorage.setItem("sound", soundOn ? "on" : "off");
  updateSoundIcon();
};

// 📊 abrir histórico
toggleHistory.onclick = () => {
  playClick();

  historyMenu.classList.toggle("hidden");

  if (!historyMenu.classList.contains("hidden")) {
    loadHistory();
  }
};

// atualizar UI
function update() {
  counterEl.textContent = count;
  localStorage.setItem("count", count);
}

// iniciar
checkNewDay();
update();
loadHistory();
