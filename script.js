document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("particles");
  if (!canvas) {
    console.warn("No #particles canvas found. Add <canvas id='particles'></canvas> to index.html");
    return;
  }

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = [];
  const COUNT = 140;

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.3,
      vy: Math.random() * 0.6 + 0.1,
      tw: Math.random() * 0.6 + 0.2
    });
  }

  function tick(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // soft sparkle
    for (const p of particles) {
      const alpha = 0.35 + 0.35 * Math.sin(t / 700 + p.tw);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.y -= p.vy;
      if (p.y < -5) {
        p.y = canvas.height + 5;
        p.x = Math.random() * canvas.width;
      }
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
});