const form = document.getElementById('form');
const username = document.getElementById('name');
const surname = document.getElementById('surname');
const patronymic = document.getElementById('patronymic');
const phone = document.getElementById('phone');
const room = document.getElementById('room');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const reasons = document.getElementById('reasons');
const dropdown = document.querySelector('.form__input_dropdown');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const phoneMask = new IMask(phone, {
    mask: "+{7} 700 000 00 00",
    lazy: false
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const surnameValue = surname.value.trim();
    const patronymicValue = patronymic.value.trim();
    // const phoneValue = phone.value.trim();
    const phoneValue = phoneMask.unmaskedValue;
    const roomValue = room.value.trim();

    let isFormValid = true; // Flag to track overall form validity
    let isAtLeastOneChecked = false; // Flag to track checkbox validation

    // Validate Name
    if (usernameValue === '') {
        setError(username, 'Please enter your name');
        isFormValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(usernameValue)) {
        setError(username, 'Name should only contain letters and spaces');
        isFormValid = false;
    } else {
        setSuccess(username);
    }

    // Validate Surname
    if (surnameValue === '') {
        setError(surname, 'Please enter your surname');
        isFormValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(surnameValue)) {
        setError(surname, 'Surname should only contain letters and spaces');
        isFormValid = false;
    } else {
        setSuccess(surname);
    }

    // Validate Patronymic (optional)
    if (patronymicValue !== '' && !/^[a-zA-Z\s]+$/.test(patronymicValue)) {
        setError(patronymic, 'Patronymic should only contain letters and spaces');
        isFormValid = false;
    } else {
        if (patronymicValue !== '') {
            setSuccess(patronymic);
        } else {
            const inputControl = patronymic.parentElement;
            const errorDisplay = inputControl.querySelector('.error');
            errorDisplay.innerText = '';
            inputControl.classList.remove('error', 'success');
        }
    }

    // Validate Phone number
    if (!phoneValue) {
        setError(phone, 'Phone number is required');
        isFormValid = false;
    } else if (!phoneMask.masked) {
        setError(phone, 'Please enter a valid phone number');
        isFormValid = false;
    } else if (!/^\d{10}$/.test(phoneValue)) {
        setError(phone, 'Phone number should be a 10-digit number');
        isFormValid = false;
    } else {
        setSuccess(phone);
    }

    // Validate Room number
    if (roomValue === '') {
        setError(room, 'Please enter the room number');
        isFormValid = false;
    } else if (!/^\d+$/.test(roomValue)) {
        setError(room, 'Room number should be a valid number');
        isFormValid = false;
    } else {
        setSuccess(room);
    }

    // Validate Reasons to visit
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            isAtLeastOneChecked = true;
            setSuccess(reasons);
        }
    });

    if (!isAtLeastOneChecked) {
        setError(reasons, 'Please select at least one reason');
        isFormValid = false;
    }
    
    // Submit the form if all required fields are valid
    if (isFormValid) {
        form.submit();
    }
};

dropdown.addEventListener('click', function() {
    dropdown.classList.toggle('active');
});