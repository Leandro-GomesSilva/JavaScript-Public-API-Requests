# JavaScript - Public API Requests
 The 5th project on the Full Stack JavaScript Techdegree. This application makes AJAX requests to a public API and handles asynchronous data. The application grabs information about 12 fictional employees as a JSON object from the API and builds an employee directory with it. The application displays the employees in a grid as well as in a detailed modal window with toggle buttons and is also equipped with a search functionality.

 Main technologies: JavaScript<br>
 Auxiliary technologies: HTML, CSS<br>
 Complexity level: Intermediate<br>
 Concepts: AJAX, Fetch API, Public APIs, JSON, Regex, DOM manipulation, Event listeners, CSS animations, HTML elements<br>

For Exceeding Expectations:

I. Search functionality

    A search feature was added, which allows to filter the directory by name.

II. Modal toggle

    Added functionality to the previous and next buttons when the modal window is open. The app recognizes if a user's container is the first or last and disables the prev and/or next button accordingly. Furthermore, the toggle function also considers the user cards being currently displayed on the screen.

III. CSS changes
    
    a. Changes:
        1. body: backgroud color
        2. h1: font size and color
        3. Class '.card': background color, border and transition
        4. Close button of the modal window: background color and border
        5. Container for the modal buttons: background color, border and border radius
        5. Buttons of the modal window: background color and border
        6. Hover effect of user card: border color and thickness
        7. Hover effect of buttons: background color and text color
    b. Additions:
        1. Modal windows (class '.modal'): animation effect
        2. Extra CSS rules '.prev-Animation' and '.next-Animation': added an animation effect
        3. Close button of the modal window: transition effect
        4. Display style for disabled buttons
        5. Hover display style for disabled buttons
        6. Hover effect for the close button
        7. Hover effect of user card: transform effect and transition time
        
