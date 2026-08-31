// ===== متغيرات عامة =====
let currentColor = 'taupe';
let rotateAngle = 0;
let zoomLevel = 1;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let translateX = 0;
let translateY = 0;

// ===== ألوان الملابس =====
const colorMap = {
    taupe: {
        gradient: 'linear-gradient(135deg, #9b8f78 0%, #7a6f5d 100%)',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><rect width="200" height="300" fill="%239b8f78"/></svg>'
    },
    black: {
        gradient: 'linear-gradient(135deg, #2a2a2a 0%, #000000 100%)',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><rect width="200" height="300" fill="%232a2a2a"/></svg>'
    },
    navy: {
        gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0f1b2e 100%)',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><rect width="200" height="300" fill="%231e3a5f"/></svg>'
    },
    lightgray: {
        gradient: 'linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%)',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><rect width="200" height="300" fill="%23e8e8e8"/></svg>'
    }
};

// ===== تهيئة الصفحة =====
document.addEventListener('DOMContentLoaded', () => {
    initializeColorSelector();
    initializeControls();
    initializeViewToggle();
    initializeTabButtons();
    initializeProductDisplay();
    loadDefaultColor();
});

// ===== اختيار اللون =====
function initializeColorSelector() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            changeColor(option.dataset.color);
            
            // تحديث الحالة النشطة
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
}

function changeColor(color) {
    const productDisplay = document.getElementById('productDisplay');
    const outfitImage = document.getElementById('outfitImage');
    const dynamicBg = document.getElementById('dynamicBg');
    
    // حفظ اللون الحالي
    currentColor = color;
    
    // تحديث الخلفية بسلاسة
    dynamicBg.style.background = colorMap[color].gradient;
    
    // تأثير الانتقال للصورة
    productDisplay.style.animation = 'none';
    outfitImage.style.animation = 'none';
    
    // إعادة تشغيل الحركة
    setTimeout(() => {
        outfitImage.style.animation = 'slideInOutfit 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }, 10);
    
    // تحديث لون الصورة (يمكن استبداله برابط صور حقيقي)
    updateOutfitImage(color);
}

function updateOutfitImage(color) {
    const outfitImage = document.getElementById('outfitImage');
    // في الحالة الحقيقية، ستستخدم روابط صور مختلفة
    // مثلاً: outfitImage.src = `images/${color}.png`;
    
    // للآن، سننشئ صورة SVG ديناميكية تمثل الملابس
    const svgImages = {
        taupe: createOutfitSVG('#9b8f78', '#8a7f6d'),
        black: createOutfitSVG('#2a2a2a', '#1a1a1a'),
        navy: createOutfitSVG('#1e3a5f', '#0f1b2e'),
        lightgray: createOutfitSVG('#e8e8e8', '#d0d0d0')
    };
    
    outfitImage.src = svgImages[color];
}

function createOutfitSVG(mainColor, accentColor) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400">
            <!-- الخلفية -->
            <rect width="200" height="400" fill="transparent"/>
            
            <!-- الحذاء -->
            <ellipse cx="70" cy="370" rx="20" ry="12" fill="#ffffff"/>
            <ellipse cx="130" cy="370" rx="20" ry="12" fill="#ffffff"/>
            <path d="M 50 360 Q 50 375 70 380 Q 90 375 90 360" fill="#f5f5f5" stroke="#e0e0e0" stroke-width="1"/>
            <path d="M 110 360 Q 110 375 130 380 Q 150 375 150 360" fill="#f5f5f5" stroke="#e0e0e0" stroke-width="1"/>
            
            <!-- البنطال -->
            <path d="M 60 220 L 50 360 L 70 370 L 70 225 Z" fill="${mainColor}"/>
            <path d="M 140 220 L 150 360 L 130 370 L 130 225 Z" fill="${mainColor}"/>
            <line x1="100" y1="225" x2="100" y2="365" stroke="${accentColor}" stroke-width="0.5" opacity="0.3"/>
            
            <!-- الكنزة العلوية (Half-Zip) -->
            <ellipse cx="100" cy="80" rx="45" ry="40" fill="${mainColor}"/>
            <path d="M 70 90 Q 70 150 80 190 L 120 190 Q 130 150 130 90" fill="${mainColor}"/>
            <path d="M 85 100 L 115 100" stroke="#ffffff" stroke-width="2" opacity="0.4"/>
            
            <!-- الـ Zip -->
            <line x1="100" y1="100" x2="100" y2="170" stroke="#c0c0c0" stroke-width="2.5"/>
            <circle cx="100" cy="102" r="2.5" fill="#e0e0e0"/>
            
            <!-- الياقة -->
            <path d="M 85 95 Q 100 105 115 95" fill="${accentColor}" opacity="0.7"/>
            
            <!-- التي شيرت الأبيض بالأسفل -->
            <path d="M 80 180 L 75 220 L 125 220 L 120 180" fill="#ffffff"/>
            
            <!-- الأكمام -->
            <path d="M 70 130 Q 50 140 45 160" stroke="${mainColor}" stroke-width="18" fill="none" stroke-linecap="round"/>
            <path d="M 130 130 Q 150 140 155 160" stroke="${mainColor}" stroke-width="18" fill="none" stroke-linecap="round"/>
            
            <!-- الظلال والتفاصيل -->
            <ellipse cx="100" cy="85" rx="40" ry="8" fill="${accentColor}" opacity="0.2"/>
        </svg>
    `;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

// ===== تحميل اللون الافتراضي =====
function loadDefaultColor() {
    const defaultOption = document.querySelector('[data-color="taupe"]');
    if (defaultOption) {
        defaultOption.classList.add('active');
    }
    updateOutfitImage('taupe');
}

// ===== التحكم بالدوران والتكبير والنقل =====
function initializeControls() {
    // الدوران
    document.querySelectorAll('.rotate-btn, .rotate-control').forEach(btn => {
        btn.addEventListener('click', () => rotateProduct());
    });
    
    // التكبير
    document.querySelectorAll('.zoom-btn, .zoom-control').forEach(btn => {
        btn.addEventListener('click', () => zoomProduct());
    });
    
    // النقل
    document.querySelectorAll('.move-btn, .move-control').forEach(btn => {
        btn.addEventListener('click', () => toggleDragMode());
    });
    
    // ملء الشاشة
    document.querySelectorAll('.fullscreen-btn, .fullscreen-control').forEach(btn => {
        btn.addEventListener('click', () => toggleFullscreen());
    });
    
    // المشاركة والمفضلة
    document.querySelector('.share-btn').addEventListener('click', shareProduct);
    document.querySelector('.favorite-btn').addEventListener('click', toggleFavorite);
}

function rotateProduct() {
    const outfitImage = document.getElementById('outfitImage');
    rotateAngle = (rotateAngle + 45) % 360;
    outfitImage.style.transform = `rotate(${rotateAngle}deg) scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
    
    // تأثير الضغط
    playClickFeedback();
}

function zoomProduct() {
    const outfitImage = document.getElementById('outfitImage');
    zoomLevel = zoomLevel === 1 ? 1.5 : 1;
    outfitImage.style.transform = `rotate(${rotateAngle}deg) scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
    
    playClickFeedback();
}

let dragMode = false;

function toggleDragMode() {
    dragMode = !dragMode;
    const productDisplay = document.getElementById('productDisplay');
    
    if (dragMode) {
        productDisplay.style.cursor = 'grab';
        productDisplay.addEventListener('mousedown', startDrag);
        productDisplay.addEventListener('mousemove', drag);
        productDisplay.addEventListener('mouseup', stopDrag);
        productDisplay.addEventListener('mouseleave', stopDrag);
    } else {
        productDisplay.style.cursor = 'default';
        productDisplay.removeEventListener('mousedown', startDrag);
        productDisplay.removeEventListener('mousemove', drag);
        productDisplay.removeEventListener('mouseup', stopDrag);
        productDisplay.removeEventListener('mouseleave', stopDrag);
    }
    
    playClickFeedback();
}

function startDrag(e) {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    document.getElementById('productDisplay').style.cursor = 'grabbing';
}

function drag(e) {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;
    
    translateX += deltaX * 0.1;
    translateY += deltaY * 0.1;
    
    const outfitImage = document.getElementById('outfitImage');
    outfitImage.style.transform = `rotate(${rotateAngle}deg) scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
    
    dragStartX = e.clientX;
    dragStartY = e.clientY;
}

function stopDrag() {
    isDragging = false;
    document.getElementById('productDisplay').style.cursor = 'grab';
}

function toggleFullscreen() {
    const viewerContainer = document.querySelector('.viewer-container');
    
    if (!document.fullscreenElement) {
        viewerContainer.requestFullscreen().catch(err => {
            console.log('Error requesting fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
    
    playClickFeedback();
}

// ===== تبديل العروض =====
function initializeViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            console.log('Switched to view:', view);
            playClickFeedback();
        });
    });
}

// ===== أزرار التبويب السفلية =====
function initializeTabButtons() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tab = btn.dataset.tab;
            console.log('Switched to tab:', tab);
            playClickFeedback();
        });
    });
}

// ===== تهيئة عرض المنتج =====
function initializeProductDisplay() {
    const outfitImage = document.getElementById('outfitImage');
    
    // إضافة حركات عند المرور
    const productDisplay = document.getElementById('productDisplay');
    
    productDisplay.addEventListener('mouseenter', () => {
        productDisplay.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.8)';
    });
    
    productDisplay.addEventListener('mouseleave', () => {
        productDisplay.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.6)';
    });
}

// ===== المشاركة والمفضلة =====
function shareProduct() {
    const shareData = {
        title: 'Casual Half-Zip Set',
        text: 'شاهد هذا الطقم الرائع!',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // نسخ الرابط للحافظة
        navigator.clipboard.writeText(window.location.href);
        showNotification('تم نسخ الرابط!');
    }
    
    playClickFeedback();
}

function toggleFavorite() {
    const favBtn = document.querySelector('.favorite-btn');
    favBtn.classList.toggle('active');
    
    if (favBtn.classList.contains('active')) {
        favBtn.style.color = '#ff1744';
        showNotification('تمت الإضافة للمفضلة ❤️');
    } else {
        favBtn.style.color = '#ffffff';
        showNotification('تم الحذف من المفضلة');
    }
    
    playClickFeedback();
}

// ===== إشعارات =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        color: #1a1a1a;
        padding: 15px 25px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
        z-index: 100;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// ===== تأثير صوتي (اختياري) =====
function playClickFeedback() {
    // يمكن إضافة صوت أو اهتزاز هنا
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

// ===== إضافة حركات CSS ديناميكية =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100px);
            opacity: 0;
        }
    }
    
    .outfit-image {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .control-btn:active,
    .tab-btn:active,
    .color-option:active {
        transform: scale(0.95) !important;
    }
`;
document.head.appendChild(style);

// ===== معالجة لوحة المفاتيح =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') rotateProduct();
    if (e.key === 'ArrowRight') rotateProduct();
    if (e.key === '+' || e.key === '=') zoomProduct();
    if (e.key === '-') zoomLevel = 1;
});

console.log('✨ تم تحميل Casual Half-Zip Store بنجاح!');
