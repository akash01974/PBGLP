document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const registerBtn = document.querySelector(".register-btn");
  const loginBtn = document.querySelector(".login-btn");

  // Ensure the register form is visible if the body has 'register-active'
  // if (document.body.classList.contains("register-active")) {
  //   container.classList.add("active");
  // }

  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  });

  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });
});
// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Particle configuration
const particles = [];
const particleCount = 180;
const mouse = { x: null, y: null, radius: 150 };

class Particle {
    constructor() {
        this.reset(true);
        this.baseSize = Math.random() * 2.5 + 1.5; // Increased from 2.0 + 1
        this.alphaVariation = Math.random() * 0.4 + 0.1;
    }

    reset(initial) {
        if (!initial && Math.random() > 0.3) {
            this.x = Math.random() > 0.5 ? -30 : canvas.width + 30;
            this.y = Math.random() * canvas.height;
        } else if (!initial) {
            this.y = Math.random() > 0.5 ? -30 : canvas.height + 30;
            this.x = Math.random() * canvas.width;
        } else {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }

        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.size = this.baseSize * (Math.random() * 0.8 + 0.6); // Increased from 0.7 + 0.5
    }

    update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = mouse.radius * (this.size / 3);

        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.2;
            this.y -= Math.sin(angle) * force * 1.2;
        }

        this.x += this.speedX * (0.6 + Math.random() * 0.4);
        this.y += this.speedY * (0.6 + Math.random() * 0.4);

        if (
            this.x > canvas.width + 40 || this.x < -40 ||
            this.y > canvas.height + 40 || this.y < -40
        ) {
            if (Math.random() > 0.2) this.reset(false);
        }
    }

    draw() {
        ctx.fillStyle = `rgba(210, 210, 210, ${this.alphaVariation * (this.size / 3)})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Mouse event listener
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() > 0.90 && particles.length < 250) {
        particles.push(new Particle());
    }

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (Math.random() > 0.995 && particles.length > particleCount) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}
animate();

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const registerBtn = document.querySelector(".register-btn");
    const loginBtn = document.querySelector(".login-btn");

    registerBtn.addEventListener("click", () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
        container.classList.remove("active");
    });
});