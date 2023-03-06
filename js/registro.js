// Funciones para abrir y cerrar menu y carrito + overlay
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
// validation registro
const formRegister = document.querySelector(".register-form")
const nameRegister = document.getElementById("register_name")
const passwordRegister = document.getElementById("register_password")
const lastRegister = document.getElementById("register_last")
const mailRegister = document.getElementById("register_mail")
const phoneRegister = document.getElementById("register_phone")
const bornRegister = document.getElementById("register_born")

//REGEX
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;

// validate functions 
const isEmpty = value => value === '';
const isBetween = (length, min, max) => length > min && length < max;
const minLength = (length, min) => length > min;
const isEmailValid = (email) => EMAIL_REGEX.test(email);
const isPasswordValid = (password) => PASSWORD_REGEX.test(password);
const isPhoneValid = (phone) => PHONE_REGEX.test(phone);

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
// check Registro functions 
const checkNameRegister = () => {
    let valid = false; 
    const min = 3;
    const name = nameRegister.value.trim();
    if (isEmpty (name)){
        showError(nameRegister, "Debes llenar este espacio con tu nombre");
    } else if (!minLength (name.length, min)) {
        showError(nameRegister, `El nombre es demasiado corto`)
    } else {
        showSuccess(nameRegister);
        valid = true;
    }
    return valid;
   };
  const checkLastNameRegister = () => {
    let valid = false;
    const min = 3;
    const lastName = lastRegister.value.trim();
    if (isEmpty(lastName)) {
        showError(lastRegister, 'El apellido es obligatrorio');
    } else if (!minLength (lastName.length, min)) {
     showError(lastRegister, `El apellido es demasiado corto`)
     } else {
        showSuccess(lastRegister);
        valid = true;
      }
      return valid;
    };
    const checkPasswordRegister = () => {
      let valid = false;
      const password = passwordRegister.value.trim();
      if (isEmpty(password)) {
        showError(passwordRegister, "La contraseña es obligatoria");
      } else if (!isPasswordValid(password)) {
        showError(passwordRegister, "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un simbolo.");
      } else {
        showSuccess(passwordRegister);
        valid = true;
      }
      return valid;
    }   
  const checkEmailRegister = () => {
    let valid = false;
    const email = mailRegister.value.trim();
    if (isEmpty(email)) {
      showError(mailRegister, "El email es obligatorio");
    } else if (!isEmailValid(email)) {
      showError(mailRegister, "El email es invalido");
    } else {
      showSuccess(mailRegister);
      valid = true;
    }
    return valid;
  };
  
  const checkPhoneRegister = () => {
    let valid = false;
    const phone = phoneRegister.value.trim();
    if (isEmpty(phone)) {
      showError(phoneRegister, "El número de teléfono es obligatorio");
    } else if (!isPhoneValid(phone)) {
      showError(phoneRegister, "El teléfono no es valido");
    } else {
      showSuccess(phoneRegister);
      valid = true;
    }
    return valid;
  };
  
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const isNameValid = checkNameRegister();
    const isPasswordValid = checkPasswordRegister();
    const isLastNameValid = checkLastNameRegister();
    const isEmailValid = checkEmailRegister();
    const isPhoneValid = checkPhoneRegister();
  
    const isFormValid = isNameValid && isPasswordValid && isLastNameValid && isEmailValid && isPhoneValid;
  
    if (isFormValid) {
      formRegister.submit();
      window.alert("Se registró correctamente");
    }else {
          console.log("error");
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
  formRegister.addEventListener("input", debounce((e) => {
    switch (e.target.id) {
      case "register_name":
        checkNameRegister();
        break; 
      case "register_last":
        checkLastNameRegister();
        break;
      case "register_password":
          checkPasswordRegister();
          break; 
      case "register_mail":
        checkEmailRegister();
        break;
      case "register_message":
        checkMessageRegister();
        break;
      case "register_phone":
        checkPhoneRegister();
        break;
    }
  })
  );
  