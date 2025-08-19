'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// programming_tools variables
const programming_toolsItem = document.querySelectorAll("[data-programming_tools-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const programming_toolsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < programming_toolsItem.length; i++) {

  programming_toolsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-programming_tools-avatar]").src;
    modalImg.alt = this.querySelector("[data-programming_tools-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-programming_tools-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-programming_tools-text]").innerHTML;

    programming_toolsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", programming_toolsModalFunc);
overlay.addEventListener("click", programming_toolsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

document.querySelector('.avatar-image').addEventListener('click', function () {
  const image = this;

  // Add the "shake" class
  image.classList.add('shake');

  // Remove the "shake" class after the animation ends
  image.addEventListener('animationend', function () {
    image.classList.remove('shake');
  }, { once: true });
});


// List of qualifiers to cycle through
const titles = [
  "Software Engineer",
  "Data Scientist",
  "Quant Analyst",
  "AI & ML Dev",
  "Fintech Builder",
  "Sailor"
];


let currentIndex = 0;
const titleElement = document.getElementById("dynamic-title");

// Function to update the title
function updateTitle() {
  currentIndex = (currentIndex + 1) % titles.length; // Loop back to the start when reaching the end
  titleElement.textContent = titles[currentIndex];
}

// Change the title every 1.5
setInterval(updateTitle, 1500);

function sendMail() {
  // Collect input values
  const name = document.getElementById("fname").value.trim();
  const email = document.getElementById("e-mail").value.trim();
  const message = document.getElementById("mssg").value.trim();

  // Validation checks
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const errors = [];

  if (name.length < 2) {
    errors.push("Ensure name is at least 2 characters long.");
  }

  if (!emailRegex.test(email)) {
    errors.push("Ensure a valid email is used.");
  }

  if (message.length < 5) {
    errors.push("Message must be at least 5 characters.");
  }

  // Display errors if any
  if (errors.length > 0) {
    console.error("Validation Errors: ", errors);
    alert("Your message couldn't be sent due to these errors:\n" + errors.join("\n"));
    return; // Stop execution if validation fails
  }

  // If validation passes, prepare parameters
  const params = {
    name,
    email,
    message
  };

  // Send email using emailjs
  emailjs.send("service_4xjs1jr", "template_5m0iqcp", params)
    .then(() => {
      alert("Your message has been sent.");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      alert("Failed to send message. Please try again.");
    });
}

