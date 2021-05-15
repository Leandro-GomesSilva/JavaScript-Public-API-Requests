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

searchContainer();

// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------

fetch(randomUserAPI + numberOfUsers + nationalites)   // Uses the Fetch API to call the Random User's API with a definied number of users and nationalities
  .then ( res => res.json() )
  .then( data => data.results )
  .then( usersList => {
    
    usersList.forEach( (user, index, array) => {    // For each user in the user's list, formats its phone and birthday values and appends the creates the HTML of the user's card
      user.phone = formatPhone(user.phone);
      user.dob.date = formatBirthday(user.dob.date);
      createsUserCard(user, index, array)
    });
      
  })
  .catch ( error => console.log('Something went wrong.', error) )    // In case the AJAX call is not succeded 
  
// ------------------------------------------
//  DOM MANIPULATION FUNCTIONS
// ------------------------------------------

/***
 * function createsUserCard
 * This function creates the user's card div element, writes its inner HTML, adds its event listener and appends it to the DOM
 * 
 * @param {object} user - The user's object containing properties with all user's info
 * @param {number} indexUser - The index of the current user
 * @param {array} arrayUsers - The array containing all user objects
 * @returns
 * 
 */
function createsUserCard (user, indexUser, arrayUsers) {
  
  const card = document.createElement('div');   // Creates a div element for the user's card and gives it a class
  card.className = "card";
  
  // Writes the innerHTML for user's card
  card.innerHTML = `
    <div class="card-img-container">
      <img class="card-img" src=${user.picture.large} alt="profile picture">
    </div>
    <div class="card-info-container">
      <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
      <p class="card-text">${user.email}</p>
      <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
    </div>
  `;
  
  card.addEventListener('click', () => createModalWindow(user, indexUser, arrayUsers));   // Adds an event listener for the card, which calls the function createModalWindow after a click

  gallery.insertAdjacentElement('beforeend', card);   // Appends the card to the DOM
  
  return;
}

/***
 * function createModalWindow
 * This function creates the modal window div element, writes its inner HTML, adds event listeners for its three buttons and appends it to the DOM
 * 
 * @param {object} user - The user's object containing properties with all user's info
 * @param {number} indexUser - The index of the current user
 * @param {array} arrayUsers - The array containing all user objects
 * @returns
 * 
 */
function createModalWindow (user, indexUser, arrayUsers) {
  
  const modalContainer = document.createElement('div');   // Creates a div element for the modal container and gives it a class
  modalContainer.className = "modal-container";

  // Writes the innerHTML for user's modal container
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

  buttonsEventListeners(modalContainer, indexUser, arrayUsers);   // Calls the function to create all necessary Event Listeners for the buttons
  body.appendChild(modalContainer);   // Appends the div element to the DOM

  return;
}

/***
 * function buttonsEventListeners
 * This function creates the modal window div element, writes its inner HTML, adds event listeners for its three buttons and appends it to the DOM
 * 
 * @param {object} modalContainer - The div element of the modal window containing the buttons
 * @param {number} indexUser - The index of the current user
 * @param {array} arrayUsers - The array containing all user objects
 * @returns
 * 
 */
function buttonsEventListeners(modalContainer, indexUser, arrayUsers) {

  // Selects the DOM elements for the Prev and Next buttons
  const closeButton = modalContainer.querySelector(".modal-close-btn");
  const prevButton = modalContainer.querySelector('#modal-prev');
  const nextButton = modalContainer.querySelector('#modal-next');

  // Definies the index of the previous and the next user in the user's array
  const prevUser = arrayUsers[indexUser - 1];
  const nextUser = arrayUsers[indexUser + 1];
  
  // Adds the Event Listener for the close button
  closeButton.addEventListener( 'click', () => body.removeChild(modalContainer) );
 
  /* Adds the Event listeners for the prev and next buttons: 
      1- Removes the current Modal Window from the DOM. 
      2- Calls the createModalWindow function passing the corresponding user's variables.
  */
  prevButton.addEventListener('click', () => {
      body.removeChild(modalContainer);
      createModalWindow(prevUser, indexUser - 1, arrayUsers);
    });

  nextButton.addEventListener('click', () => {
    body.removeChild(modalContainer);
    createModalWindow(nextUser, indexUser + 1, arrayUsers);
  });

  // Disabling the previous or the next button for the case that the list reached its end
  if (indexUser === 0) {
    prevButton.disabled = true;
  } else if ( indexUser === arrayUsers.length - 1) {
    nextButton.disabled = true;
  };

  return;
}

/***
 * function searchContainer
 * This function writes inner HTML of the search container and adds an event listener the submit button, which will then display or hide user cards
 * 
 * @returns
 * 
 */
function searchContainer () {
  
  const searchContainer = document.querySelector('.search-container');  // Selects the DOM element for the search container

  // Writes the inner HTML for the search container
  searchContainer.innerHTML = `
    <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
  `;
  
  const submitBtn = document.querySelector('#search-submit');   // Selects the DOM element of the submit button

  // Creates the Event Listener for the Submit Button
  submitBtn.addEventListener ('click', (e) => {
    e.preventDefault();   // Prevents the button to reload the page
    
    const input = document.querySelector('#search-input');  // Gets the DOM input element
    const inputValue = input.value.toUpperCase();   // Passes the input element's value to a variable
    const allCards = document.getElementsByClassName('card-name');  // Selects all h3 elements containing the users' names
    
    // For each all of these h3 elements, checks if its text content matches with the value from the DOM input element. If yes: displays the card. If not: hides the card
    for (const card of allCards) {
      const doesInputMatch = card.textContent.toUpperCase().includes(inputValue);
      doesInputMatch ? card.parentNode.parentNode.style.display = 'inherit' : card.parentNode.parentNode.style.display = 'none';
    }
  });

  return;
}

// ------------------------------------------
//  REGEX FORMATING FUNCTIONS
// ------------------------------------------

/***
 * function formatPhone
 * Returns a variable containing the user's phone in the desired format
 * 
 * @param {string} phoneNumber - The original string containing the phone number
 * @returns {string} The formated phone number
 * 
 */
function formatPhone (phoneNumber) {
  
  const formatedPhoneNr = phoneNumber   // Passes the current value of the phone number to a variable and manipulates it with REGEX
    .replace(/[^\d]/g, "")
    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  
  return formatedPhoneNr;   // Returns the formated number
}

/***
 * function formatBirthday
 * Returns a variable containing the user's birthday in the desired format
 * 
 * @param {string} birthday - The original string containing the birthday
 * @returns {string} The formated birthday
 * 
 */
function formatBirthday (birthday) {

  const formatedBirthday = birthday   // Passes the current value of the birthday to a variable and manipulates it with REGEX
    .replace(/T.+/, "")
    .replace(/[^\d]/g, "")
    .replace(/(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")
  
  return formatedBirthday;  // Returns the formated birthday
}