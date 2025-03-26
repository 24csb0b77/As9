

const toggleButton = document.getElementById('toggleButton');


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleButton.classList.add('dark-mode');
    toggleButton.textContent = 'Switch to Light Mode';
} else {
    document.body.classList.remove('dark-mode');
    toggleButton.classList.remove('dark-mode');
    toggleButton.textContent = 'Switch to Dark Mode';
}


toggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        
        document.body.classList.remove('dark-mode');
        toggleButton.classList.remove('dark-mode');
        toggleButton.textContent = 'Switch to Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        
        document.body.classList.add('dark-mode');
        toggleButton.classList.add('dark-mode');
        toggleButton.textContent = 'Switch to Light Mode';
        localStorage.setItem('theme', 'dark');
    }
});

let countdown;
let isRunning = false;
let timeLeft;

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timerDisplay = document.getElementById('timerDisplay');
const timeInput = document.getElementById('timeInput');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
    const seconds = parseInt(timeInput.value);
    if (isNaN(seconds) || seconds <= 0) return;

    timeLeft = seconds;
    isRunning = true;
    updateTimerDisplay();
    startBtn.disabled = true;
    pauseBtn.disabled = false;

    countdown = setInterval(function () {
        timeLeft--;
        updateTimerDisplay();
        changeBackgroundColor(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(countdown);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(countdown);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    timerDisplay.textContent = '00:00';
    timeInput.value = '';
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function changeBackgroundColor(timeLeft) {
    if (timeLeft > 10) {
        document.body.style.backgroundColor = 'green';
    } else if (timeLeft > 5) {
        document.body.style.backgroundColor = 'yellow';
    } else {
        document.body.style.backgroundColor = 'red';
    }
}


const listInput = document.getElementById('listInput');
const addItemBtn = document.getElementById('addItemBtn');
const sortListBtn = document.getElementById('sortListBtn');
const filterListBtn = document.getElementById('filterListBtn');
const reverseListBtn = document.getElementById('reverseListBtn');
const list = document.getElementById('list');

addItemBtn.addEventListener('click', addItem);
sortListBtn.addEventListener('click', sortList);
filterListBtn.addEventListener('click', filterList);
reverseListBtn.addEventListener('click', reverseList);

function addItem() {
    const itemText = listInput.value.trim();
    if (itemText) {
        const li = document.createElement('li');
        li.textContent = itemText;
        list.appendChild(li);
        listInput.value = '';
    }
}

function sortList() {
    const items = Array.from(list.children);
    items.sort((a, b) => a.textContent.localeCompare(b.textContent));
    list.innerHTML = '';
    items.forEach(item => list.appendChild(item));
}

function filterList() {
    const items = Array.from(list.children);
    const uniqueItems = [...new Set(items.map(item => item.textContent))];
    list.innerHTML = '';
    uniqueItems.forEach(itemText => {
        const li = document.createElement('li');
        li.textContent = itemText;
        list.appendChild(li);
    });
}

function reverseList() {
    const items = Array.from(list.children);
    list.innerHTML = '';
    items.reverse().forEach(item => list.appendChild(item));
}


const tableInput = document.getElementById('tableInput');
const addRowBtn = document.getElementById('addRowBtn');
const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

addRowBtn.addEventListener('click', addRow);

function addRow() {
    const rowData = tableInput.value.trim();
    if (rowData) {
        const row = dataTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = rowData;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => row.remove());
        cell2.appendChild(deleteBtn);
        tableInput.value = '';
    }
}

const thumbnails = document.querySelectorAll('.thumbnail');
const lightbox = document.getElementById('lightbox');
const closeBtn = document.getElementById('closeBtn');
const largeImage = document.getElementById('largeImage');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        largeImage.src = thumbnail.src;
        lightbox.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});
