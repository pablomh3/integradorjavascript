// Funciones para abrir y cerrar menu 
menuLabel = document.querySelector('.menu-label');
navbarList = document.querySelector(".navbar-list");
overlay = document.querySelector(".overlay");

const toggleMenu =() => {
  navbarList.classList.toggle('open-menu')
};



const closeWindows = () => {
  if(!navbarList.classList.contains('open-menu')) return;
  navbarList.classList.remove('open-menu');
  overlay.classList.remove('show-overlay')
}

// Función init 

const init =() => {
  menuLabel.addEventListener('click', toggleMenu);
  window.addEventListener('scroll', closeWindows);
}
init();

// validation iniciar sesión 

const iniciarSesionForm = document.querySelector(".iniciarsesion-form");
const iniciarSesionMail = document.getElementById("iniciar_email");
const iniciarSesionPassword = document.getElementById("iniciar_contraseña");

// REGEX & validate
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

const isEmpty = (value) => value === "";
const isEmailValid = (email) => EMAIL_REGEX.test(email);
const isPasswordValid = (password) => PASSWORD_REGEX.test(password);

// error & success functions 
const showError = (input, message) => {
    const formInput = input.parentElement; 
    formInput.classList.remove('success');
    formInput.classList.add('error');
    const errorContainer = formInput.querySelector("small");
    errorContainer.textContent = message;
    errorContainer.classList.add('error');
}
const showSuccess = (input) => {
    const formInput = input.parentElement;
    formInput.classList.remove("error");
    formInput.classList.add("success");
    const errorContainer = formInput.querySelector("small");
    errorContainer.textContent = "";
}

const checkEmailIniciarSesion = () => {
    let valid = false;
    const email = iniciarSesionMail.value.trim();
    if (isEmpty(email)) {
      showError(iniciarSesionMail, "El email es obligatorio");
    } else if (!isEmailValid(email)) {
      showError(iniciarSesionMail, "El email tiene un formato invalido");
    } else {
      showSuccess(iniciarSesionMail);
      valid = true;
    }
    return valid;
};
const checkPasswordIniciarSesion = () => {
    let valid = false;
    const password = iniciarSesionPassword.value.trim();
    if (isEmpty(password)) {
      showError(iniciarSesionPassword, "Debe ingresar su contraseña");
    } else if (!isPasswordValid(password)) {
      showError(iniciarSesionPassword, "Su contraseña tiene un formato inválido");
    } else {
      showSuccess(iniciarSesionPassword);
      valid = true;
    }
    return valid;
}     
iniciarSesionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const isEmailValid = checkEmailIniciarSesion();
    const isPasswordValid = checkPasswordIniciarSesion();
  
    const isFormValid = isEmailValid && isPasswordValid;
    
    if (isFormValid) {
        iniciarSesionForm.submit();
        window.alert("Sesión iniciada correctamente");
    }else {
        windows.alert("Se produjo un error");
    }
});
  
const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        fn.apply(null, args);
      }, delay);
    };
};
  
iniciarSesionForm.addEventListener("input", debounce((e) => {
      switch (e.target.id) {
        case "iniciar_email":
            checkEmailIniciarSesion();
          break;
        case "iniciar_contraseña":
            checkPasswordIniciarSesion();
          break;
        }
    })
);
  