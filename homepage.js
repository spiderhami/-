const dropdownItems = {
    xiaomi: [{
        src: "images/dropdown-1-1.webp",
        name: "小米CC9 Pro",
        price: "2799元起"
        }
    ],
    hongmi: [{
        src: "images/dropdown-2-1.webp",
        name: "Redmi K20 Pro",
        price: "2399元起"
    }]
};

const ddMenu = document.getElementById('dropdown-menu');
const itemsImages = ddMenu.querySelectorAll('.dd-img');
const itemsNames = ddMenu.querySelectorAll('.dd-pn');
const itemsPrices = ddMenu.querySelectorAll('.dd-ppr');

const ddNav = document.getElementById('dropdown-nav');
const navLi = ddNav.querySelectorAll('li');

//ddNav.addEventListener('mouseover', display);
navLi.forEach(li => li.addEventListener('mouseenter', display));
navLi.forEach(li => li.addEventListener('mouseleave', hide));
ddMenu.addEventListener('mouseenter', () => ddMenu.classList.add('active'));
ddMenu.addEventListener('mouseleave', () => ddMenu.classList.remove('active'));

function display(e) {
    const key = e.target.dataset.ctg;
    const classes = ddMenu.classList;
    if (!key) {
        return;
    }
    itemsImages.forEach(img => img.src = dropdownItems[key][0].src);
    itemsNames.forEach(name => name.innerText = dropdownItems[key][0].name);
    itemsPrices.forEach(price => price.innerText = dropdownItems[key][0].price);
    if (!classes.contains('active')) {
        classes.add('active');
    }
}

function hide() {
    const classes = ddMenu.classList;
    if (classes.contains('active')) {
        classes.remove('active');
    }
}

/* 标签按钮 */
const labels = document.querySelectorAll('.tgtag-lab');
labels.forEach(label => label.addEventListener('mouseenter', function() {this.click();}));



/**
 * 1. 页面自动轮播
 * 2. 鼠标进入轮播图片区域后，自动轮播取消；离开区域，自动轮播恢复
 * 
 */
const listCarousel = document.querySelectorAll('.lb-list img');
const buttonPrev = document.getElementById('lunbo-pre');
const buttonNext = document.getElementById('lunbo-next');
const listIndicator = document.querySelectorAll('#indicator li [type="radio"]');
const divCarouselArea = document.querySelector('.lb');
let currentIndex = 0;
let timer;

buttonPrev.addEventListener('click', () => handleArrowClick(-1));
buttonNext.addEventListener('click', () => handleArrowClick(1));
divCarouselArea.addEventListener('mouseenter', () => clearInterval(timer));
divCarouselArea.addEventListener('mouseleave', autoCarousel);
listIndicator.forEach((item, index) => item.addEventListener('click', () => handleIndicatorClick(index)));

function handleArrowClick(step) {
    const totalCarousel = listCarousel.length;
    let prevIndex = currentIndex;
    currentIndex = (currentIndex + step + totalCarousel) % totalCarousel;
    shiftImage(prevIndex, currentIndex);
}

function handleIndicatorClick(indexIndicator) {
    let prev = currentIndex;
    currentIndex = indexIndicator;
    shiftImage(prev, currentIndex);
}

function shiftImage(prevIndex, currentIndex) {
    listCarousel.forEach((item, index) => {
        if (index === prevIndex) {
            item.classList.remove('show');
        }
        if (index === currentIndex) {
            item.classList.add('show');
            listIndicator[index].checked = true;
        }
    });
}

function autoCarousel() {
    timer = setInterval(() => buttonNext.click(), 3000);
}

autoCarousel();
