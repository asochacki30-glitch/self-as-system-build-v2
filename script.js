const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

let currentMouseX = canvas.width / 2;
let currentMouseY = canvas.height / 2;
let lastMouseX = currentMouseX;
let lastMouseY = currentMouseY;
let prevMouseX = currentMouseX;
let prevMouseY = currentMouseY;

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  currentMouseX = event.clientX - rect.left;
  currentMouseY = event.clientY - rect.top;
});

let smoothedSpeed = 0;

// One clean threshold — below it you're "building," at or above it
// you're "dissolving." No more separate slow/fast range with a gap.
const speedThreshold = 8;

function drawVignette() {
  const gradient = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 100,
    canvas.width / 2, canvas.height / 2, 420
  );
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, "rgba(0,0,0,0.9)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function loop() {
  const dx = currentMouseX - lastMouseX;
  const dy = currentMouseY - lastMouseY;
  const rawSpeed = Math.sqrt(dx * dx + dy * dy);
  smoothedSpeed += (rawSpeed - smoothedSpeed) * 0.2;

  // The one state shift: below threshold, old marks fade very
  // slowly (drawing builds up). At or above it, fade jumps way up,
  // so the drawing dissolves quickly. Same fade mechanism as v1 —
  // just doing more work now that the shatter rule is gone.
  const fadeRate = smoothedSpeed < speedThreshold ? 0.02 : 0.35;
  ctx.fillStyle = `rgba(10, 14, 26, ${fadeRate})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Only draw a new curve segment while below the threshold
  if (rawSpeed > 0.3 && smoothedSpeed < speedThreshold) {
    const midX = (lastMouseX + currentMouseX) / 2;
    const midY = (lastMouseY + currentMouseY) / 2;

    ctx.strokeStyle = "rgba(170, 205, 255, 0.55)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastMouseX, lastMouseY);
    ctx.quadraticCurveTo(prevMouseX, prevMouseY, midX, midY);
    ctx.stroke();

    if (Math.random() < 0.12) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(150, 195, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.arc(currentMouseX, currentMouseY, 4 + Math.random() * 12, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  drawVignette();

  prevMouseX = lastMouseX;
  prevMouseY = lastMouseY;
  lastMouseX = currentMouseX;
  lastMouseY = currentMouseY;

  requestAnimationFrame(loop);
}

loop();