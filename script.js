// -------------------- MENU MOBILE --------------------
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// -------------------- REVEAL --------------------
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);

// -------------------- CONTADOR DE ALUNOS --------------------
let countAlunos = 0;
const alunos = document.getElementById("alunos");
let alunosContado = false;

function contadorAlunos() {
  if (countAlunos < 500) {
    countAlunos++;
    alunos.textContent = countAlunos;
    setTimeout(contadorAlunos, 15);
  }
}

window.addEventListener("scroll", () => {
  const section = document.querySelector(".alunos");
  const sectionTop = section.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  if (sectionTop < windowHeight && !alunosContado) {
    alunosContado = true;
    contadorAlunos();
  }
});

// -------------------- BARRA DE FORÇA --------------------
let barrasAnimadas = false;

function animarBarras() {
  const barras = document.querySelectorAll(".barra-forca div");
  barras.forEach(bar => {
    const valor = 70 + Math.random() * 30;
    bar.style.width = valor + "%";
  });
}

window.addEventListener("scroll", () => {
  const treinos = document.querySelector(".treinos");
  const treinosTop = treinos.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  if (treinosTop < windowHeight && !barrasAnimadas) {
    barrasAnimadas = true;
    animarBarras();
  }
});

// -------------------- CALCULADORA IMC --------------------
document.getElementById("calcular").addEventListener("click", () => {
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  if (!peso || !altura) {
    alert("Preencha todos os campos!");
    return;
  }
  const imc = peso / (altura * altura);
  document.getElementById("resultado").textContent = "Seu IMC é: " + imc.toFixed(2);
});

// -------------------- FUMAÇA REALISTA --------------------
const canvas = document.getElementById("canvasFumaca");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];
const numParticles = 80;
for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 20 + Math.random() * 30,
    speedX: -0.2 + Math.random() * 0.4,
    speedY: -0.5 - Math.random() * 0.5,
    opacity: 0.05 + Math.random() * 0.1
  });
}

function drawFumaca() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    const gradient = ctx.createRadialGradient(p.x, p.y, p.radius * 0.1, p.x, p.y, p.radius);
    gradient.addColorStop(0, "rgba(255,255,255," + p.opacity + ")");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.y + p.radius < 0 || p.x + p.radius < 0 || p.x - p.radius > canvas.width) {
      p.x = Math.random() * canvas.width;
      p.y = canvas.height + Math.random() * 100;
    }
  });
  requestAnimationFrame(drawFumaca);
}
drawFumaca();

// -------------------- LIGHTBOX GALERIA --------------------
const galeriaImgs = document.querySelectorAll(".galeria-container img");

// Cria lightbox
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");
document.body.appendChild(lightbox);

const lightboxImg = document.createElement("img");
lightbox.appendChild(lightboxImg);

// Abrir lightbox ao clicar na imagem
galeriaImgs.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

// Fechar lightbox ao clicar fora da imagem
lightbox.addEventListener("click", e => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = "none";
  }
});