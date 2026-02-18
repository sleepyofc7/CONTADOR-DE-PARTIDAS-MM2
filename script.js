const statusText = document.getElementById("status");
const historyList = document.getElementById("historyList");
const historyMenu = document.getElementById("historyMenu");
const toggleHistory = document.getElementById("toggleHistory");

// 🔊 som personalizado
const clickSound = new Audio("click.mp3");

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// 📊 dados
let checksToday = 0;
let lastDay = localStorage.getItem("lastDay") || new Date().getDate();

// 📅 verificar mudança de dia
function checkNewDay() {
  const today = new Date().getDate();

  if (today != lastDay) {
    saveHistory();
    checksToday = 0;
    lastDay = today;
    localStorage.setItem("lastDay", today);
    localStorage.setItem("checksToday", 0);
  }
}

// 💾 salvar histórico
function saveHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  const date = new Date().toLocaleDateString();

  history.push({
    date: date,
    checks: checksToday
  });

  localStorage.setItem("history", JSON.stringify(history));
}

// 📊 carregar histórico
function loadHistory() {
  historyList.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.reverse().forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.date} - ${item.checks} verificações`;
    historyList.appendChild(li);
  });
}

// 🔄 verificar status (simulação)
function checkStatus() {
  playClick();

  checkNewDay();

  const online = Math.random() > 0.5;

  statusText.textContent = online ? "Online 🟢" : "Offline 🔴";

  checksToday++;
  localStorage.setItem("checksToday", checksToday);
}

// 📊 botão abrir/fechar histórico
toggleHistory.addEventListener("click", () => {
  playClick();

  historyMenu.classList.toggle("hidden");

  if (!historyMenu.classList.contains("hidden")) {
    loadHistory();
  }
});

// carregar ao iniciar
checksToday = parseInt(localStorage.getItem("checksToday")) || 0;
loadHistory();
