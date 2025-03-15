// Enhanced Matrix Animation
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = new Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add bright characters randomly
    if(Math.random() > 0.97) {
        ctx.fillStyle = '#0f5';
    } else {
        ctx.fillStyle = '#0f0';
    }
    
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((drop, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drop * fontSize);
        
        if(drop * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    });
}

// Initialize Matrix
const matrixInterval = setInterval(drawMatrix, 50);

// Card Interaction
document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${-y/20}deg)
            rotateY(${x/20}deg)
            scale(1.05)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Window Resize Handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Project Card Hover
document.querySelectorAll('.project-card').forEach(project => {
    project.addEventListener('mousemove', (e) => {
        const rect = project.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        project.style.transform = `
            perspective(1000px)
            rotateX(${(rect.height/2 - y)/20}deg)
            rotateY(${(x - rect.width/2)/20}deg)
        `;
    });

    project.addEventListener('mouseleave', () => {
        project.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});