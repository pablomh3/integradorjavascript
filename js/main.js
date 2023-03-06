 
              // Agregar cards al HTML, manejar categorías y carrito 

// Referencias al HTML 
cartContainer = document.querySelector(".cart")
productsCart = document.querySelector(".cart-container");
cartTotal = document.querySelector(".cart-total");
total = document.querySelector(".total")
buttonBuy = document.querySelector(".cart-button");
buttonDelete = document.querySelector('.cart-button-empty')
modal = document.querySelector('.add-modal')
cartLabel = document.querySelector(".cart-label");
menuLabel = document.querySelector('.menu-label');
overlay = document.querySelector(".overlay");
navbarList = document.querySelector(".navbar-list");
productsSection = document.querySelector(".productos-container");
productsCards = document.querySelector(".productos-cards");
categoriesList = document.querySelectorAll(".producto-seccion");
buttonVerMas = document.querySelector(".btn-vermas");

// guardar en Local Storage lo que hay en el carrito 

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem('cart', JSON.stringify(cartList))
}


//Renderizar cards

const renderCard = (card) => {
const { id, name, price, img } = card 
return `<div class="card">
  <img src=${img} alt=${name} class="card-img">
  <div class="card-h3">
    <h3>${name}</h3>
  </div>
  <div class="card-precio">
    <p> $ ${price}</p>
  </div>
  <div class= "agregar-button">
    <button class="cart-agregar"
      data-id='${id}'
      data-name='${name}'
      data-price='${price}'
      data-img='${img}'>
      AGREGAR AL CARRITO
    </button>
  </div>
</div>`
}

const renderDividedCards = (index = 0) => {
  productsCards.innerHTML += cardsController.dividedCards[index].map(renderCard).join('');
}

const renderFilteredCards = category => {
  const arrayList = products.filter((product) => product.category === category);
  productsCards.innerHTML = arrayList.map(renderCard).join('');
};

const renderCardsCategory = (index = 0, category = undefined) => {
  if(!category) {
    renderDividedCards(index)
    return;
  }
  renderFilteredCards(category);
};

// Filtrar por categoría 

const showMoreBtn = category => {
  if (!category){
    buttonVerMas.classList.remove('hidden')
    return;
  }
  buttonVerMas.classList.add('hidden');
}

const changeBtnActive = (selectedCategory) =>{
 const categories = [...categoriesList];
 categories.forEach((categoryBtn) =>{
  if(categoryBtn.dataset.category !== selectedCategory){
    categoryBtn.classList.remove('active');
    return;
  }
  categoryBtn.classList.add('active');
 });
}

const changeFilterState = (e) =>{
  const selectedCategory = e.target.dataset.category
  changeBtnActive(selectedCategory);
  showMoreBtn(selectedCategory);
}

const applyFilter = (e) =>{
  if(!e.target.classList.contains('producto-seccion')) return;
  changeFilterState(e);
  if(!e.target.dataset.category){
    productsCards.innerHTML = '';
    renderCardsCategory();
  } else {
    renderCardsCategory(0, e.target.dataset.category);
    cardsController.nextProductsIndex = 1;
  }
};

const isLastIndexOf = () =>
cardsController.nextProductsIndex === cardsController.cardsLimit;

// Funcion para mostrar mas cards
const showMore = () => {
  renderCardsCategory(cardsController.nextProductsIndex);
  cardsController.nextProductsIndex++;
  if (isLastIndexOf()) {
    buttonVerMas.classList.add("hidden");
  }
};

// Funciones para abrir y cerrar menu y carrito + overlay

const toggleMenu =() => {
  navbarList.classList.toggle('open-menu')
  if(cartContainer.classList.contains('open-cart')){
    cartContainer.classList.remove('open-cart');
    return;
  }overlay.classList.toggle('show-overlay');
};

const toggleCart =() => {
  cartContainer.classList.toggle('open-cart');
  if(navbarList.classList.contains('open-menu')){
    navbarList.classList.remove('open-menu')
    return;
  }overlay.classList.toggle('show-overlay')
}

const closeWindows = () => {
  if(!cartContainer.classList.contains('open-cart') && !navbarList.classList.contains('open-menu')) return;
  cartContainer.classList.remove('open-cart');
  navbarList.classList.remove('open-menu');
  overlay.classList.remove('show-overlay')
}

const closeOnClick = (e) => {
  if (!e.target.classList.contains('navbar-link')) return;
  navbarList.classList.remove('open-menu');
  overlay.classList.remove('show-overlay');
};

const closeOnOverlay = () => {
  navbarList.classList.remove('open-menu');
  cartContainer.classList.remove('open-cart');
  overlay.classList.remove('show-overlay');
};
// Funcionamiento del carrito 

const renderCart = (cartProduct) => {
  const { id, name, price, img, quantity} = cartProduct;
  return `<div class="cart-product">
  <img src=${img} alt="producto">
  <div class="cart-info">
    <h3 class="title-cart">${name}</h3>
    <p class="cart-price">$ ${price}</p>
  </div>
  <div class="cart-handler">
    <span class="quantity-handler down" data-id=${id}>-</span>
    <span class="item-quantity">${quantity}</span>
    <span class="quantity-handler up" data-id=${id}>+</span>
  </div>
</div>`
}

const renderCartInit = () => {
  if(!cart.length){
    productsCart.innerHTML = '<p class= "empty-cart"> No hay productos en el carrito</p>'
    return;
  }
  productsCart.innerHTML = cart.map(renderCart).join("");
}

const CartTotal = () =>{
  return cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0)
}

const showTotal = () => {
  total.innerHTML= `$ ${CartTotal().toFixed(2)}`;
}

const disableButtons =(btn) => {
  if(!cart.length) {
    btn.classList.add('disabled');
  }else {
    btn.classList.remove('disabled');
  }
};

const productData = (id, name, price, img) => {
  return { id, name, price, img };
}

const isExistingProduct = (product) =>{
  return cart.find((item) => item.id === product.id);
}

const addUnit = (product) =>{
cart = cart.map ((cartProduct) =>{
return cartProduct.id === product.id 
? { ...cartProduct, quantity: cartProduct.quantity +1 } 
: cartProduct;
 });
};

const createCartProduct = (product) => {
cart = [...cart, { ...product, quantity: 1 }];
};

const showModal = (message) =>{
modal.classList.add('active-modal');
modal.textContent = message;
setTimeout(()=>{
modal.classList.remove('active-modal')
}, 1500)
};

const cartStatus = () =>{
  saveLocalStorage(cart);
  renderCartInit(cart);
  showTotal(cart);
  disableButtons(buttonBuy);
  disableButtons(buttonDelete);
};

const addProduct = (e) => {
  if (!e.target.classList.contains("cart-agregar")) return;
  const { id, name, price, img } = e.target.dataset;
  const product = productData (id, name, price, img);
  if(isExistingProduct(product)){
    addUnit(product)
    showModal('Se agregó una unidad al carrito')
  }else{
    createCartProduct(product)
    showModal('Se agregó el producto al carrito')
  }
  cartStatus();
};

const removeProduct = (existingProduct) =>{
cart = cart.filter(product => product.id !== existingProduct.id);
cartStatus();
};

const plusProduct = (existingProduct) =>{
  cart = cart.map(product => {
    return product.id === existingProduct.id ? { ...product,quantity: 
     Number(product.quantity +1)}
     : product;
  })
  cartStatus();
  }

const minusProduct = (existingProduct) =>{
cart = cart.map(product => {
  return product.id === existingProduct.id ? { ...product,quantity: 
   Number(product.quantity -1)}
   : product;
})
cartStatus();
}

const handleMinusBtn = (id) =>{
  const findCartProduct = cart.find(item => item.id === id);
  if(findCartProduct.quantity === 1){
    if(window.confirm("¿Seguro que querés borrar el producto del carrito?")){
      removeProduct(findCartProduct);
    }
    return;
  }
  minusProduct(findCartProduct);
}
const handlePlusBtn = (id) =>{
  const findCartProduct = cart.find(item => item.id === id);
  addUnit(findCartProduct);
  cartStatus();
};

const handleQuantity =(e) =>{
  if(e.target.classList.contains('down')){
    handleMinusBtn(e.target.dataset.id);
  } else if (e.target.classList.contains('up')){
    handlePlusBtn (e.target.dataset.id);
  }
  cartStatus;
};

const emptyCart = () =>{
  cart = [];
  cartStatus ();
};

const cartAction = (confirm,success) =>{
if (!cart.length) return;
if (window.confirm(confirm)){
  emptyCart();
  alert(success);
}};

const buyProducts = () =>{
cartAction('¿Querés completar tu compra?', '¡Gracias por tu compra! :)')
};

const deleteCart = () => {
cartAction('¿Seguro que querés vaciar el carrito?', 'El carrito está vacío')
};

// Función init 

function init() {
  renderCardsCategory();
  productsSection.addEventListener('click', applyFilter);
  buttonVerMas.addEventListener('click', showMore);
  cartLabel.addEventListener('click', toggleCart);
  menuLabel.addEventListener('click', toggleMenu);
  window.addEventListener('scroll', closeWindows);
  navbarList.addEventListener('click', closeOnClick);
  overlay.addEventListener('click', closeOnOverlay);
  document.addEventListener('DOMContentLoaded', renderCartInit);
  document.addEventListener('DOMContentLoaded', showTotal);
  productsCards.addEventListener('click', addProduct);
  productsCart.addEventListener('click', handleQuantity);
  disableButtons(buttonBuy);
  disableButtons(buttonDelete); 
  buttonBuy.addEventListener('click', buyProducts);
  buttonDelete.addEventListener('click', deleteCart);
}
init();



                //validation contacto

//Referencias HTML              
const formContact = document.querySelector(".contact-form")
const nameContact = document.getElementById("contact_name")
const lastContact = document.getElementById("contact_last")
const mailContact = document.getElementById("contact_mail")
const phoneContact = document.getElementById("contact_phone")
const messageContact = document.getElementById("contact_message")


//REGEX
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const PHONE_REGEX = /^[0-9]{10}$/;

// validate functions 
const isEmpty = value => value === '';
const minLength = (length, min) => length > min;
const isEmailValid = (email) => EMAIL_REGEX.test(email);
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

// check Conctact functions 
const checkNameContact = () => {
  let valid = false; 
  const min = 3;
  const name = nameContact.value.trim();
  if (isEmpty (name)){
      showError(nameContact, "Debes llenar este espacio con tu nombre");
  } else if (!minLength (name.length, min)) {
      showError(nameContact, `El nombre es demasiado corto`)
  } else {
      showSuccess(nameContact);
      valid = true;
  }
  return valid;
 };

 const checkLastNameContact = () => {
     let valid = false;
     const min = 3;
     const lastName = lastContact.value.trim();
     if (isEmpty(lastName)) {
         showError(lastContact, 'El apellido es obligatrorio');
     } else if (!minLength (lastName.length, min)) {
      showError(lastContact, `El apellido es demasiado corto`)
      } else {
         showSuccess(lastContact);
         valid = true;
       }
       return valid;
     };
 const checkEmailContact = () => {
     let valid = false;
     const email = mailContact.value.trim();
     if (isEmpty(email)) {
       showError(mailContact, "El email es obligatorio");
     } else if (!isEmailValid(email)) {
       showError(mailContact, "El email es invalido");
     } else {
       showSuccess(mailContact);
       valid = true;
     }
     return valid;
   };
   const checkPhoneContact = () => {
     let valid = false;
     const phone = phoneContact.value.trim();
     if (isEmpty(phone)) {
       showError(phoneContact, "El número de teléfono es obligatorio");
     } else if (!isPhoneValid(phone)) {
       showError(phoneContact, "El teléfono no es valido");
     } else {
       showSuccess(phoneContact);
       valid = true;
     }
     return valid;
   };
   const checkMessageContact = () => {
     let valid = false; 
     const min = 10;
     const message = messageContact.value.trim();
     if (isEmpty (message)){
         showError(messageContact, "Debes llenar este espacio con tu consulta");
     } else if (!minLength (message.length, min)) {
         showError(messageContact, "El mensaje es demasiado corto")
     } else {
         showSuccess(messageContact);
         valid = true;
     }
     return valid;
   }
   formContact.addEventListener("submit", (e) => {
     e.preventDefault();
   
     const isNameValid = checkNameContact();
     const isLastNameValid = checkLastNameContact();
     const isEmailValid = checkEmailContact();
     const isPhoneValid = checkPhoneContact();
     const isMessageValid = checkMessageContact();
   
     const isFormValid =
       isNameValid && isLastNameValid && isEmailValid && isPhoneValid && isMessageValid;
   
     if (isFormValid) {
       formContact.submit();
       window.alert("Mensaje enviado!")
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
   
   formContact.addEventListener("input", debounce((e) => {
       switch (e.target.id) {
         case "contact_name":
           checkNameContact();
           break;
         case "contact_last":
           checkLastNameContact();
           break;
         case "contact_mail":
           checkEmailContact();
           break;
         case "contact_message":
           checkMessageContact();
           break;
         case "contact_phone":
           checkPhoneContact();
           break;
       }
     })
   );
