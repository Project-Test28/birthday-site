// ==================== Canvas Setup for Pink Rain ====================
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// تقليل عدد الحروف لتحسين الأداء
const letters = ['❤️', '🎂', '✨', '🌟', '💕', '💖', '💗'];
const drops = [];
const DROP_COUNT = 60;

class Drop {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.letter = letters[Math.floor(Math.random() * letters.length)];
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -500;
        this.speed = 0.5 + Math.random() * 2;
        this.size = 20 + Math.floor(Math.random() * 20);
        this.opacity = 0.2 + Math.random() * 0.6;
        this.rotation = (Math.random() - 0.5) * 0.1;
    }
    
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.reset();
        }
    }
    
    draw() {
        ctx.save();
        ctx.font = `${this.size}px 'Poppins', 'Arial'`;
        ctx.fillStyle = '#ff69b4';
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillText(this.letter, 0, 0);
        ctx.restore();
    }
}

for (let i = 0; i < DROP_COUNT; i++) {
    drops.push(new Drop());
}

function animateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drops.length; i++) {
        drops[i].update();
        drops[i].draw();
    }
    requestAnimationFrame(animateRain);
}

animateRain();

// ==================== Stars and Effects ====================
function createStars(count = 150) {
    const starField = document.getElementById('starField');
    if (!starField) return;
    
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        starField.appendChild(star);
    }
}

function createShootingStar() {
    const starField = document.getElementById('starField');
    if (!starField) return;
    
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.top = `${Math.random() * window.innerHeight}px`;
    shootingStar.style.left = `${Math.random() * window.innerWidth / 2}px`;
    starField.appendChild(shootingStar);
    setTimeout(() => shootingStar.remove(), 1000);
}

function createStarBurst(x, y) {
    const starField = document.getElementById('starField');
    if (!starField) return;
    
    const count = 8;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star-burst';
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 100 + 30;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        star.style.setProperty('--dx', `${dx}px`);
        star.style.setProperty('--dy', `${dy}px`);
        starField.appendChild(star);
        setTimeout(() => star.remove(), 800);
    }
}

createStars();
setInterval(() => {
    if (Math.random() < 0.4) createShootingStar();
}, 800);

document.addEventListener('click', (e) => createStarBurst(e.clientX, e.clientY));
document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        createStarBurst(e.touches[0].clientX, e.touches[0].clientY);
    }
});

// ==================== إصلاح الصورة المتحركة وجعلها داخل مجموعة القلب ====================
const heartGif = document.getElementById('heartGif');

// دالة تحديث حجم الصورة حسب اتجاه الشاشة
function updateGifSize() {
    const isLandscape = window.innerWidth > window.innerHeight;
    const width = window.innerWidth;
    
    if (width <= 500 && isLandscape) {
        heartGif.style.width = '90px';
        heartGif.style.height = '90px';
    } else if (width <= 700 && isLandscape) {
        heartGif.style.width = '100px';
        heartGif.style.height = '100px';
    } else if (width <= 900 && isLandscape) {
        heartGif.style.width = '120px';
        heartGif.style.height = '120px';
    } else if (width <= 480 && !isLandscape) {
        heartGif.style.width = '100px';
        heartGif.style.height = '100px';
    } else if (width <= 768 && !isLandscape) {
        heartGif.style.width = '140px';
        heartGif.style.height = '140px';
    } else if (width >= 1920) {
        heartGif.style.width = '200px';
        heartGif.style.height = '200px';
    } else {
        heartGif.style.width = '180px';
        heartGif.style.height = '180px';
    }
}

// تطبيق الحجم الأولي
updateGifSize();

// التأكد من تحميل الصورة
heartGif.onload = function() {
    console.log('✅ GIF loaded successfully');
    heartGif.classList.remove('error');
};

heartGif.onerror = function() {
    console.log('❌ GIF failed to load, using fallback');
    heartGif.classList.add('error');
    heartGif.src = '';
    heartGif.alt = '❤️';
    heartGif.style.display = 'flex';
    heartGif.style.alignItems = 'center';
    heartGif.style.justifyContent = 'center';
    heartGif.style.background = 'linear-gradient(135deg, #ff69b4, #ff1493)';
    heartGif.style.fontSize = '80px';
    heartGif.innerHTML = '❤️';
};

// تحديث حجم الصورة عند تغيير حجم أو اتجاه الشاشة
window.addEventListener('resize', updateGifSize);
window.addEventListener('orientationchange', updateGifSize);

// ==================== Falling Messages (خلف القلب) ====================
const fallingMessages = [
    '❤️ أحبك',
    '🎂 كل سنة وأنت طيبة',
    '🥰 عيد ميلاد سعيد',
    '✨ أختي الغالية',
    '🍀 أفضل أخت في العالم',
    '💕 أنت رائعة',
    '🌸 بحبك أوي',
    '🌟 ذكرى جميلة',
    '💖 قلبك أبيض',
    '🎈 فرحة وسعادة'
];

let messageContainer = document.getElementById('messageContainer');
if (!messageContainer) {
    messageContainer = document.createElement('div');
    messageContainer.id = 'messageContainer';
    messageContainer.className = 'message-container';
    document.body.appendChild(messageContainer);
}

function showFallingMessage() {
    const count = Math.floor(Math.random() * 2) + 1;
    
    for (let i = 0; i < count; i++) {
        const msg = document.createElement('div');
        msg.className = 'falling-message';
        msg.textContent = fallingMessages[Math.floor(Math.random() * fallingMessages.length)];
        const left = Math.random() * 80 + 5;
        const duration = Math.random() * 3 + 3;
        const fontSize = Math.random() * 15 + 20;
        msg.style.left = `${left}%`;
        msg.style.top = `-50px`;
        msg.style.animationDuration = `${duration}s`;
        msg.style.fontSize = `${fontSize}px`;
        messageContainer.appendChild(msg);
        setTimeout(() => msg.remove(), duration * 1000);
    }
}

// ==================== Heart Formation with Photos ====================
const photos = [];
// صورك فقط - 16 صورة
for (let i = 1; i <= 16; i++) {
    photos.push(`images/photo${i}.jpg`);
}

// تحديد الإعدادات حسب نوع الجهاز واتجاه الشاشة
function getHeartSettings() {
    const isLandscape = window.innerWidth > window.innerHeight;
    const width = window.innerWidth;
    
    // القيم الافتراضية للكمبيوتر - مساحة مناسبة (28 بدلاً من 30)
    let settings = {
        scale: 28,        // تعديل من 30 إلى 28 (أنعم قليلاً)
        step: 0.15,        // نفس عدد النقاط
        imgSize: 100,      // حجم الصور ثابت كما هو
        delay: 80
    };
    
    // تعديل للهواتف
    if (width < 600) {
        if (isLandscape) {
            // هاتف في الوضع الأفقي
            settings = {
                scale: 14,        // تعديل متناسب
                step: 0.18,
                imgSize: 60,
                delay: 60
            };
        } else {
            // هاتف في الوضع العمودي
            settings = {
                scale: 17,        // تعديل متناسب
                step: 0.16,
                imgSize: 70,
                delay: 70
            };
        }
    } else if (width < 900 && isLandscape) {
        // جهاز لوحي في الوضع الأفقي
        settings = {
            scale: 19,            // تعديل متناسب
            step: 0.17,
            imgSize: 80,
            delay: 70
        };
    } else if (width < 900 && !isLandscape) {
        // جهاز لوحي في الوضع العمودي
        settings = {
            scale: 21,            // تعديل متناسب
            step: 0.16,
            imgSize: 90,
            delay: 80
        };
    }
    
    return settings;
}

const settings = getHeartSettings();
let scale = settings.scale;
const step = settings.step;
let imgSize = settings.imgSize;
const delay = settings.delay;
const heartPoints = [];

// Generate heart shape points with more points
for (let t = 0; t < 2 * Math.PI; t += step) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    heartPoints.push({ x, y });
}

console.log(`تم توليد ${heartPoints.length} نقطة للقلب بمقياس ${scale}`);

const container = document.getElementById('heartContainer');
const heartGroup = document.createElement('div');
heartGroup.className = 'heart-group';
heartGroup.style.transformStyle = 'preserve-3d';
container.appendChild(heartGroup);

// نقل الصورة المتحركة داخل مجموعة القلب لتتحرك معه
if (heartGif && heartGif.parentNode !== heartGroup) {
    heartGroup.appendChild(heartGif);
}

// إنشاء مودال لعرض الصور في نفس الصفحة
const modal = document.createElement('div');
modal.className = 'photo-modal';
modal.innerHTML = `
    <span class="close-modal" onclick="closeModal()">&times;</span>
    <img class="modal-image" id="modalImage" src="" alt="">
    <div class="modal-nav">
        <button onclick="changePhoto(-1)">←</button>
        <button onclick="changePhoto(1)">→</button>
    </div>
`;
document.body.appendChild(modal);

// متغيرات للمودال
let currentPhotoIndex = 0;
let allPhotos = [];

// تجميع الصور
let pointIndex = 0;

function addNextPoint() {
    if (pointIndex >= heartPoints.length) return;
    
    const point = heartPoints[pointIndex];
    const photoIndex = pointIndex % photos.length;
    
    const img = document.createElement('img');
    img.src = photos[photoIndex];
    img.className = 'heart-photo';
    img.dataset.index = pointIndex;
    img.dataset.photoIndex = photoIndex;
    img.loading = 'lazy';
    
    // تخزين الصورة في المصفوفة
    allPhotos[pointIndex] = {
        src: photos[photoIndex]
    };
    
    // Handle image load errors
    img.onerror = function() {
        const fallbackIndex = (photoIndex + 1) % photos.length;
        this.src = photos[fallbackIndex];
        allPhotos[pointIndex].src = photos[fallbackIndex];
    };
    
    // Position the image on the heart curve
    img.style.left = `calc(50% + ${point.x * scale}px - ${imgSize / 2}px)`;
    img.style.top = `calc(50% - ${point.y * scale}px - ${imgSize / 2}px)`;
    
    // Add click event
    img.addEventListener('click', function(e) {
        e.stopPropagation();
        currentPhotoIndex = pointIndex;
        openModal(this.src, pointIndex);
    });
    
    heartGroup.appendChild(img);
    
    // Show with slight delay
    setTimeout(() => img.classList.add('show'), 10);
    
    pointIndex++;
    
    // Continue adding points
    if (pointIndex < heartPoints.length) {
        setTimeout(addNextPoint, delay);
    }
}

// دوال المودال
function openModal(src, index) {
    const modal = document.querySelector('.photo-modal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = src;
    currentPhotoIndex = index;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.querySelector('.photo-modal');
    modal.style.display = 'none';
}

function changePhoto(direction) {
    currentPhotoIndex = (currentPhotoIndex + direction + heartPoints.length) % heartPoints.length;
    const modalImg = document.getElementById('modalImage');
    const photoData = allPhotos[currentPhotoIndex];
    modalImg.src = photoData ? photoData.src : photos[0];
}

// بدء إضافة النقاط
setTimeout(addNextPoint, 100);

// Start falling messages
setTimeout(() => {
    showFallingMessage();
    setInterval(showFallingMessage, 2500);
}, 2000);

// ==================== 3D Rotation with Mouse ====================
let rotateX = 0;
let rotateY = 0;
let isDragging = false;
let lastX, lastY;
let rafId = null;

// Mouse events
container.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    container.style.cursor = 'grabbing';
});

container.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'grab';
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
});

container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    
    lastX = e.clientX;
    lastY = e.clientY;
    
    rotateY += dx * 0.2;
    rotateX -= dy * 0.2;
    
    if (!rafId) {
        rafId = requestAnimationFrame(updateTransform);
    }
});

// Touch events
container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        isDragging = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        e.preventDefault();
    }
});

container.addEventListener('touchend', () => {
    isDragging = false;
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
});

container.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    
    rotateY += dx * 0.2;
    rotateX -= dy * 0.2;
    
    if (!rafId) {
        rafId = requestAnimationFrame(updateTransform);
    }
    
    e.preventDefault();
}, { passive: false });

function updateTransform() {
    heartGroup.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    rafId = null;
}

// Auto-rotate
let autoRotateTimer = setInterval(() => {
    if (!isDragging && document.visibilityState === 'visible') {
        rotateY += 0.1;
        heartGroup.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}, 100);

// Keyboard events for modal
document.addEventListener('keydown', (e) => {
    const modal = document.querySelector('.photo-modal');
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') changePhoto(-1);
        if (e.key === 'ArrowRight') changePhoto(1);
        if (e.key === 'Escape') closeModal();
    }
});

// Cleanup
window.addEventListener('beforeunload', () => {
    clearInterval(autoRotateTimer);
});