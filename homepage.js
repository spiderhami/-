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

/* 自动轮播 */
const lunboArea = document.querySelector('.lb');
const radioButtons = document.querySelectorAll('input[name="lunbo"]');
let timer;
lunboArea.addEventListener('mouseenter', () => clearInterval(timer));
lunboArea.addEventListener('mouseleave', () => autoLunbo());

function autoLunbo() {
    timer = setInterval(() => {
        cursor++;
        cursorHelper();
        transitionHelper();
        radioButtons[cursor].checked = true;
    }, 2000);
}

window.onload = autoLunbo;

/* 轮播控制 */
const lunboSrc = ['images/lunbo-1.jpg', 'images/lunbo-2.jpg', 'images/lunbo-3.jpg'];
let cursor = 0;
let isFlip = true;
let isTransitionEnd = true;

const next = document.getElementById('lunbo-next');
const pre = document.getElementById('lunbo-pre');
const container1 = document.getElementById('lunbo-container-1');
const container2 = document.getElementById('lunbo-container-2');
const radioButtonsArray = Array.from(radioButtons);

next.addEventListener('click', lunbo);
pre.addEventListener('click', lunbo);
container1.addEventListener('transitionend', () => isTransitionEnd = true);
radioButtons.forEach(btn => btn.addEventListener('click', changeCursor));

function lunbo() {
    if (!isTransitionEnd) {
        return;
    }
    cursor = (this.id === 'lunbo-next')? (cursor+1) : (cursor-1);
    cursorHelper();
    transitionHelper();
}

function cursorHelper() {
    const length = lunboSrc.length;
    cursor = (cursor + length) % length;
}

function transitionHelper() {
    if (isFlip) {
        container2.setAttribute('src', lunboSrc[cursor]);
    } else {
        container1.setAttribute('src', lunboSrc[cursor]);
    }
    isFlip = !isFlip;
    container1.classList.toggle('show');
    container2.classList.toggle('show');
    isTransitionEnd = false;
}

function changeCursor() {
    const index = radioButtonsArray.indexOf(this);
    if (cursor !== index) {
        cursor = index;
        transitionHelper();
    }
}
