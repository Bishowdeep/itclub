// Matrix Background
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01';
const fontSize = 14;
const columns = canvas.width/fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    drops.forEach((drop, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i*fontSize, drop*fontSize);
        if(drop*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}

setInterval(drawMatrix, 50);

// Window Resize Handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Card Interaction
document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${(rect.height/2 - y)/10}deg)
            rotateY(${(x - rect.width/2)/10}deg)
            scale(1.05)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});