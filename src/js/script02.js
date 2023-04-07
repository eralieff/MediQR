let progressBar = document.querySelector(".circular-progress");

let progressValue = 0;
let progressEndValue = 50;
let speed = 15;

let progress = setInterval(() => {
  progressValue++;
  progressBar.style.background = `conic-gradient(
      #85D4FF ${progressValue * 3.6}deg,
      #BCE8FF ${progressValue * 3.6}deg
  )`;
  if (progressValue == progressEndValue) {
    clearInterval(progress);
  }
}, speed);

const overlay = document.querySelector(".overlay"),
      leaveMdl = document.querySelector("#leave"),
      leaveBtn = document.querySelector(".leave-button"),
      cancelBtn = document.querySelector(".modal__buttons_cancel"),
      closeBtn = document.querySelector(".modal__close"),
      congratsMdl = document.querySelector("#congrats"),
      clearBtn = document.querySelector(".modal__buttons_clear");

leaveBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  leaveMdl.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
  leaveMdl.classList.remove("active");
});

cancelBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
  leaveMdl.classList.remove("active");
});

let numberOfPeople = document.querySelector(".number-of-people");
let waitingTime = document.querySelector(".waiting-time");
let notificationBtn = document.querySelector(".notification-button");

let progressDone = setTimeout(() => {
  leaveBtn.classList.add("inactive");
  notificationBtn.classList.add("inactive");
  progressBar.classList.add("center");
  overlay.classList.add("active");
  congratsMdl.classList.add("active");
  progressValue++;
  progressBar.style.background = `conic-gradient(
      #7EFFBA ${progressValue * 3.6}deg,
      #7EFFBA ${progressValue * 3.6}deg
  )`;
  if (progressValue == 100) {
    clearInterval(progressDone);
  }
  numberOfPeople.textContent = "it's your turn now";
  waitingTime.textContent = "You have been called!"
}, 8000);

clearBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
  congratsMdl.classList.remove("active");
});

document.getElementById("congrats__close").addEventListener("click", () => {
  overlay.classList.remove("active");
  congratsMdl.classList.remove("active");
});