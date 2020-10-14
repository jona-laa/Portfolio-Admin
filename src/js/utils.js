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

// API URLs Local
const aboutUrl = 'http://localhost:8080/portfolio/api/bio';
const skillsUrl = 'http://localhost:8080/portfolio/api/skills';
const workUrl = 'http://localhost:8080/portfolio/api/jobs';
const studiesUrl = 'http://localhost:8080/portfolio/api/courses';
const portfolioUrl = 'http://localhost:8080/portfolio/api/projects';

// API URLs Remote
// const aboutUrl = 'http://studenter.miun.se/~jola1803/dt173g/portfolio/api/bio.php';
// const skillsUrl = 'http://studenter.miun.se/~jola1803/dt173g/portfolio/api/skills.php';
// const workUrl = 'http://studenter.miun.se/~jola1803/dt173g/portfolio/api/jobs.php';
// const studiesUrl = 'http://studenter.miun.se/~jola1803/dt173g/portfolio/api/courses.php';
// const portfolioUrl = 'http://studenter.miun.se/~jola1803/dt173g/portfolio/api/projects.php';

// Holds ID of course to update
let updateId;

// Dev Session Token
let seshToken = 'dev'

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
  * @param   {string}      div          Element ID or class, e.g '.feedback'
  * @param   {string}      spam         Element ID or class, e.g '#feedback-message'
*/
const userFeedback = (feedback, div, span) => {
    feedbackDiv = document.querySelector(div);
    feedbackMessage = document.querySelector(span);
    feedbackMessage.textContent = feedback.message;
    const status = feedback.code;
    status == 201 | status == 200 ? feedbackDiv.style.backgroundColor = '#0d4b0d' : feedbackDiv.style.backgroundColor = '#941212';

    fadeInElement(feedbackDiv, 500);
    fadeOutElement(1000, 4000, feedbackDiv);
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
