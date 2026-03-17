/* ═══════════════════════════════════════════════════════════════
   GRID Agency — Premium Effects Engine
   GSAP-powered animations, micro-interactions, and polish
   Dependencies: GSAP 3 + ScrollTrigger, Vanilla Tilt (all CDN)
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const IS_MOBILE = window.innerWidth < 768;

    /* ─────────────────────────────────────
       LOADING SCREEN
       ─────────────────────────────────────  */
    function initLoadingScreen() {
        const screen = document.querySelector('.loading-screen');
        if (!screen) return;
        if (REDUCED) { screen.classList.add('done'); return; }

        const logo = screen.querySelector('.loading-logo');
        const tl = gsap.timeline();
        tl.fromTo(logo,
            { opacity: 0, scale: 0.7, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        )
        .to(logo, { opacity: 0, scale: 1.15, duration: 0.35, delay: 0.4, ease: 'power2.in' })
        .to(screen, {
            yPercent: -100,
            duration: 0.7,
            ease: 'power4.inOut',
            onComplete: () => screen.classList.add('done')
        }, '-=0.1');
    }

    /* ─────────────────────────────────────
       HERO TEXT REVEAL (staggered words)
       ─────────────────────────────────────  */
    function initHeroTextReveal() {
        if (REDUCED) return;
        const words = document.querySelectorAll('.hero-word');
        const sub = document.querySelector('.hero-subtext');
        const cta = document.querySelector('.hero-cta');
        const delay = document.querySelector('.loading-screen') ? 1.6 : 0.2;

        if (words.length) {
            gsap.fromTo(words,
                { opacity: 0, y: 70, rotateX: -20 },
                { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.18, ease: 'power3.out', delay }
            );
        }
        if (sub) {
            gsap.fromTo(sub,
                { opacity: 0, y: 35 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: delay + 0.6 }
            );
        }
        if (cta) {
            gsap.fromTo(cta,
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: delay + 1.0 }
            );
        }
    }

    /* ─────────────────────────────────────
       GRADIENT MESH BLOBS (slow morph)
       ─────────────────────────────────────  */
    function initGradientMesh() {
        if (REDUCED) return;
        const blobs = document.querySelectorAll('.gradient-mesh .blob');
        blobs.forEach((blob, i) => {
            gsap.to(blob, {
                x: 'random(-80, 80)',
                y: 'random(-80, 80)',
                scale: 'random(0.8, 1.3)',
                duration: 'random(7, 12)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 2,
            });
        });
    }

    /* ─────────────────────────────────────
       CURSOR PARALLAX (hero elements)
       ─────────────────────────────────────  */
    function initCursorParallax() {
        if (IS_MOBILE || REDUCED) return;
        const els = document.querySelectorAll('[data-parallax]');
        if (!els.length) return;

        document.addEventListener('mousemove', (e) => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            els.forEach(el => {
                const s = parseFloat(el.dataset.parallax) || 20;
                gsap.to(el, { x: nx * s, y: ny * s, duration: 1, ease: 'power2.out' });
            });
        });
    }

    /* ─────────────────────────────────────
       SCROLL REVEAL (IntersectionObserver)
       ─────────────────────────────────────  */
    function initScrollReveal() {
        const items = document.querySelectorAll('.reveal-up, .reveal-scale');
        if (REDUCED) { items.forEach(el => el.classList.add('revealed')); return; }

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        items.forEach(el => obs.observe(el));
    }

    /* ─────────────────────────────────────
       STAGGER CHILDREN (auto-index)
       ─────────────────────────────────────  */
    function initStaggerChildren() {
        document.querySelectorAll('.stagger-children').forEach(c => {
            Array.from(c.children).forEach((child, i) => {
                child.style.setProperty('--i', i);
                if (!child.classList.contains('reveal-up') && !child.classList.contains('reveal-scale')) {
                    child.classList.add('reveal-up');
                }
            });
        });
    }

    /* ─────────────────────────────────────
       HEADING UNDERLINE DRAW ON SCROLL
       ─────────────────────────────────────  */
    function initHeadingUnderlines() {
        const heads = document.querySelectorAll('.heading-underline');
        if (REDUCED) { heads.forEach(h => h.classList.add('in-view')); return; }

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
            });
        }, { threshold: 0.5 });
        heads.forEach(h => obs.observe(h));
    }

    /* ─────────────────────────────────────
       COUNTER ANIMATION
       ─────────────────────────────────────  */
    function initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const el = e.target;
                const target = parseInt(el.dataset.count);
                const prefix = el.dataset.prefix || '';
                const suffix = el.dataset.suffix || '';

                if (REDUCED) { el.textContent = prefix + target + suffix; obs.unobserve(el); return; }

                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2.2,
                    ease: 'power2.out',
                    onUpdate: () => { el.textContent = prefix + Math.round(obj.val) + suffix; }
                });
                obs.unobserve(el);
            });
        }, { threshold: 0.5 });
        counters.forEach(c => obs.observe(c));
    }

    /* ─────────────────────────────────────
       MAGNETIC BUTTONS
       ─────────────────────────────────────  */
    function initMagneticButtons() {
        if (IS_MOBILE || REDUCED) return;
        document.querySelectorAll('.magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const r = btn.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
            });
        });
    }

    /* ─────────────────────────────────────
       FLOATING PARTICLES (Canvas)
       ─────────────────────────────────────  */
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas || REDUCED) { if (canvas) canvas.remove(); return; }

        const ctx = canvas.getContext('2d');
        const count = IS_MOBILE ? 25 : 50;
        let particles = [];

        function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        resize();
        window.addEventListener('resize', resize);

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                size: Math.random() * 1.8 + 0.4,
                alpha: Math.random() * 0.4 + 0.1,
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59,131,247,' + p.alpha + ')';
                ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    /* ─────────────────────────────────────
       GLOW ORB (follows scroll + cursor)
       ─────────────────────────────────────  */
    function initGlowOrb() {
        const orb = document.querySelector('.glow-orb');
        if (!orb || REDUCED) { if (orb) orb.remove(); return; }

        let sy = 0;
        window.addEventListener('scroll', () => {
            sy = window.scrollY;
            gsap.to(orb, { y: sy * 0.25, duration: 0.6, ease: 'power2.out' });
        }, { passive: true });

        if (!IS_MOBILE) {
            document.addEventListener('mousemove', (e) => {
                gsap.to(orb, {
                    x: e.clientX - 175,
                    y: e.clientY + sy * 0.25 - 175,
                    duration: 1.2,
                    ease: 'power2.out',
                });
            });
        }
    }

    /* ─────────────────────────────────────
       VANILLA TILT CARDS
       ─────────────────────────────────────  */
    function initTiltCards() {
        if (IS_MOBILE || REDUCED || typeof VanillaTilt === 'undefined') return;
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 6,
            speed: 400,
            glare: true,
            'max-glare': 0.12,
            scale: 1.02,
        });
    }

    /* ─────────────────────────────────────
       SMOOTH SECTION TRANSITIONS (GSAP ScrollTrigger)
       ─────────────────────────────────────  */
    function initScrollTrigger() {
        if (REDUCED || typeof ScrollTrigger === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        // Parallax on featured project images
        document.querySelectorAll('.featured-project-img').forEach(img => {
            gsap.to(img, {
                yPercent: -15,
                ease: 'none',
                scrollTrigger: { trigger: img.closest('section') || img, start: 'top bottom', end: 'bottom top', scrub: 1 }
            });
        });

        // Gradient mesh intensifies on scroll
        const mesh = document.querySelector('.gradient-mesh');
        if (mesh) {
            gsap.to(mesh, {
                opacity: 0.6,
                scrollTrigger: { trigger: mesh, start: 'top top', end: 'bottom top', scrub: 1 }
            });
        }
    }

    /* ─────────────────────────────────────
       INITIALIZE EVERYTHING
       ─────────────────────────────────────  */
    function boot() {
        initLoadingScreen();
        initStaggerChildren();
        initScrollReveal();
        initHeadingUnderlines();
        initCounters();
        initGradientMesh();
        initCursorParallax();
        initMagneticButtons();
        initParticles();
        initGlowOrb();
        initTiltCards();
        initScrollTrigger();
        initHeroTextReveal();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
