// function toggleHistory(show) {
//     const history = document.getElementById("search-history");
//     history.style.display = show ? "block" : "none";
//     const btn_close = document.getElementById("close-search");
//     btn_close.style.display = show ? "block" : "none";
// }

// function closeHistory() {
//     const btn_close = document.getElementById("search-history");
//     btn_close.style.display = "none";
// }


// ===== Query elements =====
const menuBtn = document.getElementById('menuBtn');         // <li id="menuBtn"> (bọc button)
const menuButtonEl = menuBtn?.querySelector('button.nav__menu'); // chính nút "Danh mục"
const dropMenu = document.querySelector('.dropMenu');

const searchInput = document.querySelector('.nav-search-input input');
const searchBox = document.querySelector('.nav-search-box');
const searchSuggest = document.getElementById('search-history');
const searchClose = document.getElementById('close-search');

const pageDim = document.querySelector('.page-dim');

// ===== State helpers =====
function openDim() { pageDim?.classList.add('show'); document.body.classList.add('no-scroll'); }
function closeDim() { pageDim?.classList.remove('show'); document.body.classList.remove('no-scroll'); }

function openMenu() {
    dropMenu?.classList.add('is-open');
    menuButtonEl?.setAttribute('aria-expanded', 'true');
    openDim();
}
function closeMenu() {
    dropMenu?.classList.remove('is-open');
    menuButtonEl?.setAttribute('aria-expanded', 'false');
}

function openSearch() {
    searchSuggest?.classList.add('is-open');
    searchClose?.classList.add('show');
    openDim();
}
function closeSearch() {
    searchSuggest?.classList.remove('is-open');
    searchClose?.classList.remove('show');
}

function closeAll() {
    closeMenu();
    closeSearch();
    closeDim();
}

// ===== Event wiring =====

// Toggle menu khi bấm "Danh mục"
menuButtonEl?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropMenu?.classList.contains('is-open');
    closeAll();
    if (!isOpen) openMenu();
});

// Mở search suggest khi focus/click vào ô search
searchInput?.addEventListener('focus', (e) => {
    e.stopPropagation();
    // Không đóng menu nếu bạn muốn cho phép song song; ở đây mình đóng để đơn giản UX
    closeMenu();
    openSearch();
});
searchInput?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
    openSearch();
});

// Nút X đóng search
searchClose?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeSearch();
    // nếu menu cũng không mở thì tắt dim
    if (!dropMenu?.classList.contains('is-open')) closeDim();
});

// Click trong dropMenu không làm đóng nó
dropMenu?.addEventListener('click', (e) => e.stopPropagation());
// Click trong vùng search box không đóng suggest
searchBox?.addEventListener('click', (e) => e.stopPropagation());

// Click ra ngoài (document + lớp dim) => đóng hết
document.addEventListener('click', () => closeAll());
pageDim?.addEventListener('click', () => closeAll());

// Đóng bằng phím ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
});

// Tự vệ: khi resize → đóng mọi thứ để tránh lệch vị trí
window.addEventListener('resize', closeAll);

// ARIA basic
menuButtonEl?.setAttribute('aria-haspopup', 'true');
menuButtonEl?.setAttribute('aria-expanded', 'false');

