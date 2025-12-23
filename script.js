// 실시간 상담 더미 데이터
const consultationData = [
    { name: '김민수', phone: '010-1234-2322', message: '공신폰 구매 문의드립니다. 자세한 설명 부탁드려요!' },
    { name: '이영희', phone: '010-5678-3456', message: '학원 다니는 중2 아이에게 추천할만한가요?' },
    { name: '박준호', phone: '010-9012-4567', message: '할부 가능한지 궁금합니다.' },
    { name: '최수진', phone: '010-3456-7890', message: '유튜브 차단 기능이 확실한가요?' },
    { name: '정다은', phone: '010-7890-1234', message: '매장 방문 가능한 시간 알려주세요.' },
    { name: '강민준', phone: '010-2345-6789', message: '중고폰도 구매 가능한가요?' },
    { name: '윤서연', phone: '010-6789-0123', message: '요금제 문의드립니다. 가장 저렴한 요금제는?' },
    { name: '임지훈', phone: '010-4567-8901', message: '카카오톡은 사용 가능한가요?' },
    { name: '한소영', phone: '010-8901-2345', message: '배송도 가능한가요?' },
    { name: '오현우', phone: '010-1357-2468', message: 'A/S는 어떻게 받나요?' },
    { name: '신지은', phone: '010-2468-1357', message: '공신폰과 일반폰 차이점이 뭔가요?' },
    { name: '조성민', phone: '010-3691-2580', message: '게임 앱 설치가 안되는지 확인 부탁드려요.' },
    { name: '배유진', phone: '010-2580-3691', message: '학원에서도 사용 가능한가요?' },
    { name: '홍태현', phone: '010-1470-2580', message: '인스타그램도 차단되나요?' },
    { name: '송미래', phone: '010-2580-1470', message: '전화와 문자는 정상 사용 가능한가요?' },
    { name: '류동현', phone: '010-3690-1470', message: '공신폰 추천해주세요!' },
    { name: '문혜진', phone: '010-1470-3690', message: '할인 혜택이 있나요?' },
    { name: '양준서', phone: '010-2580-1470', message: '카드 결제 가능한가요?' },
    { name: '백하늘', phone: '010-1470-2580', message: '당일 수령 가능한가요?' },
    { name: '남지우', phone: '010-3690-1470', message: '공신폰 후기 궁금합니다!' },
    { name: '구민서', phone: '010-1470-3690', message: '학원폰과 공신폰 차이가 뭔가요?' },
    { name: '노예준', phone: '010-2580-3690', message: '온라인 구매도 가능한가요?' },
    { name: '도서윤', phone: '010-3690-2580', message: '추가 할인 혜택이 있나요?' },
    { name: '라현수', phone: '010-1470-2580', message: '공신폰 가격 문의드립니다.' },
    { name: '마지원', phone: '010-2580-1470', message: '학원 선생님 추천으로 왔어요!' },
    { name: '반서진', phone: '010-3690-1470', message: '공신폰 구매하고 싶어요!' },
    { name: '사미래', phone: '010-1470-3690', message: '상담 가능한 시간 알려주세요.' },
    { name: '아동현', phone: '010-2580-3690', message: '공신폰 정말 효과가 있나요?' },
    { name: '자민지', phone: '010-3690-2580', message: '학원에서 공신폰 사용하는 아이 많나요?' },
    { name: '차준혁', phone: '010-1470-2580', message: '공신폰 구매 문의드립니다!' }
];

// 이름 마스킹 함수
function maskName(name) {
    if (name.length <= 2) {
        return name.charAt(0) + 'x';
    }
    return name.charAt(0) + 'x' + name.charAt(name.length - 1);
}

// 전화번호 마스킹 함수
function maskPhone(phone) {
    const parts = phone.split('-');
    if (parts.length === 3) {
        return `010-xxxx-${parts[2]}`;
    }
    return phone;
}

let currentIndex = 0;
const itemsPerView = 3;
let consultationItems = [];
let itemTimestamps = new Map(); // 각 아이템의 타임스탬프 저장

// 상대 시간 계산 함수
function getRelativeTime(secondsAgo) {
    if (secondsAgo < 60) {
        return `${secondsAgo}초 전`;
    } else if (secondsAgo < 3600) {
        const minutes = Math.floor(secondsAgo / 60);
        return `${minutes}분 전`;
    } else {
        const hours = Math.floor(secondsAgo / 3600);
        return `${hours}시간 전`;
    }
}

// 랜덤한 과거 시간 생성 (1초 ~ 5시간 전)
function generateRandomPastTime() {
    // 1초부터 5시간(18000초) 사이의 랜덤한 시간
    const secondsAgo = Math.floor(Math.random() * 18000) + 1;
    return secondsAgo;
}

// 시간 업데이트 함수
function updateItemTimes() {
    const items = document.querySelectorAll('.consultation-item');
    items.forEach((item, index) => {
        const timeElement = item.querySelector('.consultation-time');
        if (timeElement && itemTimestamps.has(item)) {
            const timestamp = itemTimestamps.get(item);
            const now = Math.floor(Date.now() / 1000);
            const secondsAgo = now - timestamp;
            timeElement.textContent = getRelativeTime(secondsAgo);
        }
    });
}

// 상담 아이템 생성 함수
function createConsultationItem(data, secondsAgo) {
    const item = document.createElement('div');
    item.className = 'consultation-item';
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.8s ease-out';
    
    // 타임스탬프 저장 (현재 시간 - secondsAgo)
    const timestamp = Math.floor(Date.now() / 1000) - secondsAgo;
    itemTimestamps.set(item, timestamp);
    
    const header = document.createElement('div');
    header.className = 'consultation-item-header';
    
    const avatar = document.createElement('div');
    avatar.className = 'consultation-avatar';
    avatar.textContent = data.name.charAt(0);
    
    const namePhone = document.createElement('div');
    namePhone.className = 'consultation-name-phone';
    
    const name = document.createElement('span');
    name.className = 'consultation-name';
    name.textContent = maskName(data.name);
    
    const phone = document.createElement('span');
    phone.className = 'consultation-phone';
    phone.textContent = `전화번호 : ${maskPhone(data.phone)}`;
    
    namePhone.appendChild(name);
    namePhone.appendChild(phone);
    
    const time = document.createElement('span');
    time.className = 'consultation-time';
    time.textContent = getRelativeTime(secondsAgo);
    
    header.appendChild(avatar);
    header.appendChild(namePhone);
    header.appendChild(time);
    
    const message = document.createElement('div');
    message.className = 'consultation-message';
    const messageLabel = document.createElement('span');
    messageLabel.className = 'message-label';
    messageLabel.textContent = '문의내용 : ';
    message.appendChild(messageLabel);
    message.appendChild(document.createTextNode(data.message));
    
    item.appendChild(header);
    item.appendChild(message);
    
    return item;
}

// 상담 아이템 표시 함수
function showConsultationItems() {
    const box = document.getElementById('consultationBox');
    
    // 기존 아이템 제거 (3개만 유지)
    const existingItems = Array.from(box.children);
    existingItems.forEach((item, index) => {
        item.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (item.parentNode) {
                itemTimestamps.delete(item); // 타임스탬프도 삭제
                item.parentNode.removeChild(item);
            }
        }, 300);
    });
    
    // 새로운 아이템 추가 (아래에서 위로)
    setTimeout(() => {
        for (let i = 0; i < itemsPerView; i++) {
            if (currentIndex >= consultationData.length) {
                currentIndex = 0; // 데이터가 끝나면 처음부터 다시
            }
            
            // 각 아이템마다 다른 랜덤 시간 생성
            const secondsAgo = generateRandomPastTime();
            const item = createConsultationItem(consultationData[currentIndex], secondsAgo);
            box.appendChild(item);
            
            // 약간의 지연을 두고 애니메이션 적용
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * i);
            
            currentIndex++;
        }
    }, 350);
}

// 초기 실행 및 3초마다 업데이트
function initConsultation() {
    showConsultationItems();
    setInterval(showConsultationItems, 3000);
    
    // 시간 표시를 1초마다 업데이트
    setInterval(updateItemTimes, 1000);
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    initConsultation();
    
    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 문의 폼 제출 처리
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            contactForm.reset();
        });
    }

    // 미니 문의 폼 제출 처리
    const miniContactForm = document.getElementById('miniContactForm');
    if (miniContactForm) {
        miniContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            miniContactForm.reset();
        });
    }

    // 사이드 탭 문의 폼 제출 처리
    const sideContactForm = document.getElementById('sideContactForm');
    if (sideContactForm) {
        sideContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            sideContactForm.reset();
        });
    }

    // 사이드 탭 액션 버튼
    const sideApplyBtn = document.querySelector('.side-apply-btn');
    if (sideApplyBtn) {
        sideApplyBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    const sideConsultBtn = document.querySelector('.side-consult-btn');
    if (sideConsultBtn) {
        sideConsultBtn.addEventListener('click', function() {
            window.open('https://open.kakao.com/o/sNyM4Ahf', '_blank');
        });
    }


    // 메뉴 토글 (모바일 + 데스크탑)
    const menuBtn = document.getElementById('menuBtn');
    const menuPanel = document.getElementById('menuPanel');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuNavLinks = document.querySelectorAll('.menu-nav-link');

    function openMenu() {
        menuPanel.classList.add('active');
        menuOverlay.classList.add('active');
        menuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuPanel.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', openMenu);
    }

    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // 메뉴 링크 클릭 시 메뉴 닫기
    menuNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // 스크롤 이벤트로 헤더 색상 변경
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // 고정 하단 문의폼 제출 처리
    const inquiryBarForm = document.getElementById('inquiryBarForm');
    if (inquiryBarForm) {
        inquiryBarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            inquiryBarForm.reset();
        });
    }

    // TOP 버튼
    const topBtn = document.getElementById('topBtn');
    
    // 스크롤 시 TOP 버튼 표시/숨김
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (topBtn) {
            if (scrollTop > 300) {
                topBtn.classList.add('visible');
            } else {
                topBtn.classList.remove('visible');
            }
        }
    });

    // TOP 버튼 클릭 시 상단으로 스크롤
    if (topBtn) {
        topBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 모바일 카카오톡 상담 버튼
    const mobileKakaoBtn = document.querySelector('.mobile-kakao-btn');
    if (mobileKakaoBtn) {
        mobileKakaoBtn.addEventListener('click', function() {
            window.open('https://open.kakao.com/o/sNyM4Ahf', '_blank');
        });
    }

    // 모바일 1:1 상담 신청 버튼
    const mobileConsultBtn = document.querySelector('.mobile-consult-btn');
    if (mobileConsultBtn) {
        mobileConsultBtn.addEventListener('click', function() {
            // 문의 섹션으로 스크롤
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

