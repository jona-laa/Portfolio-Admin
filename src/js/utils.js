// DOM elements
const
    header = document.querySelector('.header-content'),
    toTopBtn = document.querySelector('#goTop'),
    mainMenu = document.querySelector('#menu-main-menu');

// Output Elements
const
    editItemsContainer = document.querySelector('#edit-items_container'),
    editSection = document.querySelector('#edit');

// User Feedback Elements
let
    feedbackDiv,
    feedbackMessage;

// Edit Form Element
let
    editForm;

// API URLs
const aboutUrl = 'http://localhost:8080/portfolio/api/bio';
const skillsUrl = 'http://localhost:8080/portfolio/api/skills';
const workUrl = 'http://localhost:8080/portfolio/api/jobs';
const studiesUrl = 'http://localhost:8080/portfolio/api/courses';
const portfolioUrl = 'http://localhost:8080/portfolio/api/projects';

// Holds ID of course to update
let updateId;



// Resets DOM element with cetegory items
const resetDOM = () => {
    updateId = null;
    editItemsContainer.innerHTML = '';
}



/* Cancels Form and resets inputs on confitm
* @param    {string}     e      Event object
*/
const cancelForm = (e) => {
    e.preventDefault();
    confirmIt('cancel') ? resetForm() : null;
}


// Empties form inputs
const resetForm = () => {
    updateId = null;
    editForm.reset();
}



/* Confirm Pop-Up
  * @param      {string}        action      E.g 'cencel' -> 'Sure you want to cencel?'
*/
const confirmIt = (action) => window.confirm(`Sure you want to ${action}?`);



/* Show User Feedback Div
  * @param   {object}      feedback     Uses object.message & object.code
  * @param   {string}      element      Element ID or class, e.g '.feedback'
*/
const userFeedback = (feedback, element) => {
    feedbackDiv = document.querySelector('.feedback');
    feedbackMessage = document.querySelector('#feedback-message');

    fadeInElement(element, 500);
    const status = feedback.code;
    feedbackMessage.textContent = feedback.message;
    status == 201 | status == 200 ? feedbackDiv.style.backgroundColor = 'green' : feedbackDiv.style.backgroundColor = 'red';

    fadeOutElement(1000, 4000, element);
}



/* Fade in Element
  * @param   {string}        element     Element ID or class, e.g '.feedback'
  * @param   {number}        fadeMs      Fade speed in milliseconds
*/
const fadeInElement = (element, fadeMs) => {
    $(element).fadeIn(fadeMs, function () {
    });
}



/* Fade out Element
  * @param   {number}           fadeMs      Fade speed in milliseconds
  * @param   {number}           timeoutMS   Timeout in milliseconds
  * @param   {Array<string>}    elements    Element ID/Class, e.g '.feedback'
*/
const fadeOutElement = (fadeMs, timeoutMs, ...elements) => {
    elements.forEach(e => {
        setTimeout(() => {
            $(e).fadeOut(fadeMs, function () {
            })
        }, timeoutMs);
    })
}