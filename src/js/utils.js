// DOM elements
const
    header = document.querySelector('.header-content'),
    toTopBtn = document.querySelector('#goTop'),
    mainMenu = document.querySelector('#menu-main-menu');

// Output Elements
const
    editItemsContainer = document.querySelector('#edit-items_container'),
    editSection = document.querySelector('#edit');

// Input Elements
let
    inputHeading,
    inputImage,
    inputBio;

// API URLs
const aboutUrl = 'http://localhost:8080/portfolio/api/bio';
const skillsUrl = 'http://localhost:8080/portfolio/api/skills';
const workUrl = 'http://localhost:8080/portfolio/api/jobs';
const studiesUrl = 'http://localhost:8080/portfolio/api/courses';
const portfolioUrl = 'http://localhost:8080/portfolio/api/projects';

// Holds ID of course to update
let updateId;



const resetDOM = () => {
    updateId = null;
    editItemsContainer.innerHTML = '';
}



const resetForm = () => {
    updateId = null;
    console.log('reset form')
    // Empty input fields
}


const cancelForm = (e) => {
    e.preventDefault();
    confirmIt('cancel') ? resetForm() : null;
}



/* Confirm Pop-Up
  * @param   {string}          action    E.g 'proceed' -> 'Sure you want to proceed?'
*/
const confirmIt = (action) => window.confirm(`Sure you want to ${action}?`);