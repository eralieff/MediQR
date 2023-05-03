const overlay = document.querySelector(".overlay"),
      nextMdl = document.querySelector("#next"),
      numberMdl = document.querySelector("#number"),
      removeMdl = document.querySelector("#remove"),
      lastNumber = document.querySelector(".last-number"),
      nextNumber = document.getElementById("next-number"),
      numberVisitors = document.getElementById("number-visitors"),
      callNextBtn = document.querySelector(".call-buttons__next"),
      callNumberBtn = document.querySelector(".call-buttons__number"),
      callRemoveBtn = document.querySelector(".call-buttons__remove"),
      yesBtn = document.querySelector(".modal__buttons_yes"),
      noBtn = document.querySelector(".modal__buttons_no"),
      callBtn = document.querySelector(".modal__buttons_call"),
      removeBtn = document.getElementById("modal__buttons_remove_id"),
      closeBtn = document.querySelector(".modal__close"),
      selectionContainerNumber = document.querySelector(".modal__selection-container_number"),
      selectionContainerRemove = document.querySelector(".modal__selection-container_remove");

var numbers = ["001", "002", "003", "004"];
var currentNumberIndex = -1;
var currentNumber = numbers.length;

for (var i = 0; i < numbers.length; i++) {
    var button = document.createElement("button");
    button.classList.add("modal__selection-item", "modal__selection-item_number", "button", "title", "title_fw700", "title_fw700_fz42");
    button.innerHTML = numbers[i];
    button.onclick = function () {
        selectNumber(this);
    }
    selectionContainerNumber.appendChild(button);
}

for (var i = 0; i < numbers.length; i++) {
    var button = document.createElement("button");
    button.classList.add("modal__selection-item", "modal__selection-item_remove", "button", "title", "title_fw700", "title_fw700_fz42");
    button.innerHTML = numbers[i];
    button.onclick = function () {
        selectRemove(this);
    }
    selectionContainerRemove.appendChild(button);
}

function selectNumber(button) {
    document.getElementById("modal__buttons_call_id").disabled = false;
    
    button.classList.add("selected");
    callBtn.classList.add("active");
    var selectedButtons = document.getElementsByClassName("selected");
    for (var i = 0; i < selectedButtons.length; i++) {
        if (selectedButtons[i] !== button) {
            selectedButtons[i].classList.remove("selected");
        }
    }
}

function selectRemove(button) {
    document.getElementById("modal__buttons_remove_id").disabled = false;
    
    // Toggle the selected class
    button.classList.toggle("selected");

    // Check if any buttons are selected
    if (selectionContainerRemove.querySelectorAll(".modal__selection-item_remove.selected").length > 0) {
        // Enable the remove button
        document.getElementById("modal__buttons_remove_id").disabled = false;
        removeBtn.classList.add("active");
    } else {
        // Disable the remove button
        document.getElementById("modal__buttons_remove_id").disabled = true;
        removeBtn.classList.remove("active");
    }
}

// Event listener for remove button
removeBtn.onclick = function () {
    // Loop through the selected buttons and remove them from the array
    var selectedButtons = selectionContainerRemove.querySelectorAll(".modal__selection-item_remove.selected");
    for (var i = 0; i < selectedButtons.length; i++) {
        var number = selectedButtons[i].innerHTML;
        var index = numbers.indexOf(number);
        if (index > -1) {
            numbers.splice(index, 1);
            
            currentNumber--;

            if (currentNumber === 0) {
                numberVisitors.innerHTML = "No one in the queue";
                callNextBtn.setAttribute('disabled', true);
                callNumberBtn.setAttribute('disabled', true);
                callRemoveBtn.setAttribute('disabled', true);
            }
            else {
                document.getElementById("number-visitors-id").innerHTML = currentNumber;
                nextNumber.innerHTML = numbers[0];
            }
        }
    }

    // Clear the container and create new number buttons
    selectionContainerRemove.innerHTML = "";

    for (var i = 0; i < numbers.length; i++) {
        var button = document.createElement("button");
        button.classList.add("modal__selection-item", "modal__selection-item_remove", "button", "title", "title_fw700", "title_fw700_fz42");
        button.innerHTML = numbers[i];
        button.onclick = function () {
            selectRemove(this);
        }
        selectionContainerRemove.appendChild(button);
    }

    selectionContainerNumber.innerHTML = "";

    for (var i = 0; i < numbers.length; i++) {
        var button = document.createElement("button");
        button.classList.add("modal__selection-item", "modal__selection-item_number", "button", "title", "title_fw700", "title_fw700_fz42");
        button.innerHTML = numbers[i];
        button.onclick = function () {
            selectNumber(this);
        }
        selectionContainerNumber.appendChild(button);
    }

    // Close the modal
    overlay.classList.remove("active");
    removeMdl.classList.remove("active");

    // Disable the remove button
    removeBtn.disabled = true;
}

function callNumber() {
    var selectedButton = document.getElementsByClassName("selected")[0];
    
    var index = numbers.indexOf(selectedButton.innerHTML);
    
    numbers.splice(index, 1);
    currentNumber--;
    
    if (currentNumber === 0) {
        numberVisitors.innerHTML = "No one in the queue";
        lastNumber.innerHTML = selectedButton.innerHTML;
        callNextBtn.setAttribute('disabled', true);
        callNumberBtn.setAttribute('disabled', true);
        callRemoveBtn.setAttribute('disabled', true);
    }
    else {
        document.getElementById("number-visitors-id").innerHTML = currentNumber;
        lastNumber.innerHTML = selectedButton.innerHTML;
        nextNumber.innerHTML = numbers[0];
    }

    overlay.classList.remove("active");
    numberMdl.classList.remove("active");

    selectionContainerRemove.innerHTML = "";

    for (var i = 0; i < numbers.length; i++) {
        var button = document.createElement("button");
        button.classList.add("modal__selection-item", "modal__selection-item_remove", "button", "title", "title_fw700", "title_fw700_fz42");
        button.innerHTML = numbers[i];
        button.onclick = function () {
            selectRemove(this);
        }
        selectionContainerRemove.appendChild(button);
    }

    selectionContainerNumber.innerHTML = "";

    for (var i = 0; i < numbers.length; i++) {
        var button = document.createElement("button");
        button.classList.add("modal__selection-item", "modal__selection-item_number", "button", "title", "title_fw700", "title_fw700_fz42");
        button.innerHTML = numbers[i];
        button.onclick = function () {
            selectNumber(this);
        }
        selectionContainerNumber.appendChild(button);
    }
    
    document.getElementById("modal__buttons_call_id").disabled = true;
}

window.addEventListener("click", function (event) {
    if (event.target === overlay) {
        nextMdl.classList.remove("active");
        overlay.classList.remove("active");
        numberMdl.classList.remove("active");
        removeMdl.classList.remove("active");
    }
});

callNextBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    nextMdl.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
    nextMdl.classList.remove("active");
});

noBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
    nextMdl.classList.remove("active");
});

yesBtn.addEventListener("click", () => {
    if (currentNumber > 0) {
        lastNumber.innerHTML = numbers[0];
        numbers.splice(0, 1);
        nextNumber.innerHTML = numbers[0];
        currentNumber--;
        document.getElementById("number-visitors-id").innerHTML = currentNumber;

        selectionContainerRemove.innerHTML = "";

        for (var i = 0; i < numbers.length; i++) {
            var button = document.createElement("button");
            button.classList.add("modal__selection-item", "modal__selection-item_remove", "button", "title", "title_fw700", "title_fw700_fz42");
            button.innerHTML = numbers[i];
            button.onclick = function () {
                selectRemove(this);
            }
            selectionContainerRemove.appendChild(button);
        }

        selectionContainerNumber.innerHTML = "";

        for (var i = 0; i < numbers.length; i++) {
            var button = document.createElement("button");
            button.classList.add("modal__selection-item", "modal__selection-item_number", "button", "title", "title_fw700", "title_fw700_fz42");
            button.innerHTML = numbers[i];
            button.onclick = function () {
                selectNumber(this);
            }
            selectionContainerNumber.appendChild(button);
        }
    }

    if (currentNumber === 0) {
        numberVisitors.innerHTML = "No one in the queue";
        callNextBtn.setAttribute('disabled', true);
        callNumberBtn.setAttribute('disabled', true);
        callRemoveBtn.setAttribute('disabled', true);
    }

    overlay.classList.remove("active");
    nextMdl.classList.remove("active");
});

callNumberBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    numberMdl.classList.add("active");
});

callRemoveBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    removeMdl.classList.add("active");
});