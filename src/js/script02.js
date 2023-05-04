const progressBar = document.querySelector('.circular-progress');
const overlay = document.querySelector('.overlay');
const leaveModal = document.querySelector('#leave');
const congratsModal = document.querySelector('#congrats');
const leaveBtn = document.querySelector('.leave-button');
const cancelBtn = document.querySelector('.modal__buttons_cancel');
const closeBtns = document.querySelectorAll('.modal__close');
const clearBtn = document.querySelector('.modal__buttons_clear');
const numberOfPeople = document.querySelector('.number-of-people');
const waitingTime = document.querySelector('.waiting-time');
const notificationBtn = document.querySelector('.notification-button');

let progressValue = 0;
let progressEndValue = 50;
const speed = 15;

const setProgress = () => {
  progressValue++;
  progressBar.style.background = `conic-gradient(#85D4FF ${progressValue * 3.6}deg, #BCE8FF ${progressValue * 3.6}deg)`;
  if (progressValue === progressEndValue) {
    clearInterval(progress);
  }
};

let progress = setInterval(setProgress, speed);

const closeModal = () => {
  overlay.classList.remove('active');
  leaveModal.classList.remove('active');
  congratsModal.classList.remove('active');
};

overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    closeModal();
  }
});

leaveBtn.addEventListener('click', () => {
  overlay.classList.add('active');
  leaveModal.classList.add('active');
});

for (const closeBtn of closeBtns) {
  closeBtn.addEventListener('click', closeModal);
}

cancelBtn.addEventListener('click', closeModal);

const showCongratsModal = () => {
  leaveBtn.classList.add('inactive');
  notificationBtn.classList.add('inactive');
  progressBar.classList.add('center');
  overlay.classList.add('active');
  congratsModal.classList.add('active');
  progressValue++;
  progressBar.style.background = `conic-gradient(#7EFFBA ${progressValue * 3.6}deg, #7EFFBA ${progressValue * 3.6}deg)`;
  if (progressValue === 100) {
    clearInterval(progressDone);
  }
  numberOfPeople.textContent = "It's your turn now";
  waitingTime.textContent = 'You have been called!';
};

let progressDone = setTimeout(showCongratsModal, 8000);

clearBtn.addEventListener('click', closeModal);

document.getElementById('congrats__close').addEventListener('click', closeModal);
