// ------------------------------------------
//  DOM ELEMENT SELECTION AND VARIABLES
// ------------------------------------------

const randomUserAPI = "https://randomuser.me/api/?results=";
const numberOfUsers = "12";
const body = document.querySelector('body');
const gallery = document.getElementById("gallery");

// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
      //.then(checkStatus)
      .then (res => res.json() )
      .catch ( error => console.log('xxxxxxxxxx', error))
  }
  
  Promise.all([  
    fetchData(randomUserAPI + numberOfUsers)
  ])
    .then( data => {
      const usersList = data[0].results;
      usersList.forEach(user => appendUserHTML(user));
      console.log(data);
    })
  
// ------------------------------------------
//  DOM MANIPULATION FUNCTIONS
// ------------------------------------------

function appendUserHTML (user) {
  
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
  
  card.addEventListener('click', () => createModalWindow(user));

  gallery.insertAdjacentElement('beforeend', card);
  
  return;
}

function createModalWindow (user) {
  
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

  body.appendChild(modalContainer);

  modalContainer.querySelector(".modal-close-btn")
    .addEventListener( 'click', () => body.removeChild(modalContainer) );

  extraButtonsEvents(modalContainer);

  return;
}

// ------------------------------------------
//  FUNCTIONS FOR EXCEEDS
// ------------------------------------------

function extraButtonsEvents(domElement) {

  domElement.querySelector('#modal-prev')
    .addEventListener('click', () => "xxx");

    domElement.querySelector('#modal-next')
    .addEventListener('click', () => {
      body.removeChild(modalContainer);
      
    });

}