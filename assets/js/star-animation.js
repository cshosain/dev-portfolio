const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");
let stars = [];
const STAR_COUNT = 1000;
const STAR_SIZE = 0.5;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", () => {
  resize();
  createStars();
});

if (!document.body.classList.contains("light-theme")) {
  console.log("Light theme detected, setting canvas background to white.");
  resize();
  createStars();
}

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    const z = Math.random() * 1.5 + 0.5;
    const angle = Math.random() * 2 * Math.PI;
    const speed = (Math.random() * 0.7 + 0.1) * z;
    const radius = Math.random() * Math.min(canvas.width, canvas.height) * 1.7;
    stars.push({
      angle,
      speed,
      z,
      radius,
      centerX: canvas.width / 2,
      centerY: canvas.height / 2,
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    star.angle += 0.002 * star.z * star.speed;
    const x = star.centerX + star.radius * Math.cos(star.angle);
    const y = star.centerY + star.radius * Math.sin(star.angle);

    ctx.beginPath();
    ctx.arc(x, y, STAR_SIZE * star.z, 0, 2 * Math.PI);
    ctx.fillStyle = "#fffbe29a";
    ctx.globalAlpha = 0.8 * star.z;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}
animate();
