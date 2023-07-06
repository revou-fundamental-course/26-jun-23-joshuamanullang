const buttons = document.querySelectorAll("[data-carousel-btn]");
const dots = document.querySelectorAll("[data-carousel-dot]");

function slide(button) {
  return () => {
    const offset = button.dataset.carouselBtn === "next" ? 1 : -1;
    const slidesContainer = button
      .closest("[data-carousel]")
      .querySelector("[data-carousel-slides]");
    const slides = slidesContainer.querySelectorAll("[data-carousel-slide]");
    const activeSlide = slidesContainer.querySelector("[data-active]");
    const activeSlideIndex = Array.from(slides).indexOf(activeSlide);
    let nextSlideIndex = activeSlideIndex + offset;

    if (nextSlideIndex === -1) {
      nextSlideIndex = slides.length - 1;
    } else if (nextSlideIndex === slides.length) {
      nextSlideIndex = 0;
    }

    moveDot(nextSlideIndex)();

    slides[activeSlideIndex].removeAttribute("data-active");
    slides[nextSlideIndex].setAttribute("data-active", true);
  };
}

function moveDot(index) {
  return () => {
    dots.forEach((dot) => dot.removeAttribute("data-active"));
    dots[index].setAttribute("data-active", true);
  };
}

window.addEventListener("DOMContentLoaded", () => {
  buttons.forEach((button) => button.addEventListener("click", slide(button)));

  setInterval(() => {
    const nextButton = document.querySelector("[data-carousel-btn='next']");
    slide(nextButton)();
  }, 3500);
});

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");

email.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    validateInputs();
  }
});

username.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (isUsernameValid()) {
      e.target.blur();
      email.focus();
    } else {
      setError(username, "*Nama pengguna harus terdiri dari 2 kata");
    }
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
});

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  if (usernameValue === "") {
    setError(username, "*Nama pengguna wajib diisi");
  } else if (!isValidUsername(usernameValue)) {
    setError(username, "*Nama pengguna harus terdiri dari 2 kata");
  } else {
    setSuccess(username);
  }
  if (emailValue === "") {
    setError(email, "*Email wajib diisi");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Masukkan alamat email yang valid!");
  } else {
    setSuccess(email);
  }
};

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const isValidUsername = (username) => {
  const words = username.trim().split(" ");
  return words.length === 2 && !hasSymbols(username);
};

const hasSymbols = (text) => {
  const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  return symbolRegex.test(text);
};

const isUsernameValid = () => {
  const usernameValue = username.value.trim();
  return isValidUsername(usernameValue);
};

// Mengecek input username saat halaman dimuat

username.addEventListener("input", () => {
  const usernameValue = username.value.trim();
  if (usernameValue !== "") {
    setSuccess(username);
  }
});
