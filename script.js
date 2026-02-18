const counterEl = document.getElementById("counter");
const historyList = document.getElementById("historyList");
const historyMenu = document.getElementById("historyMenu");

const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const toggleHistory = document.getElementById("toggleHistory");

// 🔊 som
const clickSound = new Audio("click.mp3");

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// 📊 dados
let count = parseInt(localStorage.getItem("count")) || 0;
let lastDay = localStorage.getItem("lastDay") || new Date().getDate();

// 📅 verifica mudança de dia
function checkNewDay() {
  const today = new Date().getDate();

  if (today != lastDay) {
    saveHistory();
    count = 0;

    lastDay = today;
    localStorage.setItem("lastDay", today);
    localStorage.setItem("count", count);
  }
}

// 💾 salvar histórico
function saveHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  const date = new Date().toLocaleDateString();

  history.push({
    date: date,
    matches: count
  });

  localStorage.setItem("history", JSON.stringify(history));
}

// 📊 carregar histórico
function loadHistory() {
  historyList.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.reverse().forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.date} - ${item.matches} partidas`;
    historyList.appendChild(li);
  });
}

// ➕ adicionar partida
addBtn.onclick = () => {
  playClick();

  checkNewDay();

  count++;
  counterEl.textContent = count;

  localStorage.setItem("count", count);
};

// 🔄 reset manual
resetBtn.onclick = () => {
  playClick();

  if (confirm("Resetar o dia atual?")) {
    saveHistory();
    count = 0;
    counterEl.textContent = count;
    localStorage.setItem("count", count);
  }
};

// 📊 abrir/fechar histórico
toggleHistory.onclick = () => {
  playClick();

  historyMenu.classList.toggle("hidden");

  if (!historyMenu.classList.contains("hidden")) {
    loadHistory();
  }
};

// iniciar
checkNewDay();
counterEl.textContent = count;
loadHistory();
