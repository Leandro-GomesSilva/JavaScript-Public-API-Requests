// ------------------------------------------
//  GLOBAL VARIABLES
// ------------------------------------------

const randomUserAPI = "https://randomuser.me/api/?results=";
const numberOfUsers = "12";
const nationalites = "&nat=us";
const body = document.querySelector('body');
const gallery = document.getElementById("gallery");

// ------------------------------------------
//  CALLING FUNCTIONS
// ------------------------------------------

appendSearchContainer();
eventListenerSearchCont();

// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
      .then (res => res.json() )
      .catch ( error => console.log('xxxxxxxxxx', error))
  }
  
  Promise.all([  
    fetchData(randomUserAPI + numberOfUsers + nationalites)
  ])
    .then( data => {
      const usersList = data[0].results;
      usersList.forEach( (user, index, array) => appendUserHTML(user , index, array));
    })
  
// ------------------------------------------
//  DOM MANIPULATION FUNCTIONS
// ------------------------------------------

function appendUserHTML (user, index, array) {
  
  const card = document.createElement('div');
  card.className = "card";
  
  card.innerHTML = `
    <div class="card-img-container">
      <img class="card-img" src=${user.picture.medium} alt="profile picture">
    </div>
    <div class="card-info-container">
      <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
      <p class="card-text">${user.email}</p>
      <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
    </div>
  `;
  
  card.addEventListener('click', () => createModalWindow(user, index, array));

  gallery.insertAdjacentElement('beforeend', card);
  
  return;
}

function createModalWindow (user, index, array) {
  
  user.phone = formatPhone(user.phone);
  user.dob.date = formatBirthday(user.dob.date);
  
  const modalContainer = document.createElement('div');
  modalContainer.className = "modal-container";

  modalContainer.innerHTML = `
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src=${user.picture.large} alt="profile picture">
          <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="modal-text">${user.email}</p>
          <p class="modal-text cap">${user.location.city}</p>
          <hr>
          <p class="modal-text">${user.phone}</p>
          <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.postcode}, ${user.location.country}</p>
          <p class="modal-text">Birthday: ${user.dob.date}</p>
      </div>
    </div>
    
    <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
  `;

  if (index === 0) {
    modalContainer.querySelector('#modal-prev').disabled = true;
  } else if ( index === array.length - 1) {
    modalContainer.querySelector('#modal-next').disabled = true;
  };

  body.appendChild(modalContainer);

  modalContainer.querySelector(".modal-close-btn")
    .addEventListener( 'click', () => body.removeChild(modalContainer) );

  btnCreateEventListener(modalContainer, index, array);

  return;
}

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function formatPhone (phoneNumber) {
  const formatedPhoneNr = phoneNumber
    .replace(/[^\d]/g, "")
    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  return formatedPhoneNr;
}

function formatBirthday (birthday) {
  const formatedBirthday = birthday
    .replace(/T.+/, "")
    .replace(/[^\d]/g, "")
    .replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")
  return formatedBirthday;
}

// ------------------------------------------
//  FUNCTIONS FOR EXCEEDS
// ------------------------------------------

function btnCreateEventListener(domElement, index, array) {

  domElement.querySelector('#modal-prev')
    .addEventListener('click', () => {
      body.removeChild(domElement);
      const prevUser = array[index - 1];
      createModalWindow(prevUser, index - 1, array);
    });

    domElement.querySelector('#modal-next')
    .addEventListener('click', () => {
      body.removeChild(domElement);
      const nextUser = array[index + 1];
      createModalWindow(nextUser, index + 1, array);
    });
}

function appendSearchContainer () {
  
  const searchContainer = document.querySelector('.search-container');
  searchContainer.innerHTML = `
    <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
  `;
}

function eventListenerSearchCont () {
  
  const btnSubmit = document.querySelector('#search-submit');

  btnSubmit.addEventListener ('click', (e) => {
    e.preventDefault();
    
    const input = document.querySelector('#search-input');
    const inputValue = input.value.toUpperCase();
    const allCards = document.getElementsByClassName('card-name');
    
    for (const card of allCards) {
      const doesInputMatch = card.textContent.toUpperCase().includes(inputValue);
      doesInputMatch ? card.parentNode.parentNode.style.display = 'inherit' : card.parentNode.parentNode.style.display = 'none';
    }
  });
}
