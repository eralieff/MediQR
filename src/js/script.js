const dropdown = document.querySelector('.dropdown');
const next_button = document.querySelector('.next-button');
const textBox = document.querySelector('.textBox');

function show(anything) {
    textBox.value = anything;
    next_button.classList.add('active');
}

dropdown.onclick = function() {
    next_button.classList.toggle('nonactive');
    dropdown.classList.toggle('active');
}