// Menu hamburger
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Fermer le menu au clic sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Play video on hover (desktop) and toggle on tap (mobile)
        document.querySelectorAll('video.project-video').forEach(video => {
            // Ensure muted so autoplay on hover is allowed
            video.muted = true;

            video.addEventListener('mouseenter', () => {
                // try/catch for browsers that block play
                video.play().catch(() => {});
            });

            video.addEventListener('mouseleave', () => {
                try { video.pause(); video.currentTime = 0; } catch(e) {}
            });

            // On mobile, allow tap to toggle play/pause
            video.addEventListener('click', () => {
                if (video.paused) { video.play().catch(() => {}); }
                else { video.pause(); }
            });
        });
    }
});

// Animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les cartes et sections
document.querySelectorAll('.card, .skill-item, .path-card, .detail-card').forEach(el => {
    observer.observe(el);
});

// Background blobs movement (random subtle motion)
(function animateBlobs(){
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const root = hero; // set CSS vars on hero for scoping

    function rand(min, max){ return Math.random() * (max - min) + min; }

    function randomColor(baseR, baseG, baseB, alpha){
        // Slight hue variation
        const r = Math.round(Math.min(255, Math.max(0, baseR + (rand(-20,20)))));
        const g = Math.round(Math.min(255, Math.max(0, baseG + (rand(-20,20)))));
        const b = Math.round(Math.min(255, Math.max(0, baseB + (rand(-20,20)))));
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function step(){
        // translate values (px)
        const tx1 = Math.round(rand(-120, 60)) + 'px';
        const ty1 = Math.round(rand(-60, 60)) + 'px';
        const tx2 = Math.round(rand(-80, 80)) + 'px';
        const ty2 = Math.round(rand(-40, 80)) + 'px';

        // colors
        const c1 = randomColor(99,102,241, rand(0.15,0.4));
        const c2 = randomColor(139,92,246, rand(0.12,0.32));

        root.style.setProperty('--c1-tx', tx1);
        root.style.setProperty('--c1-ty', ty1);
        root.style.setProperty('--c2-tx', tx2);
        root.style.setProperty('--c2-ty', ty2);

        root.style.setProperty('--c1-color', c1);
        root.style.setProperty('--c2-color', c2);
    }

    // initial
    step();
    // repeat
    setInterval(step, 3500);
})();
