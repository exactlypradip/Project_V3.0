// --- OPTIMIZED TOUCH AND MOUSE INTERACTION FIX FOR MOBILE ---
let isTicking = false;

function handleInteraction(e) {
    if (isTicking) return;

    window.requestAnimationFrame(() => {
        const isTouch = e.touches ? true : false;
        const posX = isTouch ? e.touches[0].clientX : e.clientX;
        const posY = isTouch ? e.touches[0].clientY : e.clientY;

        // Interactive Parallax Background Math
        document.querySelectorAll('.glowing-orb').forEach((orb, index) => {
            const speed = (index + 1) * 3;
            const x = (window.innerWidth - posX * speed) / 100;
            const y = (window.innerHeight - posY * speed) / 100;
            orb.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });

        // Magnetic Button Effect (Disabled on touch for performance)
        if (!isTouch) {
            document.querySelectorAll('.magnetic-btn').forEach(btn => {
                if (btn.closest('.page').classList.contains('active')) {
                    const rect = btn.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    
                    const distanceX = posX - centerX;
                    const distanceY = posY - centerY;
                    
                    if (Math.abs(distanceX) < 100 && Math.abs(distanceY) < 100) {
                        btn.style.transform = `translate(${distanceX * 0.2}px, ${distanceY * 0.2}px) scale(1.1)`;
                    } else {
                        btn.style.transform = '';
                    }
                }
            });

            // Handle Sparkle Cursor Trail (Disabled on touch for performance)
            if (!e.target.closest('.soft-cute-title') && Math.random() > 0.3) { 
                const heart = document.createElement('div');
                heart.classList.add('trail-heart');
                const trailEmojis = ['💖', '✨', '🌸', '💝', '🎀', '⭐'];
                heart.innerHTML = trailEmojis[Math.floor(Math.random() * trailEmojis.length)];
                heart.style.left = posX + 'px';
                heart.style.top = posY + 'px';
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 1200);
            }
        }
        isTicking = false;
    });
    
    isTicking = true;
}

window.addEventListener('mousemove', handleInteraction);
window.addEventListener('touchmove', handleInteraction, { passive: true });

// --- Background Magic Setup ---
function initBackgroundOrbs() {
    const orbContainer = document.getElementById('orb-container');
    const colors = ['#ffc3a0', '#ffafbd', '#fecfef', '#e0c3fc'];
    
    for(let i = 0; i < 6; i++) {
        let orb = document.createElement('div');
        orb.classList.add('glowing-orb');
        let size = Math.random() * 300 + 200; 
        orb.style.width = size + 'px';
        orb.style.height = size + 'px';
        orb.style.background = colors[i % colors.length];
        orb.style.left = `${Math.random() * 90}vw`;
        orb.style.top = `${Math.random() * 90}vh`;
        orbContainer.appendChild(orb);
    }

    // Start Sakura Falling
    setInterval(createSakura, window.innerWidth < 600 ? 800 : 400); // Slower on mobile
}
initBackgroundOrbs();

function createSakura() {
    const container = document.getElementById('particles-container');
    const sakura = document.createElement('div');
    sakura.classList.add('sakura-petal');
    const items = ['🌸', '💮', '🎀', '💕', '✨'];
    sakura.innerText = items[Math.floor(Math.random() * items.length)];
    
    sakura.style.left = Math.random() * 100 + 'vw';
    sakura.style.fontSize = (Math.random() * 15 + 15) + 'px';
    sakura.style.animationDuration = (Math.random() * 4 + 5) + 's';
    
    container.appendChild(sakura);
    setTimeout(() => sakura.remove(), 9000);
}

// --- Interactive Click Burst ---
document.addEventListener('click', (e) => {
    if (e.target.closest('.cute-box') || e.target.tagName === 'BUTTON' || e.target.closest('.magic-gift-container') || e.target.closest('.soft-cute-title')) return;

    const emojis = ['🌸', '💖', '🎀', '✨', '💕'];
    const burstCount = window.innerWidth < 600 ? 3 : 6; // Less particles on mobile
    
    for (let i = 0; i < burstCount; i++) {
        let burst = document.createElement('div');
        burst.classList.add('mini-burst-particle');
        burst.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        const angle = (Math.PI * 2 * i) / burstCount;
        const velocity = 50 + Math.random() * 40;
        burst.style.setProperty('--tx', `${Math.cos(angle) * velocity}px`);
        burst.style.setProperty('--ty', `${Math.sin(angle) * velocity}px`);
        
        burst.style.left = e.clientX + 'px';
        burst.style.top = e.clientY + 'px';
        burst.style.fontSize = (Math.random() * 12 + 15) + 'px';
        burst.style.animationDuration = '0.6s';
        
        document.body.appendChild(burst);
        setTimeout(() => burst.remove(), 600); 
    }
});

function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active');

    if (pageId === 'page-final') setTimeout(startMegaShower, 400); 
}

// --- SUPER MAGIC GIFT EXPLOSION ---
function openMagicGift(e) {
    const gift = document.getElementById('the-gift');
    if(gift.classList.contains('heart-super-explode')) return; 
    
    document.getElementById('tap-instruction').style.display = 'none';
    
    const rect = gift.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    triggerSuperBurst(centerX, centerY);
    
    gift.classList.remove('bounce');
    gift.classList.remove('heartbeat-fast');
    gift.classList.add('heart-super-explode');
    
    startParticleShower('magic'); 
    
    setTimeout(() => {
        gift.innerHTML = '🌸👑🎀'; 
        gift.classList.remove('heart-super-explode');
        gift.classList.add('revealed-emojis');
        
        document.getElementById('type-yes-1').classList.remove('hidden');
        
        typeText('type-yes-1', "You make the world a more beautiful place just by being in it 💕✨", 40, () => {
            
            const specialText = document.getElementById('special-womens-day');
            specialText.classList.remove('hidden');
            
            const textRect = specialText.getBoundingClientRect();
            triggerMiniBurst(textRect.left + textRect.width / 2, textRect.top + textRect.height / 2, 'magic', false);

            setTimeout(() => {
                document.getElementById('type-yes-2').classList.remove('hidden');
                typeText('type-yes-2', "I prepared a few tiny secret gifts to make you smile today 🧸💖", 35, () => {
                    document.getElementById('btn-see-gifts').classList.remove('hidden');
                });
            }, 1200);

        });
    }, 600); 
}

function triggerSuperBurst(x, y) {
    const wave = document.createElement('div');
    wave.classList.add('super-shockwave');
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    document.body.appendChild(wave);
    setTimeout(() => wave.remove(), 800);

    const emojis = ['💖', '✨', '🌸', '🎀', '💕', '💝', '🌷'];
    const particleCount = window.innerWidth < 600 ? 25 : 50; // Optimized for mobile
    
    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('super-burst-particle');
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        const angle = (Math.PI * 2 * i) / particleCount; 
        const velocity = 180 + Math.random() * 250; 
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.fontSize = `${Math.random() * 25 + 15}px`;
        particle.style.animationDuration = `${0.7 + Math.random() * 0.5}s`;

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1200);
    }
}

function spawnGentleSparkle(e) {
    if (window.innerWidth < 600) return; // Disabled on mobile to save frames
    if (Math.random() > 0.2) return; 
    
    const posX = e.touches ? e.touches[0].clientX : e.clientX;
    const posY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const sparkle = document.createElement('div');
    const emojis = ['✨', '💖', '🌸', '🧸', '🎀'];
    sparkle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${posX + (Math.random() * 40 - 20)}px`;
    sparkle.style.top = `${posY + (Math.random() * 40 - 20)}px`;
    sparkle.style.fontSize = `${Math.random() * 12 + 10}px`;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.transition = 'all 1.2s ease-out';
    sparkle.style.opacity = '1';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.style.transform = `translateY(-50px) scale(0.5) rotate(${Math.random() * 90}deg)`;
        sparkle.style.opacity = '0';
    }, 20);
    
    setTimeout(() => sparkle.remove(), 1200);
}

function handleBurstGift(cardElement, giftType) {
    if (cardElement.classList.contains('wobbling')) return;
    cardElement.classList.add('wobbling');

    cardElement.classList.add('wobble-anticipate');

    setTimeout(() => {
        cardElement.classList.remove('wobble-anticipate');
        cardElement.classList.add('pop-away');
        
        const rect = cardElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        triggerMiniBurst(centerX, centerY, giftType, true); 

        setTimeout(() => {
            openGift(giftType);
            
            setTimeout(() => {
                cardElement.classList.remove('wobbling', 'pop-away');
            }, 500);
        }, 300); 
        
    }, 600); 
}

function triggerMiniBurst(x, y, type, isBig = false) {
    let emojis = ['✨', '💖', '🫧'];
    if (type === 'flower') emojis = ['🌸', '🌺', '🌷', '✨', '🎀'];
    else if (type === 'chocolate') emojis = ['🍫', '🍰', '🍓', '✨'];
    else if (type === 'message') emojis = ['💌', '💝', '📝', '✨'];
    else if (type === 'compliment') emojis = ['🧸', '💖', '🎀', '✨'];
    else if (type === 'magic') emojis = ['🌸', '✨', '💖', '🦋', '🎀']; 

    let baseCount = isBig ? 30 : 15; 
    const particleCount = window.innerWidth < 600 ? Math.floor(baseCount * 0.5) : baseCount;
    
    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('mini-burst-particle');
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = isBig ? (90 + Math.random() * 120) : (50 + Math.random() * 70); 
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.fontSize = `${Math.random() * 15 + 15}px`;
        particle.style.animationDuration = `${0.5 + Math.random() * 0.4}s`;

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 900);
    }
}

function openGift(giftType) {
    goToPage(`page-${giftType}`);
    startParticleShower(giftType);
    
    if (giftType === 'flower') {
        typeText('type-flower', "You deserve all the happiness, respect,\nand a life full of beautiful moments 🌸🦋");
    } else if (giftType === 'chocolate') {
        typeText('type-chocolate', "A small sweet wish for your day 🍓🍰\nStay sweet!");
    } else if (giftType === 'message') {
        typeText('type-message', "May your life always be filled with joy,\nsuccess, and peaceful moments 💌✨");
    } else if (giftType === 'compliment') {
        typeText('type-compliment', "You are so much stronger and more special\nthan you probably realize 🧸💖");
    }
}

function typeText(elementId, text, speed = 50, callback = null) {
    const el = document.getElementById(elementId);
    el.innerHTML = ''; 
    let i = 0;
    
    function type() {
        if (i < text.length) {
            el.innerHTML = text.substring(0, i + 1) + '<span class="text-cursor"></span>';
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                const cursor = el.querySelector('.text-cursor');
                if(cursor) cursor.remove(); 
                if (callback) callback();
            }, 800);
        }
    }
    type();
}

function startParticleShower(type) {
    let emojiArray = ['💖'];
    if (type === 'magic') emojiArray = ['🌸', '✨', '💖', '🦋', '🧸', '🩷'];
    else if (type === 'flower') emojiArray = ['🌸', '🌺', '🌷', '🎀'];
    else if (type === 'chocolate') emojiArray = ['🍫', '🍩', '🍓', '🍰'];
    
    let count = 0;
    let maxCount = window.innerWidth < 600 ? 20 : 45;
    let intervalTime = window.innerWidth < 600 ? 80 : 40;

    let interval = setInterval(() => {
        let emoji = emojiArray[Math.floor(Math.random() * emojiArray.length)];
        
        let p = document.createElement('div');
        p.classList.add('sakura-petal');
        p.innerText = emoji;
        p.style.left = Math.random() * 100 + 'vw';
        p.style.fontSize = (Math.random() * 20 + 20) + 'px';
        p.style.animationDuration = (Math.random() * 3 + 3) + 's'; 
        document.getElementById('particles-container').appendChild(p);
        setTimeout(() => p.remove(), 6000);
        
        count++;
        if(count > maxCount) clearInterval(interval);
    }, intervalTime);
}

function startMegaShower() {
    let count = 0;
    let maxCount = window.innerWidth < 600 ? 40 : 100;
    let intervalTime = window.innerWidth < 600 ? 60 : 30;

    let interval = setInterval(() => {
        const magicEmojis = ['🌸', '✨', '💖', '🦋', '👑', '🎀', '🌷', '🩷'];
        
        let p = document.createElement('div');
        p.classList.add('sakura-petal');
        p.innerText = magicEmojis[Math.floor(Math.random() * magicEmojis.length)];
        p.style.left = Math.random() * 100 + 'vw';
        p.style.fontSize = (Math.random() * 25 + 20) + 'px';
        p.style.animationDuration = (Math.random() * 3 + 4) + 's'; 
        document.getElementById('particles-container').appendChild(p);
        setTimeout(() => p.remove(), 7000);
        
        count++;
        if(count > maxCount) clearInterval(interval);
    }, intervalTime); 
}

function shootConfetti() {
    startMegaShower();
    const crown = document.getElementById('magic-crown');
    crown.classList.remove('heartbeat-slow');
    crown.style.transform = 'scale(0.7) rotate(-20deg)';
    
    setTimeout(() => {
        crown.style.transform = 'scale(1.5) rotate(20deg)';
        setTimeout(() => {
            crown.classList.add('heartbeat-slow');
            crown.style.transform = '';
        }, 300);
    }, 150);
}