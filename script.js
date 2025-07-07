// Thuật toán Fisher-Yates shuffle - đảm bảo ngẫu nhiên hoàn toàn
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Sửa lại hàm shuffleCards
function shuffleCards() {
    // Đảm bảo tarotCards đã được khởi tạo
    if (!tarotCards || tarotCards.length === 0) {
        console.error('tarotCards chưa được khởi tạo!');
        return;
    }
    
    // Sử dụng thuật toán Fisher-Yates thay vì sort
    shuffledCards = shuffleArray(tarotCards);
    displayCards();
    
    // Thêm hiệu ứng xáo bài
    const shuffleBtn = document.getElementById('shuffleBtn');
    shuffleBtn.textContent = '🔄 Đang xáo...';
    shuffleBtn.disabled = true;
    
    setTimeout(() => {
        shuffleBtn.textContent = '🔄 Xáo Bài';
        shuffleBtn.disabled = false;
    }, 1000);
}

function displayCards() {
    const container = document.getElementById('cardsContainer');
    if (!container) {
        console.error('Không tìm thấy cardsContainer!');
        return;
    }
    
    container.innerHTML = '';
    
    // Hiển thị 7 lá bài ngẫu nhiên với hiệu ứng
    for (let i = 0; i < 7; i++) {
        const cardElement = createCardElement(i);
        cardElement.style.opacity = '0';
        cardElement.style.transform = 'translateY(20px)';
        container.appendChild(cardElement);
        
        // Hiệu ứng xuất hiện từng lá
        setTimeout(() => {
            cardElement.style.transition = 'all 0.3s ease';
            cardElement.style.opacity = '1';
            cardElement.style.transform = 'translateY(0)';
        }, i * 100);
    }
}

function createCardElement(index) {
    // Kiểm tra index hợp lệ
    if (!shuffledCards[index]) {
        console.error(`Không tìm thấy card tại index ${index}`);
        return document.createElement('div');
    }
    
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-index', index);
    
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                🔮
            </div>
            <div class="card-back">
                <div class="card-symbol">${shuffledCards[index].symbol}</div>
                <div class="card-name">${shuffledCards[index].namevi}</div>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => selectCard(index));
    
    return card;
}

// Sửa lại hàm khởi tạo
function initializeCards() {
    // Kiểm tra dữ liệu trước khi xáo
    if (!tarotCards || tarotCards.length === 0) {
        console.error('Dữ liệu tarotCards không hợp lệ!');
        return;
    }
    
    console.log(`Đã tải ${tarotCards.length} lá bài`);
    shuffleCards();
}

// Thêm xử lý lỗi cho các sự kiện
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeCards();
        
        const shuffleBtn = document.getElementById('shuffleBtn');
        const newReadingBtn = document.getElementById('newReadingBtn');
        
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', shuffleCards);
        }
        
        if (newReadingBtn) {
            newReadingBtn.addEventListener('click', newReading);
        }
    } catch (error) {
        console.error('Lỗi khởi tạo:', error);
    }
});

// Thêm hàm debug để kiểm tra
function debugCards() {
    console.log('tarotCards:', tarotCards?.length || 'undefined');
    console.log('shuffledCards:', shuffledCards?.length || 'undefined');
    console.log('Container:', document.getElementById('cardsContainer'));
}
