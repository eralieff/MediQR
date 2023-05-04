const dropdown = document.querySelector('.dropdown');
const nextButton = document.querySelector('.next-button');
const textBox = document.querySelector('.textBox');

function show(value) {
    textBox.value = value;
    nextButton.classList.add('active');
}

dropdown.addEventListener('click', function() {
    nextButton.classList.toggle('nonactive');
    dropdown.classList.toggle('active');
});
