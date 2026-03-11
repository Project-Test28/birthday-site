// ==================== Canvas Setup for Pink Rain ====================
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = ['H', 'A', 'P', 'P', 'Y', ' ', 'B', 'I', 'R', 'T', 'H', 'D', 'A', 'Y', '!', '❤️', '🎂', '✨'];
const drops = [];

class Drop {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.letter = letters[Math.floor(Math.random() * letters.length)];
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -500;
        this.speed = 1 + Math.random() * 3;
        this.size = 20 + Math.floor(Math.random() * 30);
        this.opacity = 0.3 + Math.random() * 0.7;
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

for (let i = 0; i < 100; i++) {
    drops.push(new Drop());
}

function animateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach(drop => {
        drop.update();
        drop.draw();
    });
    requestAnimationFrame(animateRain);
}

animateRain();

// ==================== Stars and Effects ====================
function createStars(count = 200) {
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
    
    const count = 12;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star-burst';
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 150 + 50;
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
    if (Math.random() < 0.6) createShootingStar();
}, 500);

document.addEventListener('click', (e) => createStarBurst(e.clientX, e.clientY));
document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        createStarBurst(e.touches[0].clientX, e.touches[0].clientY);
    }
});

// ==================== Falling Messages ====================
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

let fallingMessagesInterval;

function showFallingMessage() {
    let container = document.getElementById('messageContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'messageContainer';
        document.body.appendChild(container);
    }
    
    const count = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < count; i++) {
        const msg = document.createElement('div');
        msg.className = 'falling-message';
        msg.textContent = fallingMessages[Math.floor(Math.random() * fallingMessages.length)];
        const left = Math.random() * 80 + 5;
        const duration = Math.random() * 2 + 2;
        const fontSize = Math.random() * 20 + 25;
        msg.style.left = `${left}%`;
        msg.style.top = `-50px`;
        msg.style.animationDuration = `${duration}s`;
        msg.style.fontSize = `${fontSize}px`;
        container.appendChild(msg);
        setTimeout(() => msg.remove(), duration * 1000 + 1000);
    }
}

// ==================== Photos and Data ====================
const photos = [];
for (let i = 1; i <= 16; i++) {
    photos.push(`images/photo${i}.jpg`);
}

const backupPhotos = [
    'https://images.unsplash.com/photo-1518562180174-34a163b1a9c6?w=600',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600',
    'https://images.unsplash.com/photo-1514846226882-28b324ef7f2d?w=600',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600',
    'https://images.unsplash.com/photo-1518562180174-34a163b1a9c6?w=600',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600',
    'https://images.unsplash.com/photo-1514846226882-28b324ef7f2d?w=600',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600'
];

const pageMessages = [
    "🌟 أنت أختي الرائعة دائماً وأبداً!",
    "💕 شكراً لأنك دائماً معي",
    "✨ ابتسامتك تضيء دنيتي",
    "🌈 أنا محظوظة جداً بوجودك",
    "💫 أنت قدوتي في الحياة",
    "🎉 الحياة أحلى بوجودك",
    "🤗 طيبة قلبك ما لها حدود",
    "💪 أنت تجعلين كل شيء ممكناً",
    "👯‍♀️ أختي وصديقتي للأبد",
    "🎈 تفرحين كل مكان تروحين له",
    "💝 جميلة من الداخل والخارج",
    "✨ قلبك ساحر وخيالي",
    "📸 كل لحظة معك كنز ثمين",
    "💖 أنت فريدة من نوعك",
    "💕 بحبك أكثر من الكلام",
    "🎂 كل سنة وأنت طيبة يا أختي الغالية!"
];

// ==================== DOM Elements ====================
const album = document.getElementById('album');
const bookCover = document.getElementById('bookCover');
const bookPages = document.getElementById('bookPages');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const pageDots = document.getElementById('pageDots');

let currentPage = 0;
const totalPages = 8;
let currentPhotoIndex = 0;
let isAlbumOpen = false;

// ==================== العد التنازلي (3, 2, 1) ====================
const countdownContainer = document.createElement('div');
countdownContainer.style.position = 'fixed';
countdownContainer.style.top = '0';
countdownContainer.style.left = '0';
countdownContainer.style.width = '100%';
countdownContainer.style.height = '100%';
countdownContainer.style.display = 'flex';
countdownContainer.style.justifyContent = 'center';
countdownContainer.style.alignItems = 'center';
countdownContainer.style.zIndex = '1000';
countdownContainer.style.background = 'rgba(0,0,0,0.9)';
countdownContainer.style.flexDirection = 'column';
document.body.appendChild(countdownContainer);

const countdownNumber = document.createElement('div');
countdownNumber.style.fontSize = '200px';
countdownNumber.style.fontWeight = 'bold';
countdownNumber.style.color = '#ff69b4';
countdownNumber.style.textShadow = '0 0 30px #ff69b4, 0 0 60px #ff1493';
countdownNumber.style.animation = 'pulse 1s infinite';
countdownContainer.appendChild(countdownNumber);

const countdownLabel = document.createElement('div');
countdownLabel.style.fontSize = '30px';
countdownLabel.style.color = 'white';
countdownLabel.style.marginTop = '20px';
countdownLabel.style.textShadow = '0 0 20px #ff69b4';
countdownContainer.appendChild(countdownLabel);

// إضافة الأنماط
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// ==================== تسلسل العد التنازلي ====================
async function startCountdown() {
    const numbers = ['3', '2', '1'];
    const labels = ['استعدي...', 'جهزي نفسك...', 'هيا بنا!'];
    
    for (let i = 0; i < numbers.length; i++) {
        countdownNumber.textContent = numbers[i];
        countdownLabel.textContent = labels[i];
        await new Promise(r => setTimeout(r, 1200));
    }
    
    countdownContainer.style.animation = 'fadeOut 1s forwards';
    
    setTimeout(() => {
        countdownContainer.remove();
        showWelcomeMessage();
    }, 1000);
}

// ==================== الجملة الترحيبية ====================
function showWelcomeMessage() {
    const welcomeContainer = document.createElement('div');
    welcomeContainer.style.position = 'fixed';
    welcomeContainer.style.top = '0';
    welcomeContainer.style.left = '0';
    welcomeContainer.style.width = '100%';
    welcomeContainer.style.height = '100%';
    welcomeContainer.style.display = 'flex';
    welcomeContainer.style.justifyContent = 'center';
    welcomeContainer.style.alignItems = 'center';
    welcomeContainer.style.zIndex = '900';
    welcomeContainer.style.background = 'rgba(0,0,0,0.9)';
    welcomeContainer.style.flexDirection = 'column';
    welcomeContainer.style.animation = 'fadeIn 1s';
    document.body.appendChild(welcomeContainer);

    const welcomeTitle = document.createElement('div');
    welcomeTitle.style.fontSize = '70px';
    welcomeTitle.style.fontWeight = 'bold';
    welcomeTitle.style.color = '#ff69b4';
    welcomeTitle.style.textShadow = '0 0 30px #ff69b4, 0 0 60px #ff1493';
    welcomeTitle.style.marginBottom = '20px';
    welcomeTitle.style.textAlign = 'center';
    welcomeTitle.style.lineHeight = '1.5';
    welcomeTitle.innerHTML = 'عيد ميلاد سعيد<br>يا أختي الغالية';
    welcomeContainer.appendChild(welcomeTitle);

    const welcomeSubtitle = document.createElement('div');
    welcomeSubtitle.style.fontSize = '30px';
    welcomeSubtitle.style.color = 'white';
    welcomeSubtitle.style.textShadow = '0 0 20px #ff69b4';
    welcomeSubtitle.textContent = 'كل سنة وأنت طيبة ❤️';
    welcomeContainer.appendChild(welcomeSubtitle);

    setTimeout(() => {
        welcomeContainer.style.animation = 'fadeOut 1s forwards';
        setTimeout(() => {
            welcomeContainer.remove();
            album.classList.remove('hidden');
            fallingMessagesInterval = setInterval(showFallingMessage, 1000);
            showFallingMessage();
        }, 1000);
    }, 3000);
}

setTimeout(startCountdown, 500);

// ==================== دوال الألبوم (معكوسة بالكامل) ====================
bookCover.addEventListener('click', () => {
    bookCover.classList.add('open');
    setTimeout(() => {
        bookCover.style.display = 'none';
        bookPages.classList.add('visible');
        renderPage(0);
        createPageDots();
        isAlbumOpen = true;
        updateButtons();
    }, 500);
});

function renderPage(pageIndex) {
    bookPages.innerHTML = '';
    
    const spread = document.createElement('div');
    spread.className = 'page-spread';
    
    // معكوس: الصفحة اليسرى أولاً
    const leftIndex = pageIndex * 2;
    const leftPage = createPage(leftIndex, pageMessages[leftIndex], 'left');
    spread.appendChild(leftPage);
    
    const rightIndex = pageIndex * 2 + 1;
    const rightPage = createPage(rightIndex, pageMessages[rightIndex], 'right');
    spread.appendChild(rightPage);
    
    bookPages.appendChild(spread);
    updateDots(pageIndex);
    updateButtons();
}

function createPage(photoIndex, message, side) {
    const page = document.createElement('div');
    page.className = `page ${side}`;
    
    const photoFrame = document.createElement('div');
    photoFrame.className = 'photo-frame';
    photoFrame.style.cursor = 'pointer';
    
    const img = document.createElement('img');
    img.src = photos[photoIndex] || backupPhotos[photoIndex];
    img.alt = `صورة ${photoIndex + 1}`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    
    img.onerror = function() { 
        if (this.src !== backupPhotos[photoIndex]) {
            this.src = backupPhotos[photoIndex];
        }
    };
    
    img.addEventListener('click', () => {
        currentPhotoIndex = photoIndex;
        openModal(photoIndex);
    });
    
    photoFrame.appendChild(img);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = message;
    
    const pageNumber = document.createElement('span');
    pageNumber.className = 'page-number';
    pageNumber.textContent = `صفحة ${Math.floor(photoIndex/2) + 1}/${totalPages}`;
    
    page.appendChild(photoFrame);
    page.appendChild(messageDiv);
    page.appendChild(pageNumber);
    
    return page;
}

function createPageDots() {
    pageDots.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.addEventListener('click', () => {
            if (isAlbumOpen) {
                goToPage(i);
            }
        });
        pageDots.appendChild(dot);
    }
}

function updateDots(activePage) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === activePage) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

function goToPage(pageIndex) {
    if (isAlbumOpen) {
        currentPage = pageIndex;
        renderPage(currentPage);
    }
}

// ==================== أزرار التحكم (مضبوطة 100%) ====================
function updateButtons() {
    // الزر الأيمن (next) → تقدم للأمام
    // الزر الأيسر (prev) → رجوع للخلف
    
    if (currentPage === totalPages - 1) {
        // في آخر صفحة: الزر الأيمن يصبح هدية
        nextPage.disabled = false;
        prevPage.disabled = false;
        nextPage.textContent = '🎁';
        prevPage.textContent = '←';
    } else if (currentPage === 0) {
        // في أول صفحة: الزر الأيسر معطل
        nextPage.disabled = false;
        prevPage.disabled = true;
        nextPage.textContent = '→';
        prevPage.textContent = '←';
    } else {
        // باقي الصفحات
        nextPage.disabled = false;
        prevPage.disabled = false;
        nextPage.textContent = '→';
        prevPage.textContent = '←';
    }
}

// الزر الأيمن: تقدم للأمام أو هدية
nextPage.addEventListener('click', () => {
    if (!isAlbumOpen) {
        bookCover.click();
        return;
    }
    
    if (currentPage === totalPages - 1) {
        // في آخر صفحة: الذهاب للهدية
        showFinalMessage();
    } else if (currentPage < totalPages - 1) {
        // التقدم للأمام
        currentPage++;
        renderPage(currentPage);
    }
});

// الزر الأيسر: رجوع للخلف
prevPage.addEventListener('click', () => {
    if (!isAlbumOpen) {
        bookCover.click();
        return;
    }
    
    if (currentPage > 0) {
        // الرجوع للخلف
        currentPage--;
        renderPage(currentPage);
    }
});

// ==================== دوال المودال ====================
const modal = document.getElementById('photoModal');
const modalImg = document.getElementById('modalImage');

function openModal(index) {
    modal.style.display = 'flex';
    modalImg.src = photos[index] || backupPhotos[index];
    currentPhotoIndex = index;
}

function closeModal(e) {
    if (e === undefined || e.target === modal || e.target.classList.contains('close-modal')) {
        modal.style.display = 'none';
    }
}

function changePhoto(direction) {
    currentPhotoIndex = (currentPhotoIndex + direction + photos.length) % photos.length;
    modalImg.src = photos[currentPhotoIndex] || backupPhotos[currentPhotoIndex];
}

document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') changePhoto(-1);
        if (e.key === 'ArrowRight') changePhoto(1);
        if (e.key === 'Escape') closeModal();
    }
});

// ==================== الرسالة النهائية ====================
function showFinalMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.background = 'rgba(255,105,180,0.95)';
    messageDiv.style.color = 'white';
    messageDiv.style.fontSize = window.innerWidth > 768 ? '40px' : '28px';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.style.padding = window.innerWidth > 768 ? '50px 70px' : '30px 40px';
    messageDiv.style.borderRadius = '80px';
    messageDiv.style.border = '4px solid white';
    messageDiv.style.boxShadow = '0 0 60px #ff1493';
    messageDiv.style.zIndex = '1000000';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.animation = 'messageAppear 0.5s';
    messageDiv.style.cursor = 'pointer';
    messageDiv.innerHTML = '✨ كل سنة وأنت طيبة يا أجمل أخت في العالم ✨<br>❤️ أحبك جداً ❤️<br><br>🎁 اضغط هنا للهدية';
    
    document.body.appendChild(messageDiv);
    
    messageDiv.addEventListener('click', () => {
        messageDiv.remove();
        window.location.href = 'heart.html';
    });
    
    setTimeout(() => {
        if (document.body.contains(messageDiv)) {
            messageDiv.style.animation = 'messageDisappear 0.5s forwards';
            setTimeout(() => {
                if (document.body.contains(messageDiv)) {
                    messageDiv.remove();
                    window.location.href = 'heart.html';
                }
            }, 500);
        }
    }, 5000);
}

// إضافة أنماط للرسالة
const finalStyle = document.createElement('style');
finalStyle.textContent = `
    @keyframes messageAppear {
        from { transform: translate(-50%, -30%) scale(0.8); opacity: 0; }
        to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    @keyframes messageDisappear {
        from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        to { transform: translate(-50%, -70%) scale(0.8); opacity: 0; }
    }
`;
document.head.appendChild(finalStyle);