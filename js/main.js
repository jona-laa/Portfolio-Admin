/********** GET **********/

/* Gets data and creates appropriate element
  * @param        {string}        url                 API-url
  * @param        {function}      createElement       createBio/Skills/Work/Studies/Portfolio
*/
const fetchAndCreate = (url, createElement) => {
  fetch(url).then(res => res.json()).then(data => createElement(data)).catch(e => console.error(e));
};



/* "Routes" functionality of Send button
  * @param   {object}     e               Event object
  * @param   {number}     id              ID of post to update(updateId)
  * @param   {string}     url             API-url
  * @param   {object}     fetchData       Data object to be sent to API endpoint
  * @param   {function}   createElements  Creates post elements, e.g. createPortfolio
*/
const updateOrAdd = (e, id, url, fetchData, createElements) => {
  e.preventDefault();
  id ? updatePost(id, url, fetchData, createElements) : addPost(url, fetchData, createElements);
};



/********** POST **********/

/* Sends POST req, with data object to chosen endpoint
  * @param   {string}     url             API-url
  * @param   {object}     fetchData       Data object to be sent to API endpoint
  * @param   {function}   createElements  Creates post elements, e.g. createPortfolio
*/
const addPost = (url, fetchData, createElements) => {
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fetchData())
  }).then(res => res.json()).then(json => userFeedback(json, '.feedback', '#feedback-message')).then(data => resetForm()).then(data => fetchAndCreate(url, createElements)).catch(e => console.error(e));
};



/********** PUT **********/

/* Sends PUT req, with data object to chosen endpoint
  * @param   {number}     id              ID of post to update(updateId)
  * @param   {string}     url             API-url
  * @param   {object}     fetchData       Data object to be sent to API endpoint
  * @param   {function}   createElements  Creates post elements, e.g. createPortfolio
*/
const updatePost = (id, url, fetchData, createElements) => {
  fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fetchData(id))
  }).then(res => res.json()).then(json => userFeedback(json, '.feedback', '#feedback-message')).then(data => resetForm()).then(data => fetchAndCreate(url, createElements)).catch(e => console.error(e));
};



/********** DELETE **********/

/* Sends DELETE req to chosen endpoint, and reloads DOM with new data
  * @param   {number}     id              ID of post to update(updateId)
  * @param   {string}     url             API-url
  * @param   {function}   createElements  Creates post elements, e.g. createPortfolio
*/
const deletePost = (id, url, createElements) => {
  confirmIt('delete post') ? fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: seshToken,
      id: id
    })
  }).then(res => res.json()).then(json => userFeedback(json, '.feedback', '#feedback-message')).then(data => resetForm()).then(data => fetchAndCreate(url, createElements)).catch(e => console.error(e)) : null;
};



// Hide header & to top on scroll
window.onscroll = () => {
  hideMenu();
  hideToTopBtn();
};



/* Toggle element from top or bottom
 * @param   {DOM element}   element     Target DOM element to toggle
 * @param   {string}        position    'top' or 'bottom'
 * @param   {string}        offset      Offset in e.g. pixels, rem, em, etc.
*/
const elementToggle = (element, position, offset) => position === 'top' ? element.style.top = offset : element.style.bottom = offset;



/* Change display attribute of element
 * @param   {DOM element}   element     Target DOM element
 * @param   {string}        value       Display attribute value, e.g. 'none', 'block', etc.
*/
const elementDisplay = (element, value) => element.style.display = value; 



// Hide Header
let prevScrollpos = window.pageYOffset;
const hideMenu = () => {
  let currentScrollPos = window.pageYOffset; 
  
  if (window.pageYOffset > 100) {
  if (prevScrollpos > currentScrollPos) {
    elementToggle(header, 'top', '0');
    elementDisplay(mainMenu, 'none');
  } else {
    elementToggle(header, 'top', '-80px');
    elementDisplay(mainMenu, 'none');
  } 
  }
  
  // Give header tint if scroll down screen height
  window.pageYOffset > window.screen.height - 300 ? header.style.background = 'rgba(0, 0, 0, 0.5)' : header.style.background = 'transparent';
  prevScrollpos = currentScrollPos;
}; 



// Hide "to top button"
const hideToTopBtn = () => {
  window.pageYOffset > window.screen.height ? elementToggle(toTopBtn, 'bottom', '20px') : elementToggle(toTopBtn, 'bottom', '-50px');
}; 



// Toggle mobile menu
$('#main-menu-toggle').click(function () {
  $('.main-menu ul').slideToggle(300, function () {});
}); 



//Smooth scrolling
$('#menu-main-menu a, .btn, .arrow-link').on('click', function (e) {
  if (this.hash !== '') {
    e.preventDefault();
    const hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800);
  }
});



// DOM elements
const header = document.querySelector('.header-content'),
      toTopBtn = document.querySelector('#goTop'),
      mainMenu = document.querySelector('#menu-main-menu'); 
      
// Output Elements
const editItemsContainer = document.querySelector('#edit-items_container'),
      editSection = document.querySelector('#edit'); 
      
// User Feedback Elements
let feedbackDiv, feedbackMessage; 

// Edit Form Element
let editForm; 

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



// Resets DOM element with cetegory items
const resetDOM = () => {
  updateId = null;
  editItemsContainer.innerHTML = '';
};



/* Cancels Form and resets inputs on confitm
* @param    {string}     e      Event object
*/
const cancelForm = e => {
  e.preventDefault();
  confirmIt('cancel') ? resetForm() : null;
}; 



// Empties form inputs
const resetForm = () => {
  updateId = null;
  editForm.reset();
};



/* Confirm Pop-Up
  * @param      {string}        action      E.g 'cencel' -> 'Sure you want to cencel?'
*/
const confirmIt = action => window.confirm(`Sure you want to ${action}?`);



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
  status == 201 | status == 200 ? feedbackDiv.style.backgroundColor = '#1b8832' : feedbackDiv.style.backgroundColor = '#b31b1b';
  fadeInElement(feedbackDiv, 500);
  fadeOutElement(1000, 4000, feedbackDiv);
};



/* Fade in Element
  * @param   {string}        element     Element ID or class, e.g '.feedback'
  * @param   {number}        fadeMs      Fade speed in milliseconds
*/
const fadeInElement = (element, fadeMs) => {
  $(element).fadeIn(fadeMs, function () {});
};



/* Fade out Element
  * @param   {number}           fadeMs      Fade speed in milliseconds
  * @param   {number}           timeoutMS   Timeout in milliseconds
  * @param   {Array<string>}    elements    Element ID/Class, e.g '.feedback'
*/
const fadeOutElement = (fadeMs, timeoutMs, ...elements) => {
  elements.forEach(e => {
    setTimeout(() => {
      $(e).fadeOut(fadeMs, function () {});
    }, timeoutMs);
  });
};



/* ABOUT */

/* POST */

/* Returns About Post HTML
  * @param   {string}     id              Post ID
  * @param   {string}     heading         Post Heading
  * @param   {string}     bio             Post About Content
  * @param   {boolean}    published       If published or no. (Actually 1 for true or 0 for false)
*/
const aboutItemHtml = (id, heading, bio, image, published) => `
  <div class="about-container">

  <div class="avatar-container">
  <div class="avatar" style="background: url('${image}') no-repeat center center/cover"></div>
  </div>

  <div>
  <div>
  <h3>${heading}</h3>
  <p>${bio}</p>
  <p>Published: ${published == 0 ? 'No' : 'Yes'}</p>
  </div>
  </div>

  </div>

  <div class="edit-items_controls">
  <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id}, aboutUrl, createBio)"><i class="fas fa-trash-alt fa-1x"></i></button>
  <button class="btn update" id="update-${id}" value="update" onclick="initAboutUpdate(${id}, aboutUrl)"><i class="fas fa-edit fa-1x"></i></button>
  </div>
`;



/* FORM */
// Input Elements
let inputAboutHeading, inputAboutImage, inputAboutBio, inputAboutPublished;



/* Returns Object to send for POST or PUT(with id)
  * @param   {string}     id              Post ID
*/
const aboutFetchObject = id => id ? {
  token: seshToken,
  id: id,
  heading: inputAboutHeading.value,
  img_src: inputAboutImage.value,
  bio: inputAboutBio.value,
  published: inputAboutPublished.checked ? 1 : 0
} : {
  token: seshToken,
  heading: inputAboutHeading.value,
  img_src: inputAboutImage.value,
  bio: inputAboutBio.value,
  published: inputAboutPublished.checked ? 1 : 0
};



/* Get Post and Auto Fill Input Fields
  * @param   {string}     id              Post ID
  * @param   {string}     url             API-url
*/
const initAboutUpdate = (id, url) => {
  updateId = id;
  fetch(`${url}?id=${id}`).then(res => res.json()).then(data => {
    const {
      id,
      heading,
      bio,
      img_src,
      published
    } = data.bios[0];
    inputAboutHeading.value = heading;
    inputAboutBio.value = bio;
    inputAboutImage.value = img_src;
    inputAboutPublished.checked = published == 1 ? true : false;
    window.scrollTo(0, document.body.scrollHeight);
  });
}; 



// Form HTML
const aboutFormHtml = () => `
      <form id="edit-form">
        <div>
          <label for="heading">Heading</label>
          <input type="text" name="heading" id="heading" placeholder="Heading" required>
        </div>
        <div>
          <label for="image">Image</label>
          <input type="text" name="image" id="image" placeholder="Image Src" required>
        </div>
        <textarea id="bio" placeholder="About Text" required></textarea>
        <div class="form_checkbox">
          <label for="published">Publish?</label>
          <input type="checkbox" id="published" name="published">
        </div>
        <div class="form_buttons">
        <input type="submit" value="Submit" id="submit" class="btn" onclick="updateOrAdd(event, updateId, aboutUrl, aboutFetchObject, createBio)"> 
        
        <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
        </div>
        </form>
  `;



  /* Creates About Section
  * @param        {object}        fetchData       fetchData.bios[0].id/heading/bio/img_src
*/
const createBio = fetchData => {
  resetDOM();
  editItemsContainer.classList.remove('trio');
  const bios = fetchData.bios;
  bios.forEach(bio => {
    editItemsContainer.innerHTML += aboutItemHtml(bio.id, bio.heading, bio.bio, bio.img_src, bio.published);
  }); 
  
  // Create Form
  editSection.innerHTML = aboutFormHtml(); 
  // Initiate Input Variables
  inputAboutHeading = document.querySelector('#heading');
  inputAboutImage = document.querySelector('#image');
  inputAboutBio = document.querySelector('#bio');
  inputAboutPublished = document.querySelector('#published');
  editForm = document.querySelector('#edit-form');
};



/* Creates Skills Section
  * @param        {object}        fetchData       fetchData.skills
*/
const createSkills = fetchData => {
  resetDOM();
  editItemsContainer.classList.remove('trio');
  const skills = fetchData.skills;
  skills.forEach(skill => {
    editItemsContainer.innerHTML += skillsHtml(skill.id, skill.skill, skill.icon);
  }); 
  // Create Form
  editSection.innerHTML = skillsFormHtml(); 
  // Initiate Input Variables
  inputSkillsSkill = document.querySelector('#skill');
  inputSkillsIcon = document.querySelector('#icon');
  editForm = document.querySelector('#edit-form');
};



/* Creates Work Section
  * @param        {object}        fetchData       fetchData.jobs
*/
const createWork = fetchData => {
  resetDOM();
  const jobs = fetchData.jobs;
  editItemsContainer.classList.add('trio');
  jobs.forEach(job => {
    editItemsContainer.innerHTML += workHtml(job.id, job.company, job.title, job.date_start, job.date_end, job.descr);
  }); 
  // Create Form
  editSection.innerHTML = workFormHtml(); 
  // Initiate Input Variables
  inputWorkCompany = document.querySelector('#company');
  inputWorkTitle = document.querySelector('#title');
  inputWorkStart = document.querySelector('#start-date');
  inputWorkEnd = document.querySelector('#end-date');
  inputWorkDescr = document.querySelector('#descr');
  editForm = document.querySelector('#edit-form');
};



/* Creates Studies Section
  * @param        {object}        fetchData       fetchData.courses
*/
const createStudies = fetchData => {
  resetDOM();
  const courses = fetchData.courses;
  editItemsContainer.classList.add('trio');
  courses.forEach(course => {
    editItemsContainer.innerHTML += studiesHtml(course.id, course.title, course.institution, course.date_start, course.date_end, course.descr);
  }); 
  // Create Form
  editSection.innerHTML = studiesFormHtml(); 
  // Initiate Input Variables
  inputStudiesTitle = document.querySelector('#title');
  inputStudiesInstitution = document.querySelector('#institution');
  inputStudiesStart = document.querySelector('#start-date');
  inputStudiesEnd = document.querySelector('#end-date');
  inputStudiesDescr = document.querySelector('#descr');
  editForm = document.querySelector('#edit-form');
};



/* Creates Portfolio Section
  * @param        {object}        fetchData       fetchData.projects
*/
const createPortfolio = fetchData => {
  resetDOM();
  const projects = fetchData.projects;
  editItemsContainer.classList.add('trio');
  projects.forEach(project => {
    editItemsContainer.innerHTML += portfolioHtml(project.id, project.title, project.prj_url, project.descr, project.img_src);
  }); 
  // Create Form
  editSection.innerHTML = portfolioFormHtml(); 
  // Initiate Input Variables
  inputPortfolioTitle = document.querySelector('#title');
  inputPortfoliUrl = document.querySelector('#url');
  inputPortfolioDescr = document.querySelector('#descr');
  inputPortfolioImage = document.querySelector('#image');
  editForm = document.querySelector('#edit-form');
};



/* PORTFOLIO */

/* Returns Portfolio Post HTML
  * @param   {string}     id              Post ID
  * @param   {string}     title           Project Title
  * @param   {string}     url             Project URL
  * @param   {string}     descr           Project Description
*/
const portfolioHtml = (id, title, url, descr, image) => `
      
      <div class="portfolio-item">
        <img src="${image}" alt="" />
        <h3>${title}</h3>
        <a href="${url}" target="_blank">${url}</a>
        <p>${descr}</p>

        <div class="edit-items_controls">
          <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id}, portfolioUrl, createPortfolio)"><i class="fas fa-trash-alt fa-1x"></i></button>
          <button class="btn update" id="update-${id}" value="update" onclick="initPortfolioUpdate(${id}, portfolioUrl)"><i class="fas fa-edit fa-1x"></i></button>
        </div>
      </div>
    `;


    /* FORM */
// Input Elements
let inputPortfolioTitle, inputPortfoliUrl, inputPortfolioDescr, inputPortfolioImage;



/* Returns Object to send for POST or PUT(with id)
  * @param   {string}     id              Post ID
*/
const portfolioFetchObject = id => id ? {
  token: seshToken,
  id: id,
  title: inputPortfolioTitle.value,
  prj_url: inputPortfoliUrl.value,
  descr: inputPortfolioDescr.value,
  img_src: inputPortfolioImage.value
} : {
  token: seshToken,
  title: inputPortfolioTitle.value,
  prj_url: inputPortfoliUrl.value,
  descr: inputPortfolioDescr.value,
  img_src: inputPortfolioImage.value
};



/* Get Post and Auto Fill Input Fields
  * @param   {string}     id              Post ID
  * @param   {string}     url             API-url
*/
const initPortfolioUpdate = (id, url) => {
  updateId = id;
  fetch(`${url}?id=${id}`).then(res => res.json()).then(data => {
    const {
      id,
      title,
      prj_url,
      descr,
      img_src
    } = data.projects[0];
    inputPortfolioTitle.value = title;
    inputPortfoliUrl.value = prj_url;
    inputPortfolioDescr.value = descr;
    inputPortfolioImage.value = img_src;
    window.scrollTo(0, document.body.scrollHeight);
  });
}; 



// Form HTML
const portfolioFormHtml = () => `
      <form id="edit-form">
        <div>
          <label for="title">Title</label>
          <input type="text" name="title" id="title" placeholder="Title" required>
        </div>
        <div>
          <label for="url">Url</label>
          <input type="text" name="url" id="url" placeholder="Url" required>
        </div>
        <div>
          <label for="descr">Description</label>
          <input type="text" name="descr" id="descr" placeholder="Description" required>
        </div>
        <div>
          <label for="image">Image</label>
          <input type="text" name="image" id="image" placeholder="Image" required>
        </div>
        <div class="form_buttons">
          <input type="submit" value="Submit" id="submit" class="btn" onclick="updateOrAdd(event, updateId, portfolioUrl, portfolioFetchObject, createPortfolio)"> 
          <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
        </div>
      </form>
  `;



/* SKILLS */

/* Returns Skill Post HTML
  * @param   {string}     id         Post ID
  * @param   {string}     skill      Post Skill 
  * @param   {string}     icon       Skill Font Awesome Icon, e.g 'fab fa-react'
*/
const skillsHtml = (id, skill, icon) => `
      <div class="skill">
        <i class="${icon} fa-3x"></i>
        <span>${skill}</span>

        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id}, skillsUrl, createSkills)"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initSkillsUpdate(${id}, skillsUrl)"><i class="fas fa-edit fa-1x"></i></button>
      </div>
      
    `;



/* FORM */
// Input Elements
let inputSkillsSkill, inputSkillsIcon;



/* Returns Object to send for POST or PUT(with id)
  * @param   {string}     id              Post ID
*/
const skillsFetchObject = id => id ? {
  token: seshToken,
  id: id,
  skill: inputSkillsSkill.value,
  icon: inputSkillsIcon.value
} : {
  token: seshToken,
  skill: inputSkillsSkill.value,
  icon: inputSkillsIcon.value
};



/* Get Post and Auto Fill Input Fields
  * @param   {string}     id              Post ID
  * @param   {string}     url             API-url
*/
const initSkillsUpdate = (id, url) => {
  updateId = id;
  fetch(`${url}?id=${id}`).then(res => res.json()).then(data => {
    const {
      skill,
      icon
    } = data.skills[0];
    inputSkillsSkill.value = skill;
    inputSkillsIcon.value = icon;
    window.scrollTo(0, document.body.scrollHeight);
  });
}; 



// Form HTML
const skillsFormHtml = () => `
      <form id="edit-form">
        <div>
          <label for="skill">Skill</label>
          <input type="text" name="skill" id="skill" placeholder="Skill" required>
        </div>
        <div>
          <label for="icon">Icon</label>
          <input type="text" name="icon" id="icon" placeholder="Icon" required>
        </div>
        <div class="form_buttons">
          <input type="submit" value="Submit" id="submit" class="btn" 
        onclick="updateOrAdd(event, updateId, skillsUrl, skillsFetchObject, createSkills)"> 
          <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
        </div>
        </form>
  `;



  /* STUDIES */

/* Returns Studies Post HTML
  * @param   {string}     id              Post ID
  * @param   {string}     title           Course Title
  * @param   {string}     institution     Course Institution
  * @param   {string}     start           Start Date
  * @param   {string}     end             End Date
  * @param   {string}     descr           Course Description
*/
const studiesHtml = (id, title, institution, start, end, descr) => `
      <div class="resume-item">
        <h4>${title}</h4>
        <span>${institution}</span><br>
        <span>${start} – ${end == '0000-00-00' ? 'Current' : end}</span>
        <p>${descr}</p>

        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id}, studiesUrl, createStudies)"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initStudiesUpdate(${id}, studiesUrl)"><i class="fas fa-edit fa-1x"></i></button>
      </div>
    `;



/* FORM */
// Input Elements
let inputStudiesTitle, inputStudiesInstitution, inputStudiesStart, inputStudiesEnd, inputStudiesDescr;



/* Returns Object to send for POST or PUT(with id)
  * @param   {string}     id              Post ID
*/
const studiesFetchObject = id => id ? {
  token: seshToken,
  id: id,
  title: inputStudiesTitle.value,
  institution: inputStudiesInstitution.value,
  date_start: inputStudiesStart.value,
  date_end: inputStudiesEnd.value,
  descr: inputStudiesDescr.value
} : {
  token: seshToken,
  title: inputStudiesTitle.value,
  institution: inputStudiesInstitution.value,
  date_start: inputStudiesStart.value,
  date_end: inputStudiesEnd.value,
  descr: inputStudiesDescr.value
};



/* Get Post and Auto Fill Input Fields
  * @param   {string}     id              Post ID
  * @param   {string}     url             API-url
*/
const initStudiesUpdate = (id, url) => {
  updateId = id;
  fetch(`${url}?id=${id}`).then(res => res.json()).then(data => {
    const {
      id,
      title,
      institution,
      date_start,
      date_end,
      descr
    } = data.courses[0];
    inputStudiesTitle.value = title;
    inputStudiesInstitution.value = institution;
    inputStudiesStart.value = date_start;
    inputStudiesEnd.value = date_end;
    inputStudiesDescr.value = descr;
    window.scrollTo(0, document.body.scrollHeight);
  });
}; 



// Form HTML
const studiesFormHtml = () => `
      <form id="edit-form">
        <div>
          <label for="title">Title</label>
          <input type="text" name="title" id="title" placeholder="Title" required>
        </div>
        <div>
          <label for="institution">Institution</label>
          <input type="text" name="institution" id="institution" placeholder="Institution" required>
        </div>
        <div>
          <label for="start-date">Start Date</label>
          <input type="text" name="start-date" id="start-date" placeholder="Start Date" required>
        </div>
        <div>
          <label for="end-date">End Date</label>
          <input type="text" name="end-date" id="end-date" placeholder="End Date" required>
        </div>
        <div>
          <label for="descr">Description</label>
          <input type="text" name="descr" id="descr" placeholder="Description" required>
        </div>
        <div class="form_buttons">
          <input type="submit" value="Submit" id="submit" class="btn" onclick="updateOrAdd(event, updateId, studiesUrl, studiesFetchObject, createStudies)"> 
          <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
        </div>
      </form>
  `;



/* WORK */

/* Returns Work Post HTML
  * @param   {string}     id              Post ID
  * @param   {string}     company         Work Company Name
  * @param   {string}     title           Work Title
  * @param   {string}     start           Start Date
  * @param   {string}     end             End Date
  * @param   {string}     descr           Job Description
*/
const workHtml = (id, company, title, start, end, descr) => `
      <div class="resume-item">
        <h4>${company}</h4>
        <span>${title}</span><br>
        <span>${start} – ${end == '0000-00-00' ? 'Current' : end}</span>
        <p>${descr}</p>

        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id}, workUrl, createWork)"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initWorkUpdate(${id}, workUrl)"><i class="fas fa-edit fa-1x"></i></button>
      </div>
    `;



/* FORM */
// Input Elements
let inputWorkCompany, inputWorkTitle, inputWorkStart, inputWorkEnd, inputWorkDescr;



/* Returns Object to send for POST or PUT(with id)
  * @param   {string}     id              Post ID
*/
const workFetchObject = id => id ? {
  token: seshToken,
  id: id,
  company: inputWorkCompany.value,
  title: inputWorkTitle.value,
  date_start: inputWorkStart.value,
  date_end: inputWorkEnd.value,
  descr: inputWorkDescr.value
} : {
  token: seshToken,
  company: inputWorkCompany.value,
  title: inputWorkTitle.value,
  date_start: inputWorkStart.value,
  date_end: inputWorkEnd.value,
  descr: inputWorkDescr.value
};



/* Get Post and Auto Fill Input Fields
  * @param   {string}     id              Post ID
  * @param   {string}     url             API-url
*/
const initWorkUpdate = (id, url) => {
  updateId = id;
  fetch(`${url}?id=${id}`).then(res => res.json()).then(data => {
    const {
      id,
      company,
      title,
      date_start,
      date_end,
      descr
    } = data.jobs[0];
    inputWorkCompany.value = company;
    inputWorkTitle.value = title;
    inputWorkStart.value = date_start;
    inputWorkEnd.value = date_end;
    inputWorkDescr.value = descr;
    window.scrollTo(0, document.body.scrollHeight);
  });
}; 



// Form
const workFormHtml = () => `
      <form id="edit-form">
        <div>
          <label for="company">Company</label>
          <input type="text" name="company" id="company" placeholder="Company" required>
        </div>
        <div>
          <label for="title">Title</label>
          <input type="text" name="title" id="title" placeholder="Title" required>
        </div>
        <div>
          <label for="start-date">Start Date</label>
          <input type="text" name="start-date" id="start-date" placeholder="Start Date" required>
        </div>
        <div>
          <label for="end-date">End Date</label>
          <input type="text" name="end-date" id="end-date" placeholder="End Date" required>
        </div>
        <div>
          <label for="descr">Description</label>
          <input type="text" name="descr" id="descr" placeholder="Description" required>
        </div>
        <div class="form_buttons">
          <input type="submit" value="Submit" id="submit" class="btn" onclick="updateOrAdd(event, updateId, workUrl, workFetchObject, createWork)"> 
          <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
        </div>
      </form>
  `;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNydWQuanMiLCJuYXYuanMiLCJ1dGlscy5qcyIsImVsZW1lbnRzL2Fib3V0LmpzIiwiZWxlbWVudHMvY3JlYXRlRWxlbXMuanMiLCJlbGVtZW50cy9wb3J0Zm9saW8uanMiLCJlbGVtZW50cy9za2lsbHMuanMiLCJlbGVtZW50cy9zdHVkaWVzLmpzIiwiZWxlbWVudHMvd29yay5qcyJdLCJuYW1lcyI6WyJmZXRjaEFuZENyZWF0ZSIsInVybCIsImNyZWF0ZUVsZW1lbnQiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsImNhdGNoIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsInVwZGF0ZU9yQWRkIiwiaWQiLCJmZXRjaERhdGEiLCJjcmVhdGVFbGVtZW50cyIsInByZXZlbnREZWZhdWx0IiwidXBkYXRlUG9zdCIsImFkZFBvc3QiLCJtZXRob2QiLCJtb2RlIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlckZlZWRiYWNrIiwicmVzZXRGb3JtIiwiZGVsZXRlUG9zdCIsImNvbmZpcm1JdCIsInRva2VuIiwic2VzaFRva2VuIiwid2luZG93Iiwib25zY3JvbGwiLCJoaWRlTWVudSIsImhpZGVUb1RvcEJ0biIsImVsZW1lbnRUb2dnbGUiLCJlbGVtZW50IiwicG9zaXRpb24iLCJvZmZzZXQiLCJzdHlsZSIsInRvcCIsImJvdHRvbSIsImVsZW1lbnREaXNwbGF5IiwidmFsdWUiLCJkaXNwbGF5IiwicHJldlNjcm9sbHBvcyIsInBhZ2VZT2Zmc2V0IiwiY3VycmVudFNjcm9sbFBvcyIsImhlYWRlciIsIm1haW5NZW51Iiwic2NyZWVuIiwiaGVpZ2h0IiwiYmFja2dyb3VuZCIsInRvVG9wQnRuIiwiJCIsImNsaWNrIiwic2xpZGVUb2dnbGUiLCJvbiIsImhhc2giLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZWRpdEl0ZW1zQ29udGFpbmVyIiwiZWRpdFNlY3Rpb24iLCJmZWVkYmFja0RpdiIsImZlZWRiYWNrTWVzc2FnZSIsImVkaXRGb3JtIiwiYWJvdXRVcmwiLCJza2lsbHNVcmwiLCJ3b3JrVXJsIiwic3R1ZGllc1VybCIsInBvcnRmb2xpb1VybCIsInVwZGF0ZUlkIiwicmVzZXRET00iLCJpbm5lckhUTUwiLCJjYW5jZWxGb3JtIiwicmVzZXQiLCJhY3Rpb24iLCJjb25maXJtIiwiZmVlZGJhY2siLCJkaXYiLCJzcGFuIiwidGV4dENvbnRlbnQiLCJtZXNzYWdlIiwic3RhdHVzIiwiY29kZSIsImJhY2tncm91bmRDb2xvciIsImZhZGVJbkVsZW1lbnQiLCJmYWRlT3V0RWxlbWVudCIsImZhZGVNcyIsImZhZGVJbiIsInRpbWVvdXRNcyIsImVsZW1lbnRzIiwiZm9yRWFjaCIsInNldFRpbWVvdXQiLCJmYWRlT3V0IiwiYWJvdXRJdGVtSHRtbCIsImhlYWRpbmciLCJiaW8iLCJpbWFnZSIsInB1Ymxpc2hlZCIsImlucHV0QWJvdXRIZWFkaW5nIiwiaW5wdXRBYm91dEltYWdlIiwiaW5wdXRBYm91dEJpbyIsImlucHV0QWJvdXRQdWJsaXNoZWQiLCJhYm91dEZldGNoT2JqZWN0IiwiaW1nX3NyYyIsImNoZWNrZWQiLCJpbml0QWJvdXRVcGRhdGUiLCJiaW9zIiwic2Nyb2xsVG8iLCJzY3JvbGxIZWlnaHQiLCJhYm91dEZvcm1IdG1sIiwiY3JlYXRlQmlvIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiY3JlYXRlU2tpbGxzIiwic2tpbGxzIiwic2tpbGwiLCJza2lsbHNIdG1sIiwiaWNvbiIsInNraWxsc0Zvcm1IdG1sIiwiaW5wdXRTa2lsbHNTa2lsbCIsImlucHV0U2tpbGxzSWNvbiIsImNyZWF0ZVdvcmsiLCJqb2JzIiwiYWRkIiwiam9iIiwid29ya0h0bWwiLCJjb21wYW55IiwidGl0bGUiLCJkYXRlX3N0YXJ0IiwiZGF0ZV9lbmQiLCJkZXNjciIsIndvcmtGb3JtSHRtbCIsImlucHV0V29ya0NvbXBhbnkiLCJpbnB1dFdvcmtUaXRsZSIsImlucHV0V29ya1N0YXJ0IiwiaW5wdXRXb3JrRW5kIiwiaW5wdXRXb3JrRGVzY3IiLCJjcmVhdGVTdHVkaWVzIiwiY291cnNlcyIsImNvdXJzZSIsInN0dWRpZXNIdG1sIiwiaW5zdGl0dXRpb24iLCJzdHVkaWVzRm9ybUh0bWwiLCJpbnB1dFN0dWRpZXNUaXRsZSIsImlucHV0U3R1ZGllc0luc3RpdHV0aW9uIiwiaW5wdXRTdHVkaWVzU3RhcnQiLCJpbnB1dFN0dWRpZXNFbmQiLCJpbnB1dFN0dWRpZXNEZXNjciIsImNyZWF0ZVBvcnRmb2xpbyIsInByb2plY3RzIiwicHJvamVjdCIsInBvcnRmb2xpb0h0bWwiLCJwcmpfdXJsIiwicG9ydGZvbGlvRm9ybUh0bWwiLCJpbnB1dFBvcnRmb2xpb1RpdGxlIiwiaW5wdXRQb3J0Zm9saVVybCIsImlucHV0UG9ydGZvbGlvRGVzY3IiLCJpbnB1dFBvcnRmb2xpb0ltYWdlIiwicG9ydGZvbGlvRmV0Y2hPYmplY3QiLCJpbml0UG9ydGZvbGlvVXBkYXRlIiwic2tpbGxzRmV0Y2hPYmplY3QiLCJpbml0U2tpbGxzVXBkYXRlIiwic3RhcnQiLCJlbmQiLCJzdHVkaWVzRmV0Y2hPYmplY3QiLCJpbml0U3R1ZGllc1VwZGF0ZSIsIndvcmtGZXRjaE9iamVjdCIsImluaXRXb3JrVXBkYXRlIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7OztBQUlBLE1BQU1BLGNBQWMsR0FBRyxDQUFDQyxHQUFELEVBQU1DLGFBQU4sS0FBd0I7QUFDM0NDLEVBQUFBLEtBQUssQ0FBQ0YsR0FBRCxDQUFMLENBQ0tHLElBREwsQ0FDVUMsR0FBRyxJQUFJQSxHQUFHLENBQUNDLElBQUosRUFEakIsRUFFS0YsSUFGTCxDQUVVRyxJQUFJLElBQUlMLGFBQWEsQ0FBQ0ssSUFBRCxDQUYvQixFQUdLQyxLQUhMLENBR1dDLENBQUMsSUFBSUMsT0FBTyxDQUFDQyxLQUFSLENBQWNGLENBQWQsQ0FIaEI7QUFJSCxDQUxEO0FBU0E7Ozs7Ozs7OztBQU9BLE1BQU1HLFdBQVcsR0FBRyxDQUFDSCxDQUFELEVBQUlJLEVBQUosRUFBUVos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QSxZQUFZLENBQUNoRyxLQUFiLEdBQXFCMEYsUUFBckI7QUFDQU8sSUFBQUEsY0FBYyxDQUFDakcsS0FBZixHQUF1QjJGLEtBQXZCO0FBRUF2RyxJQUFBQSxNQUFNLENBQUNnRixRQUFQLENBQWdCLENBQWhCLEVBQW1CbEQsUUFBUSxDQUFDdkMsSUFBVCxDQUFjMEYsWUFBakM7QUFDRCxHQVpIO0FBYUQsQ0FoQkQsQyxDQW1CQTs7O0FBQ0EsTUFBTXVCLFlBQVksR0FBRyxNQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FBNUIiLCJmaWxlIjoianMvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqIEdFVCAqKioqKioqKioqL1xuXG4vKiBHZXRzIGRhdGEgYW5kIGNyZWF0ZXMgYXBwcm9wcmlhdGUgZWxlbWVudFxuICAqIEBwYXJhbSAgICAgICAge3N0cmluZ30gICAgICAgIHVybCAgICAgICAgICAgICAgICAgQVBJLXVybFxuICAqIEBwYXJhbSAgICAgICAge2Z1bmN0aW9ufSAgICAgIGNyZWF0ZUVsZW1lbnQgICAgICAgY3JlYXRlQmlvL1NraWxscy9Xb3JrL1N0dWRpZXMvUG9ydGZvbGlvXG4qL1xuY29uc3QgZmV0Y2hBbmRDcmVhdGUgPSAodXJsLCBjcmVhdGVFbGVtZW50KSA9PiB7XG4gICAgZmV0Y2godXJsKVxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgLnRoZW4oZGF0YSA9PiBjcmVhdGVFbGVtZW50KGRhdGEpKVxuICAgICAgICAuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKGUpKVxufTtcblxuXG5cbi8qIFwiUm91dGVzXCIgZnVuY3Rpb25hbGl0eSBvZiBTZW5kIGJ1dHRvblxuICAqIEBwYXJhbSAgIHtvYmplY3R9ICAgICBlICAgICAgICAgICAgICAgRXZlbnQgb2JqZWN0XG4gICogQHBhcmFtICAge251bWJlcn0gICAgIGlkICAgICAgICAgICAgICBJRCBvZiBwb3N0IHRvIHVwZGF0ZSh1cGRhdGVJZClcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgdXJsICAgICAgICAgICAgIEFQSS11cmxcbiAgKiBAcGFyYW0gICB7b2JqZWN0fSAgICAgZmV0Y2hEYXRhICAgICAgIERhdGEgb2JqZWN0IHRvIGJlIHNlbnQgdG8gQVBJIGVuZHBvaW50XG4gICogQHBhcmFtICAge2Z1bmN0aW9ufSAgIGNyZWF0ZUVsZW1lbnRzICBDcmVhdGVzIHBvc3QgZWxlbWVudHMsIGUuZy4gY3JlYXRlUG9ydGZvbGlvXG4qL1xuY29uc3QgdXBkYXRlT3JBZGQgPSAoZSwgaWQsIHVybCwgZmV0Y2hEYXRhLCBjcmVhdGVFbGVtZW50cykgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGlkID8gdXBkYXRlUG9zdChpZCwgdXJsLCBmZXRjaERhdGEsIGNyZWF0ZUVsZW1lbnRzKSA6IGFkZFBvc3QodXJsLCBmZXRjaERhdGEsIGNyZWF0ZUVsZW1lbnRzKTtcbn1cblxuXG5cbi8qKioqKioqKioqIFBPU1QgKioqKioqKioqKi9cblxuLyogU2VuZHMgUE9TVCByZXEsIHdpdGggZGF0YSBvYmplY3QgdG8gY2hvc2VuIGVuZHBvaW50XG4gICogQHBhcmFtICAge3N0cmluZ30gICAgIHVybCAgICAgICAgICAgICBBUEktdXJsXG4gICogQHBhcmFtICAge29iamVjdH0gICAgIGZldGNoRGF0YSAgICAgICBEYXRhIG9iamVjdCB0byBiZSBzZW50IHRvIEFQSSBlbmRwb2ludFxuICAqIEBwYXJhbSAgIHtmdW5jdGlvbn0gICBjcmVhdGVFbGVtZW50cyAgQ3JlYXRlcyBwb3N0IGVsZW1lbnRzLCBlLmcuIGNyZWF0ZVBvcnRmb2xpb1xuKi9cbmNvbnN0IGFkZFBvc3QgPSAodXJsLCBmZXRjaERhdGEsIGNyZWF0ZUVsZW1lbnRzKSA9PiB7XG4gICAgZmV0Y2godXJsLFxuICAgICAgICB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgZmV0Y2hEYXRhKClcbiAgICAgICAgICAgICksXG4gICAgICAgIH1cbiAgICApXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbihqc29uID0+IHVzZXJGZWVkYmFjayhqc29uLCAnLmZlZWRiYWNrJywgJyNmZWVkYmFjay1tZXNzYWdlJykpXG4gICAgICAgIC50aGVuKGRhdGEgPT4gcmVzZXRGb3JtKCkpXG4gICAgICAgIC50aGVuKGRhdGEgPT4gZmV0Y2hBbmRDcmVhdGUodXJsLCBjcmVhdGVFbGVtZW50cykpXG4gICAgICAgIC5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoZSkpXG59XG5cblxuXG4vKioqKioqKioqKiBQVVQgKioqKioqKioqKi9cblxuLyogU2VuZHMgUFVUIHJlcSwgd2l0aCBkYXRhIG9iamVjdCB0byBjaG9zZW4gZW5kcG9pbnRcbiAgKiBAcGFyYW0gICB7bnVtYmVyfSAgICAgaWQgICAgICAgICAgICAgIElEIG9mIHBvc3QgdG8gdXBkYXRlKHVwZGF0ZUlkKVxuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICB1cmwgICAgICAgICAgICAgQVBJLXVybFxuICAqIEBwYXJhbSAgIHtvYmplY3R9ICAgICBmZXRjaERhdGEgICAgICAgRGF0YSBvYmplY3QgdG8gYmUgc2VudCB0byBBUEkgZW5kcG9pbnRcbiAgKiBAcGFyYW0gICB7ZnVuY3Rpb259ICAgY3JlYXRlRWxlbWVudHMgIENyZWF0ZXMgcG9zdCBlbGVtZW50cywgZS5nLiBjcmVhdGVQb3J0Zm9saW9cbiovXG5jb25zdCB1cGRhdGVQb3N0ID0gKGlkLCB1cmwsIGZldGNoRGF0YSwgY3JlYXRlRWxlbWVudHMpID0+IHtcbiAgICBmZXRjaCh1cmwsXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICBtb2RlOiAnY29ycycsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIGZldGNoRGF0YShpZClcbiAgICAgICAgICAgICksXG4gICAgICAgIH1cbiAgICApXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbihqc29uID0+IHVzZXJGZWVkYmFjayhqc29uLCAnLmZlZWRiYWNrJywgJyNmZWVkYmFjay1tZXNzYWdlJykpXG4gICAgICAgIC50aGVuKGRhdGEgPT4gcmVzZXRGb3JtKCkpXG4gICAgICAgIC50aGVuKGRhdGEgPT4gZmV0Y2hBbmRDcmVhdGUodXJsLCBjcmVhdGVFbGVtZW50cykpXG4gICAgICAgIC5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoZSkpXG59XG5cblxuXG4vKioqKioqKioqKiBERUxFVEUgKioqKioqKioqKi9cblxuLyogU2VuZHMgREVMRVRFIHJlcSB0byBjaG9zZW4gZW5kcG9pbnQsIGFuZCByZWxvYWRzIERPTSB3aXRoIG5ldyBkYXRhXG4gICogQHBhcmFtICAge251bWJlcn0gICAgIGlkICAgICAgICAgICAgICBJRCBvZiBwb3N0IHRvIHVwZGF0ZSh1cGRhdGVJZClcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgdXJsICAgICAgICAgICAgIEFQSS11cmxcbiAgKiBAcGFyYW0gICB7ZnVuY3Rpb259ICAgY3JlYXRlRWxlbWVudHMgIENyZWF0ZXMgcG9zdCBlbGVtZW50cywgZS5nLiBjcmVhdGVQb3J0Zm9saW9cbiovXG5jb25zdCBkZWxldGVQb3N0ID0gKGlkLCB1cmwsIGNyZWF0ZUVsZW1lbnRzKSA9PiB7XG4gICAgY29uZmlybUl0KCdkZWxldGUgcG9zdCcpID8gZmV0Y2godXJsLFxuICAgICAgICB7XG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBzZXNoVG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICksXG4gICAgICAgIH1cbiAgICApXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAudGhlbihqc29uID0+IHVzZXJGZWVkYmFjayhqc29uLCAnLmZlZWRiYWNrJywgJyNmZWVkYmFjay1tZXNzYWdlJykpXG4gICAgICAgIC50aGVuKGRhdGEgPT4gcmVzZXRGb3JtKCkpXG4gICAgICAgIC50aGVuKGRhdGEgPT4gZmV0Y2hBbmRDcmVhdGUodXJsLCBjcmVhdGVFbGVtZW50cykpXG4gICAgICAgIC5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoZSkpIDogbnVsbDtcbn1cbiIsIi8vIEhpZGUgaGVhZGVyICYgdG8gdG9wIG9uIHNjcm9sbFxud2luZG93Lm9uc2Nyb2xsID0gKCkgPT4ge1xuICBoaWRlTWVudSgpO1xuICBoaWRlVG9Ub3BCdG4oKTtcbn07XG5cblxuLyogVG9nZ2xlIGVsZW1lbnQgZnJvbSB0b3Agb3IgYm90dG9tXG4gKiBAcGFyYW0gICB7RE9NIGVsZW1lbnR9ICAgZWxlbWVudCAgICAgVGFyZ2V0IERPTSBlbGVtZW50IHRvIHRvZ2dsZVxuICogQHBhcmFtICAge3N0cmluZ30gICAgICAgIHBvc2l0aW9uICAgICd0b3AnIG9yICdib3R0b20nXG4gKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgICAgb2Zmc2V0ICAgICAgT2Zmc2V0IGluIGUuZy4gcGl4ZWxzLCByZW0sIGVtLCBldGMuXG4qL1xuY29uc3QgZWxlbWVudFRvZ2dsZSA9IChlbGVtZW50LCBwb3NpdGlvbiwgb2Zmc2V0KSA9PiBwb3NpdGlvbiA9PT0gJ3RvcCcgPyBlbGVtZW50LnN0eWxlLnRvcCA9IG9mZnNldCA6IGVsZW1lbnQuc3R5bGUuYm90dG9tID0gb2Zmc2V0O1xuXG5cbi8qIENoYW5nZSBkaXNwbGF5IGF0dHJpYnV0ZSBvZiBlbGVtZW50XG4gKiBAcGFyYW0gICB7RE9NIGVsZW1lbnR9ICAgZWxlbWVudCAgICAgVGFyZ2V0IERPTSBlbGVtZW50XG4gKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgICAgdmFsdWUgICAgICAgRGlzcGxheSBhdHRyaWJ1dGUgdmFsdWUsIGUuZy4gJ25vbmUnLCAnYmxvY2snLCBldGMuXG4qL1xuY29uc3QgZWxlbWVudERpc3BsYXkgPSAoZWxlbWVudCwgdmFsdWUpID0+IGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IHZhbHVlO1xuXG5cbi8vIEhpZGUgSGVhZGVyXG5sZXQgcHJldlNjcm9sbHBvcyA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuY29uc3QgaGlkZU1lbnUgPSAoKSA9PiB7XG4gIGxldCBjdXJyZW50U2Nyb2xsUG9zID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXG4gIC8vIGlmIChzY3JlZW4ud2lkdGggPCA4MTMgJiYgd2luZG93LnBhZ2VZT2Zmc2V0ID4gMTAwKSB7XG4gICAgaWYgKHByZXZTY3JvbGxwb3MgPiBjdXJyZW50U2Nyb2xsUG9zKSB7XG4gICAgICBlbGVtZW50VG9nZ2xlKGhlYWRlciwgJ3RvcCcsICcwJyk7XG4gICAgICBlbGVtZW50RGlzcGxheShtYWluTWVudSwgJ25vbmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudFRvZ2dsZShoZWFkZXIsICd0b3AnLCAnLTgwcHgnKTtcbiAgICAgIGVsZW1lbnREaXNwbGF5KG1haW5NZW51LCAnbm9uZScpO1xuICAgIH1cbiAgLy8gfVxuXG4gIC8vIEdpdmUgaGVhZGVyIHRpbnQgaWYgc2Nyb2xsIGRvd24gc2NyZWVuIGhlaWdodFxuICB3aW5kb3cucGFnZVlPZmZzZXQgPiB3aW5kb3cuc2NyZWVuLmhlaWdodCAtIDMwMCA/IGhlYWRlci5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoMCwgMCwgMCwgMC41KScgOiBoZWFkZXIuc3R5bGUuYmFja2dyb3VuZCA9ICd0cmFuc3BhcmVudCc7XG5cbiAgcHJldlNjcm9sbHBvcyA9IGN1cnJlbnRTY3JvbGxQb3M7XG59XG5cblxuXG4vLyBIaWRlIFwidG8gdG9wIGJ1dHRvblwiXG5jb25zdCBoaWRlVG9Ub3BCdG4gPSAoKSA9PiB7XG4gIHdpbmRvdy5wYWdlWU9mZnNldCA+IHdpbmRvdy5zY3JlZW4uaGVpZ2h0ID9cbiAgICBlbGVtZW50VG9nZ2xlKHRvVG9wQnRuLCAnYm90dG9tJywgJzIwcHgnKVxuICAgIDpcbiAgICBlbGVtZW50VG9nZ2xlKHRvVG9wQnRuLCAnYm90dG9tJywgJy01MHB4Jylcbn1cblxuXG5cbi8vIFRvZ2dsZSBtb2JpbGUgbWVudVxuJCgnI21haW4tbWVudS10b2dnbGUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICQoJy5tYWluLW1lbnUgdWwnKS5zbGlkZVRvZ2dsZSgzMDAsIGZ1bmN0aW9uICgpIHtcbiAgfSk7XG59KTtcblxuXG5cbi8vU21vb3RoIHNjcm9sbGluZ1xuJCgnI21lbnUtbWFpbi1tZW51IGEsIC5idG4sIC5hcnJvdy1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKHRoaXMuaGFzaCAhPT0gJycpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBoYXNoID0gdGhpcy5oYXNoO1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgIHNjcm9sbFRvcDogJChoYXNoKS5vZmZzZXQoKS50b3AsXG4gICAgfSxcbiAgICAgIDgwMFxuICAgICk7XG4gIH1cbn0pO1xuIiwiLy8gRE9NIGVsZW1lbnRzXG5jb25zdFxuICAgIGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItY29udGVudCcpLFxuICAgIHRvVG9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dvVG9wJyksXG4gICAgbWFpbk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudS1tYWluLW1lbnUnKTtcblxuLy8gT3V0cHV0IEVsZW1lbnRzXG5jb25zdFxuICAgIGVkaXRJdGVtc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LWl0ZW1zX2NvbnRhaW5lcicpLFxuICAgIGVkaXRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQnKTtcblxuLy8gVXNlciBGZWVkYmFjayBFbGVtZW50c1xubGV0XG4gICAgZmVlZGJhY2tEaXYsXG4gICAgZmVlZGJhY2tNZXNzYWdlO1xuXG4vLyBFZGl0IEZvcm0gRWxlbWVudFxubGV0XG4gICAgZWRpdEZvcm07XG5cbi8vIEFQSSBVUkxzIExvY2FsXG5jb25zdCBhYm91dFVybCA9ICdodHRwOi8vbG9jYWxob3N0OjgwODAvcG9ydGZvbGlvL2FwaS9iaW8nO1xuY29uc3Qgc2tpbGxzVXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9wb3J0Zm9saW8vYXBpL3NraWxscyc7XG5jb25zdCB3b3JrVXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9wb3J0Zm9saW8vYXBpL2pvYnMnO1xuY29uc3Qgc3R1ZGllc1VybCA9ICdodHRwOi8vbG9jYWxob3N0OjgwODAvcG9ydGZvbGlvL2FwaS9jb3Vyc2VzJztcbmNvbnN0IHBvcnRmb2xpb1VybCA9ICdodHRwOi8vbG9jYWxob3N0OjgwODAvcG9ydGZvbGlvL2FwaS9wcm9qZWN0cyc7XG5cbi8vIEFQSSBVUkxzIFJlbW90ZVxuLy8gY29uc3QgYWJvdXRVcmwgPSAnaHR0cDovL3N0dWRlbnRlci5taXVuLnNlL35qb2xhMTgwMy9kdDE3M2cvcG9ydGZvbGlvL2FwaS9iaW8ucGhwJztcbi8vIGNvbnN0IHNraWxsc1VybCA9ICdodHRwOi8vc3R1ZGVudGVyLm1pdW4uc2UvfmpvbGExODAzL2R0MTczZy9wb3J0Zm9saW8vYXBpL3NraWxscy5waHAnO1xuLy8gY29uc3Qgd29ya1VybCA9ICdodHRwOi8vc3R1ZGVudGVyLm1pdW4uc2UvfmpvbGExODAzL2R0MTczZy9wb3J0Zm9saW8vYXBpL2pvYnMucGhwJztcbi8vIGNvbnN0IHN0dWRpZXNVcmwgPSAnaHR0cDovL3N0dWRlbnRlci5taXVuLnNlL35qb2xhMTgwMy9kdDE3M2cvcG9ydGZvbGlvL2FwaS9jb3Vyc2VzLnBocCc7XG4vLyBjb25zdCBwb3J0Zm9saW9VcmwgPSAnaHR0cDovL3N0dWRlbnRlci5taXVuLnNlL35qb2xhMTgwMy9kdDE3M2cvcG9ydGZvbGlvL2FwaS9wcm9qZWN0cy5waHAnO1xuXG4vLyBIb2xkcyBJRCBvZiBjb3Vyc2UgdG8gdXBkYXRlXG5sZXQgdXBkYXRlSWQ7XG5cbi8vIERldiBTZXNzaW9uIFRva2VuXG4vLyBsZXQgc2VzaFRva2VuID0gJ2RldidcblxuLy8gUmVzZXRzIERPTSBlbGVtZW50IHdpdGggY2V0ZWdvcnkgaXRlbXNcbmNvbnN0IHJlc2V0RE9NID0gKCkgPT4ge1xuICAgIHVwZGF0ZUlkID0gbnVsbDtcbiAgICBlZGl0SXRlbXNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG59XG5cblxuXG4vKiBDYW5jZWxzIEZvcm0gYW5kIHJlc2V0cyBpbnB1dHMgb24gY29uZml0bVxuKiBAcGFyYW0gICAge3N0cmluZ30gICAgIGUgICAgICBFdmVudCBvYmplY3RcbiovXG5jb25zdCBjYW5jZWxGb3JtID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uZmlybUl0KCdjYW5jZWwnKSA/IHJlc2V0Rm9ybSgpIDogbnVsbDtcbn1cblxuXG4vLyBFbXB0aWVzIGZvcm0gaW5wdXRzXG5jb25zdCByZXNldEZvcm0gPSAoKSA9PiB7XG4gICAgdXBkYXRlSWQgPSBudWxsO1xuICAgIGVkaXRGb3JtLnJlc2V0KCk7XG59XG5cblxuXG4vKiBDb25maXJtIFBvcC1VcFxuICAqIEBwYXJhbSAgICAgIHtzdHJpbmd9ICAgICAgICBhY3Rpb24gICAgICBFLmcgJ2NlbmNlbCcgLT4gJ1N1cmUgeW91IHdhbnQgdG8gY2VuY2VsPydcbiovXG5jb25zdCBjb25maXJtSXQgPSAoYWN0aW9uKSA9PiB3aW5kb3cuY29uZmlybShgU3VyZSB5b3Ugd2FudCB0byAke2FjdGlvbn0/YCk7XG5cblxuXG4vKiBTaG93IFVzZXIgRmVlZGJhY2sgRGl2XG4gICogQHBhcmFtICAge29iamVjdH0gICAgICBmZWVkYmFjayAgICAgVXNlcyBvYmplY3QubWVzc2FnZSAmIG9iamVjdC5jb2RlXG4gICogQHBhcmFtICAge3N0cmluZ30gICAgICBkaXYgICAgICAgICAgRWxlbWVudCBJRCBvciBjbGFzcywgZS5nICcuZmVlZGJhY2snXG4gICogQHBhcmFtICAge3N0cmluZ30gICAgICBzcGFtICAgICAgICAgRWxlbWVudCBJRCBvciBjbGFzcywgZS5nICcjZmVlZGJhY2stbWVzc2FnZSdcbiovXG5jb25zdCB1c2VyRmVlZGJhY2sgPSAoZmVlZGJhY2ssIGRpdiwgc3BhbikgPT4ge1xuICAgIGZlZWRiYWNrRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihkaXYpO1xuICAgIGZlZWRiYWNrTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3Bhbik7XG4gICAgZmVlZGJhY2tNZXNzYWdlLnRleHRDb250ZW50ID0gZmVlZGJhY2subWVzc2FnZTtcbiAgICBjb25zdCBzdGF0dXMgPSBmZWVkYmFjay5jb2RlO1xuICAgIHN0YXR1cyA9PSAyMDEgfCBzdGF0dXMgPT0gMjAwID8gZmVlZGJhY2tEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMxYjg4MzInIDogZmVlZGJhY2tEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNiMzFiMWInO1xuXG4gICAgZmFkZUluRWxlbWVudChmZWVkYmFja0RpdiwgNTAwKTtcbiAgICBmYWRlT3V0RWxlbWVudCgxMDAwLCA0MDAwLCBmZWVkYmFja0Rpdik7XG59XG5cblxuXG4vKiBGYWRlIGluIEVsZW1lbnRcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgICAgZWxlbWVudCAgICAgRWxlbWVudCBJRCBvciBjbGFzcywgZS5nICcuZmVlZGJhY2snXG4gICogQHBhcmFtICAge251bWJlcn0gICAgICAgIGZhZGVNcyAgICAgIEZhZGUgc3BlZWQgaW4gbWlsbGlzZWNvbmRzXG4qL1xuY29uc3QgZmFkZUluRWxlbWVudCA9IChlbGVtZW50LCBmYWRlTXMpID0+IHtcbiAgICAkKGVsZW1lbnQpLmZhZGVJbihmYWRlTXMsIGZ1bmN0aW9uICgpIHtcbiAgICB9KTtcbn1cblxuXG5cbi8qIEZhZGUgb3V0IEVsZW1lbnRcbiAgKiBAcGFyYW0gICB7bnVtYmVyfSAgICAgICAgICAgZmFkZU1zICAgICAgRmFkZSBzcGVlZCBpbiBtaWxsaXNlY29uZHNcbiAgKiBAcGFyYW0gICB7bnVtYmVyfSAgICAgICAgICAgdGltZW91dE1TICAgVGltZW91dCBpbiBtaWxsaXNlY29uZHNcbiAgKiBAcGFyYW0gICB7QXJyYXk8c3RyaW5nPn0gICAgZWxlbWVudHMgICAgRWxlbWVudCBJRC9DbGFzcywgZS5nICcuZmVlZGJhY2snXG4qL1xuY29uc3QgZmFkZU91dEVsZW1lbnQgPSAoZmFkZU1zLCB0aW1lb3V0TXMsIC4uLmVsZW1lbnRzKSA9PiB7XG4gICAgZWxlbWVudHMuZm9yRWFjaChlID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKGUpLmZhZGVPdXQoZmFkZU1zLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCB0aW1lb3V0TXMpO1xuICAgIH0pXG59XG4iLCIvKiBBQk9VVCAqL1xuXG4vKiBQT1NUICovXG4vKiBSZXR1cm5zIEFib3V0IFBvc3QgSFRNTFxuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICBpZCAgICAgICAgICAgICAgUG9zdCBJRFxuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICBoZWFkaW5nICAgICAgICAgUG9zdCBIZWFkaW5nXG4gICogQHBhcmFtICAge3N0cmluZ30gICAgIGJpbyAgICAgICAgICAgICBQb3N0IEFib3V0IENvbnRlbnRcbiAgKiBAcGFyYW0gICB7Ym9vbGVhbn0gICAgcHVibGlzaGVkICAgICAgIElmIHB1Ymxpc2hlZCBvciBuby4gKEFjdHVhbGx5IDEgZm9yIHRydWUgb3IgMCBmb3IgZmFsc2UpXG4qL1xuY29uc3QgYWJvdXRJdGVtSHRtbCA9IChpZCwgaGVhZGluZywgYmlvLCBpbWFnZSwgcHVibGlzaGVkKSA9PlxuICBgXG4gIDxkaXYgY2xhc3M9XCJhYm91dC1jb250YWluZXJcIj5cblxuICA8ZGl2IGNsYXNzPVwiYXZhdGFyLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwiYXZhdGFyXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiB1cmwoJyR7aW1hZ2V9Jykgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIvY292ZXJcIj48L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdj5cbiAgPGRpdj5cbiAgPGgzPiR7aGVhZGluZ308L2gzPlxuICA8cD4ke2Jpb308L3A+XG4gIDxwPlB1Ymxpc2hlZDogJHtwdWJsaXNoZWQgPT0gMCA/ICdObycgOiAnWWVzJ308L3A+XG4gIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZWRpdC1pdGVtc19jb250cm9sc1wiPlxuICA8YnV0dG9uIGNsYXNzPVwiYnRuIGRlbGV0ZVwiIGlkPVwiZGVsZXRlLSR7aWR9XCIgdmFsdWU9XCJkZWxldGVcIiBvbmNsaWNrPVwiZGVsZXRlUG9zdCgke2lkfSwgYWJvdXRVcmwsIGNyZWF0ZUJpbylcIj48aSBjbGFzcz1cImZhcyBmYS10cmFzaC1hbHQgZmEtMXhcIj48L2k+PC9idXR0b24+XG4gIDxidXR0b24gY2xhc3M9XCJidG4gdXBkYXRlXCIgaWQ9XCJ1cGRhdGUtJHtpZH1cIiB2YWx1ZT1cInVwZGF0ZVwiIG9uY2xpY2s9XCJpbml0QWJvdXRVcGRhdGUoJHtpZH0sIGFib3V0VXJsKVwiPjxpIGNsYXNzPVwiZmFzIGZhLWVkaXQgZmEtMXhcIj48L2k+PC9idXR0b24+XG4gIDwvZGl2PlxuYDtcblxuXG5cbi8qIEZPUk0gKi9cbi8vIElucHV0IEVsZW1lbnRzXG5sZXRcbiAgaW5wdXRBYm91dEhlYWRpbmcsXG4gIGlucHV0QWJvdXRJbWFnZSxcbiAgaW5wdXRBYm91dEJpbyxcbiAgaW5wdXRBYm91dFB1Ymxpc2hlZDtcblxuXG4vKiBSZXR1cm5zIE9iamVjdCB0byBzZW5kIGZvciBQT1NUIG9yIFBVVCh3aXRoIGlkKVxuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICBpZCAgICAgICAgICAgICAgUG9zdCBJRFxuKi9cbmNvbnN0IGFib3V0RmV0Y2hPYmplY3QgPSAoaWQpID0+XG4gIGlkID8ge1xuICAgIHRva2VuOiBzZXNoVG9rZW4sXG4gICAgaWQ6IGlkLFxuICAgIGhlYWRpbmc6IGlucHV0QWJvdXRIZWFkaW5nLnZhbHVlLFxuICAgIGltZ19zcmM6IGlucHV0QWJvdXRJbWFnZS52YWx1ZSxcbiAgICBiaW86IGlucHV0QWJvdXRCaW8udmFsdWUsXG4gICAgcHVibGlzaGVkOiBpbnB1dEFib3V0UHVibGlzaGVkLmNoZWNrZWQgPyAxIDogMFxuICB9IDoge1xuICAgICAgdG9rZW46IHNlc2hUb2tlbixcbiAgICAgIGhlYWRpbmc6IGlucHV0QWJvdXRIZWFkaW5nLnZhbHVlLFxuICAgICAgaW1nX3NyYzogaW5wdXRBYm91dEltYWdlLnZhbHVlLFxuICAgICAgYmlvOiBpbnB1dEFib3V0QmlvLnZhbHVlLFxuICAgICAgcHVibGlzaGVkOiBpbnB1dEFib3V0UHVibGlzaGVkLmNoZWNrZWQgPyAxIDogMFxuICAgIH07XG5cblxuLyogR2V0IFBvc3QgYW5kIEF1dG8gRmlsbCBJbnB1dCBGaWVsZHNcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgaWQgICAgICAgICAgICAgIFBvc3QgSURcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgdXJsICAgICAgICAgICAgIEFQSS11cmxcbiovXG5jb25zdCBpbml0QWJvdXRVcGRhdGUgPSAoaWQsIHVybCkgPT4ge1xuICB1cGRhdGVJZCA9IGlkO1xuXG4gIGZldGNoKGAke3VybH0/aWQ9JHtpZH1gKVxuICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgY29uc3QgeyBpZCwgaGVhZGluZywgYmlvLCBpbWdfc3JjLCBwdWJsaXNoZWQgfSA9IGRhdGEuYmlvc1swXTtcblxuICAgICAgaW5wdXRBYm91dEhlYWRpbmcudmFsdWUgPSBoZWFkaW5nO1xuICAgICAgaW5wdXRBYm91dEJpby52YWx1ZSA9IGJpbztcbiAgICAgIGlucHV0QWJvdXRJbWFnZS52YWx1ZSA9IGltZ19zcmM7XG4gICAgICBpbnB1dEFib3V0UHVibGlzaGVkLmNoZWNrZWQgPSBwdWJsaXNoZWQgPT0gMSA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0KTtcbiAgICB9KVxufVxuXG5cbi8vIEZvcm0gSFRNTFxuY29uc3QgYWJvdXRGb3JtSHRtbCA9ICgpID0+IGBcbiAgICAgIDxmb3JtIGlkPVwiZWRpdC1mb3JtXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cImhlYWRpbmdcIj5IZWFkaW5nPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaGVhZGluZ1wiIGlkPVwiaGVhZGluZ1wiIHBsYWNlaG9sZGVyPVwiSGVhZGluZ1wiIHJlcXVpcmVkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwiaW1hZ2VcIj5JbWFnZTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImltYWdlXCIgaWQ9XCJpbWFnZVwiIHBsYWNlaG9sZGVyPVwiSW1hZ2UgU3JjXCIgcmVxdWlyZWQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8dGV4dGFyZWEgaWQ9XCJiaW9cIiBwbGFjZWhvbGRlcj1cIkFib3V0IFRleHRcIiByZXF1aXJlZD48L3RleHRhcmVhPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybV9jaGVja2JveFwiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJwdWJsaXNoZWRcIj5QdWJsaXNoPzwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwicHVibGlzaGVkXCIgbmFtZT1cInB1Ymxpc2hlZFwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm1fYnV0dG9uc1wiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU3VibWl0XCIgaWQ9XCJzdWJtaXRcIiBjbGFzcz1cImJ0blwiIG9uY2xpY2s9XCJ1cGRhdGVPckFkZChldmVudCwgdXBkYXRlSWQsIGFib3V0VXJsLCBhYm91dEZldGNoT2JqZWN0LCBjcmVhdGVCaW8pXCI+IFxuICAgICAgICBcbiAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIkNhbmNlbFwiIGlkPVwic3VibWl0XCIgY2xhc3M9XCJidG5cIiBvbmNsaWNrPVwiY2FuY2VsRm9ybShldmVudClcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgYCIsIi8qIENyZWF0ZXMgQWJvdXQgU2VjdGlvblxuICAqIEBwYXJhbSAgICAgICAge29iamVjdH0gICAgICAgIGZldGNoRGF0YSAgICAgICBmZXRjaERhdGEuYmlvc1swXS5pZC9oZWFkaW5nL2Jpby9pbWdfc3JjXG4qL1xuY29uc3QgY3JlYXRlQmlvID0gKGZldGNoRGF0YSkgPT4ge1xuICByZXNldERPTSgpO1xuXG4gIGVkaXRJdGVtc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd0cmlvJyk7XG5cbiAgY29uc3QgYmlvcyA9IGZldGNoRGF0YS5iaW9zO1xuXG4gIGJpb3MuZm9yRWFjaChiaW8gPT4ge1xuICAgIGVkaXRJdGVtc0NvbnRhaW5lci5pbm5lckhUTUwgKz0gYWJvdXRJdGVtSHRtbChiaW8uaWQsIGJpby5oZWFkaW5nLCBiaW8uYmlvLCBiaW8uaW1nX3NyYywgYmlvLnB1Ymxpc2hlZCk7XG4gIH0pO1xuXG4gIC8vIENyZWF0ZSBGb3JtXG4gIGVkaXRTZWN0aW9uLmlubmVySFRNTCA9IGFib3V0Rm9ybUh0bWwoKTtcblxuICAvLyBJbml0aWF0ZSBJbnB1dCBWYXJpYWJsZXNcbiAgaW5wdXRBYm91dEhlYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVhZGluZycpO1xuICBpbnB1dEFib3V0SW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW1hZ2UnKTtcbiAgaW5wdXRBYm91dEJpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiaW8nKTtcbiAgaW5wdXRBYm91dFB1Ymxpc2hlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwdWJsaXNoZWQnKTtcbiAgZWRpdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1mb3JtJyk7XG59O1xuXG5cblxuLyogQ3JlYXRlcyBTa2lsbHMgU2VjdGlvblxuICAqIEBwYXJhbSAgICAgICAge29iamVjdH0gICAgICAgIGZldGNoRGF0YSAgICAgICBmZXRjaERhdGEuc2tpbGxzXG4qL1xuY29uc3QgY3JlYXRlU2tpbGxzID0gKGZldGNoRGF0YSkgPT4ge1xuICByZXNldERPTSgpO1xuXG4gIGVkaXRJdGVtc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCd0cmlvJyk7XG5cbiAgY29uc3Qgc2tpbGxzID0gZmV0Y2hEYXRhLnNraWxscztcblxuICBza2lsbHMuZm9yRWFjaChza2lsbCA9PiB7XG4gICAgZWRpdEl0ZW1zQ29udGFpbmVyLmlubmVySFRNTCArPSBza2lsbHNIdG1sKHNraWxsLmlkLCBza2lsbC5za2lsbCwgc2tpbGwuaWNvbik7XG4gIH0pXG5cbiAgLy8gQ3JlYXRlIEZvcm1cbiAgZWRpdFNlY3Rpb24uaW5uZXJIVE1MID0gc2tpbGxzRm9ybUh0bWwoKTtcblxuICAvLyBJbml0aWF0ZSBJbnB1dCBWYXJpYWJsZXNcbiAgaW5wdXRTa2lsbHNTa2lsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNza2lsbCcpO1xuICBpbnB1dFNraWxsc0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaWNvbicpO1xuICBlZGl0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LWZvcm0nKTtcblxufTtcblxuXG5cbi8qIENyZWF0ZXMgV29yayBTZWN0aW9uXG4gICogQHBhcmFtICAgICAgICB7b2JqZWN0fSAgICAgICAgZmV0Y2hEYXRhICAgICAgIGZldGNoRGF0YS5qb2JzXG4qL1xuY29uc3QgY3JlYXRlV29yayA9IChmZXRjaERhdGEpID0+IHtcbiAgcmVzZXRET00oKTtcblxuICBjb25zdCBqb2JzID0gZmV0Y2hEYXRhLmpvYnM7XG5cbiAgZWRpdEl0ZW1zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RyaW8nKVxuXG4gIGpvYnMuZm9yRWFjaChqb2IgPT4ge1xuICAgIGVkaXRJdGVtc0NvbnRhaW5lci5pbm5lckhUTUwgKz0gd29ya0h0bWwoam9iLmlkLCBqb2IuY29tcGFueSwgam9iLnRpdGxlLCBqb2IuZGF0ZV9zdGFydCwgam9iLmRhdGVfZW5kLCBqb2IuZGVzY3IpO1xuICB9KTtcblxuICAvLyBDcmVhdGUgRm9ybVxuICBlZGl0U2VjdGlvbi5pbm5lckhUTUwgPSB3b3JrRm9ybUh0bWwoKTtcblxuICAvLyBJbml0aWF0ZSBJbnB1dCBWYXJpYWJsZXNcbiAgaW5wdXRXb3JrQ29tcGFueSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wYW55Jyk7XG4gIGlucHV0V29ya1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XG4gIGlucHV0V29ya1N0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0LWRhdGUnKTtcbiAgaW5wdXRXb3JrRW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZC1kYXRlJyk7XG4gIGlucHV0V29ya0Rlc2NyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyJyk7XG4gIGVkaXRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZm9ybScpO1xuXG59O1xuXG5cblxuLyogQ3JlYXRlcyBTdHVkaWVzIFNlY3Rpb25cbiAgKiBAcGFyYW0gICAgICAgIHtvYmplY3R9ICAgICAgICBmZXRjaERhdGEgICAgICAgZmV0Y2hEYXRhLmNvdXJzZXNcbiovXG5jb25zdCBjcmVhdGVTdHVkaWVzID0gKGZldGNoRGF0YSkgPT4ge1xuICByZXNldERPTSgpO1xuXG4gIGNvbnN0IGNvdXJzZXMgPSBmZXRjaERhdGEuY291cnNlcztcblxuICBlZGl0SXRlbXNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndHJpbycpO1xuXG4gIGNvdXJzZXMuZm9yRWFjaChjb3Vyc2UgPT4ge1xuICAgIGVkaXRJdGVtc0NvbnRhaW5lci5pbm5lckhUTUwgKz0gc3R1ZGllc0h0bWwoY291cnNlLmlkLCBjb3Vyc2UudGl0bGUsIGNvdXJzZS5pbnN0aXR1dGlvbiwgY291cnNlLmRhdGVfc3RhcnQsIGNvdXJzZS5kYXRlX2VuZCwgY291cnNlLmRlc2NyKTtcbiAgfSk7XG5cbiAgLy8gQ3JlYXRlIEZvcm1cbiAgZWRpdFNlY3Rpb24uaW5uZXJIVE1MID0gc3R1ZGllc0Zvcm1IdG1sKCk7XG5cbiAgLy8gSW5pdGlhdGUgSW5wdXQgVmFyaWFibGVzXG4gIGlucHV0U3R1ZGllc1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XG4gIGlucHV0U3R1ZGllc0luc3RpdHV0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RpdHV0aW9uJyk7XG4gIGlucHV0U3R1ZGllc1N0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0LWRhdGUnKTtcbiAgaW5wdXRTdHVkaWVzRW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuZC1kYXRlJyk7XG4gIGlucHV0U3R1ZGllc0Rlc2NyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyJyk7XG4gIGVkaXRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZm9ybScpO1xuXG59O1xuXG5cblxuLyogQ3JlYXRlcyBQb3J0Zm9saW8gU2VjdGlvblxuICAqIEBwYXJhbSAgICAgICAge29iamVjdH0gICAgICAgIGZldGNoRGF0YSAgICAgICBmZXRjaERhdGEucHJvamVjdHNcbiovXG5jb25zdCBjcmVhdGVQb3J0Zm9saW8gPSAoZmV0Y2hEYXRhKSA9PiB7XG4gIHJlc2V0RE9NKCk7XG5cbiAgY29uc3QgcHJvamVjdHMgPSBmZXRjaERhdGEucHJvamVjdHM7XG5cbiAgZWRpdEl0ZW1zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RyaW8nKTtcblxuICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgIGVkaXRJdGVtc0NvbnRhaW5lci5pbm5lckhUTUwgKz0gcG9ydGZvbGlvSHRtbChwcm9qZWN0LmlkLCBwcm9qZWN0LnRpdGxlLCBwcm9qZWN0LnByal91cmwsIHByb2plY3QuZGVzY3IsIHByb2plY3QuaW1nX3NyYyk7XG4gIH0pO1xuXG4gIC8vIENyZWF0ZSBGb3JtXG4gIGVkaXRTZWN0aW9uLmlubmVySFRNTCA9IHBvcnRmb2xpb0Zvcm1IdG1sKCk7XG5cbiAgLy8gSW5pdGlhdGUgSW5wdXQgVmFyaWFibGVzXG4gIGlucHV0UG9ydGZvbGlvVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKTtcbiAgaW5wdXRQb3J0Zm9saVVybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cmwnKTtcbiAgaW5wdXRQb3J0Zm9saW9EZXNjciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcicpO1xuICBpbnB1dFBvcnRmb2xpb0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ltYWdlJyk7XG4gIGVkaXRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZm9ybScpO1xuXG59O1xuIiwiLyogUE9SVEZPTElPICovXG4vKiBSZXR1cm5zIFBvcnRmb2xpbyBQb3N0IEhUTUxcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgaWQgICAgICAgICAgICAgIFBvc3QgSURcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgdGl0bGUgICAgICAgICAgIFByb2plY3QgVGl0bGVcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgdXJsICAgICAgICAgICAgIFByb2plY3QgVVJMXG4gICogQHBhcmFtICAge3N0cmluZ30gICAgIGRlc2NyICAgICAgICAgICBQcm9qZWN0IERlc2NyaXB0aW9uXG4qL1xuY29uc3QgcG9ydGZvbGlvSHRtbCA9IChpZCwgdGl0bGUsIHVybCwgZGVzY3IsIGltYWdlKSA9PiBgXG4gICAgICBcbiAgICAgIDxkaXYgY2xhc3M9XCJwb3J0Zm9saW8taXRlbVwiPlxuICAgICAgICA8aW1nIHNyYz1cIiR7aW1hZ2V9XCIgYWx0PVwiXCIgLz5cbiAgICAgICAgPGgzPiR7dGl0bGV9PC9oMz5cbiAgICAgICAgPGEgaHJlZj1cIiR7dXJsfVwiIHRhcmdldD1cIl9ibGFua1wiPiR7dXJsfTwvYT5cbiAgICAgICAgPHA+JHtkZXNjcn08L3A+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImVkaXQtaXRlbXNfY29udHJvbHNcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGRlbGV0ZVwiIGlkPVwiZGVsZXRlLSR7aWR9XCIgdmFsdWU9XCJkZWxldGVcIiBvbmNsaWNrPVwiZGVsZXRlUG9zdCgke2lkfSwgcG9ydGZvbGlvVXJsLCBjcmVhdGVQb3J0Zm9saW8pXCI+PGkgY2xhc3M9XCJmYXMgZmEtdHJhc2gtYWx0IGZhLTF4XCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gdXBkYXRlXCIgaWQ9XCJ1cGRhdGUtJHtpZH1cIiB2YWx1ZT1cInVwZGF0ZVwiIG9uY2xpY2s9XCJpbml0UG9ydGZvbGlvVXBkYXRlKCR7aWR9LCBwb3J0Zm9saW9VcmwpXCI+PGkgY2xhc3M9XCJmYXMgZmEtZWRpdCBmYS0xeFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG5cblxuLyogRk9STSAqL1xuLy8gSW5wdXQgRWxlbWVudHNcbmxldFxuICBpbnB1dFBvcnRmb2xpb1RpdGxlLFxuICBpbnB1dFBvcnRmb2xpVXJsLFxuICBpbnB1dFBvcnRmb2xpb0Rlc2NyLFxuICBpbnB1dFBvcnRmb2xpb0ltYWdlO1xuXG5cbi8qIFJldHVybnMgT2JqZWN0IHRvIHNlbmQgZm9yIFBPU1Qgb3IgUFVUKHdpdGggaWQpXG4gICogQHBhcmFtICAge3N0cmluZ30gICAgIGlkICAgICAgICAgICAgICBQb3N0IElEXG4qL1xuY29uc3QgcG9ydGZvbGlvRmV0Y2hPYmplY3QgPSAoaWQpID0+XG4gIGlkID8ge1xuICAgIHRva2VuOiBzZXNoVG9rZW4sXG4gICAgaWQ6IGlkLFxuICAgIHRpdGxlOiBpbnB1dFBvcnRmb2xpb1RpdGxlLnZhbHVlLFxuICAgIHByal91cmw6IGlucHV0UG9ydGZvbGlVcmwudmFsdWUsXG4gICAgZGVzY3I6IGlucHV0UG9ydGZvbGlvRGVzY3IudmFsdWUsXG4gICAgaW1nX3NyYzogaW5wdXRQb3J0Zm9saW9JbWFnZS52YWx1ZVxuICB9IDoge1xuICAgICAgdG9rZW46IHNlc2hUb2tlbixcbiAgICAgIHRpdGxlOiBpbnB1dFBvcnRmb2xpb1RpdGxlLnZhbHVlLFxuICAgICAgcHJqX3VybDogaW5wdXRQb3J0Zm9saVVybC52YWx1ZSxcbiAgICAgIGRlc2NyOiBpbnB1dFBvcnRmb2xpb0Rlc2NyLnZhbHVlLFxuICAgICAgaW1nX3NyYzogaW5wdXRQb3J0Zm9saW9JbWFnZS52YWx1ZVxuICAgIH07XG5cblxuLyogR2V0IFBvc3QgYW5kIEF1dG8gRmlsbCBJbnB1dCBGaWVsZHNcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgaWQgICAgICAgICAgICAgIFBvc3QgSURcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgdXJsICAgICAgICAgICAgIEFQSS11cmxcbiovXG5jb25zdCBpbml0UG9ydGZvbGlvVXBkYXRlID0gKGlkLCB1cmwpID0+IHtcbiAgdXBkYXRlSWQgPSBpZDtcblxuICBmZXRjaChgJHt1cmx9P2lkPSR7aWR9YClcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGNvbnN0IHsgaWQsIHRpdGxlLCBwcmpfdXJsLCBkZXNjciwgaW1nX3NyYyB9ID0gZGF0YS5wcm9qZWN0c1swXTtcblxuICAgICAgaW5wdXRQb3J0Zm9saW9UaXRsZS52YWx1ZSA9IHRpdGxlO1xuICAgICAgaW5wdXRQb3J0Zm9saVVybC52YWx1ZSA9IHByal91cmw7XG4gICAgICBpbnB1dFBvcnRmb2xpb0Rlc2NyLnZhbHVlID0gZGVzY3I7XG4gICAgICBpbnB1dFBvcnRmb2xpb0ltYWdlLnZhbHVlID0gaW1nX3NyYztcblxuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0KTtcbiAgICB9KVxufVxuXG5cbi8vIEZvcm0gSFRNTFxuY29uc3QgcG9ydGZvbGlvRm9ybUh0bWwgPSAoKSA9PiBgXG4gICAgICA8Zm9ybSBpZD1cImVkaXQtZm9ybVwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgcGxhY2Vob2xkZXI9XCJUaXRsZVwiIHJlcXVpcmVkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwidXJsXCI+VXJsPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidXJsXCIgaWQ9XCJ1cmxcIiBwbGFjZWhvbGRlcj1cIlVybFwiIHJlcXVpcmVkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwiZGVzY3JcIj5EZXNjcmlwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImRlc2NyXCIgaWQ9XCJkZXNjclwiIHBsYWNlaG9sZGVyPVwiRGVzY3JpcHRpb25cIiByZXF1aXJlZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cImltYWdlXCI+SW1hZ2U8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJpbWFnZVwiIGlkPVwiaW1hZ2VcIiBwbGFjZWhvbGRlcj1cIkltYWdlXCIgcmVxdWlyZWQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybV9idXR0b25zXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdFwiIGlkPVwic3VibWl0XCIgY2xhc3M9XCJidG5cIiBvbmNsaWNrPVwidXBkYXRlT3JBZGQoZXZlbnQsIHVwZGF0ZUlkLCBwb3J0Zm9saW9VcmwsIHBvcnRmb2xpb0ZldGNoT2JqZWN0LCBjcmVhdGVQb3J0Zm9saW8pXCI+IFxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJDYW5jZWxcIiBpZD1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuXCIgb25jbGljaz1cImNhbmNlbEZvcm0oZXZlbnQpXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICBgOyIsIi8qIFNLSUxMUyAqL1xuLyogUmV0dXJucyBTa2lsbCBQb3N0IEhUTUxcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgaWQgICAgICAgICBQb3N0IElEXG4gICogQHBhcmFtICAge3N0cmluZ30gICAgIHNraWxsICAgICAgUG9zdCBTa2lsbCBcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgaWNvbiAgICAgICBTa2lsbCBGb250IEF3ZXNvbWUgSWNvbiwgZS5nICdmYWIgZmEtcmVhY3QnXG4qL1xuY29uc3Qgc2tpbGxzSHRtbCA9IChpZCwgc2tpbGwsIGljb24pID0+IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJza2lsbFwiPlxuICAgICAgICA8aSBjbGFzcz1cIiR7aWNvbn0gZmEtM3hcIj48L2k+XG4gICAgICAgIDxzcGFuPiR7c2tpbGx9PC9zcGFuPlxuXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gZGVsZXRlXCIgaWQ9XCJkZWxldGUtJHtpZH1cIiB2YWx1ZT1cImRlbGV0ZVwiIG9uY2xpY2s9XCJkZWxldGVQb3N0KCR7aWR9LCBza2lsbHNVcmwsIGNyZWF0ZVNraWxscylcIj48aSBjbGFzcz1cImZhcyBmYS10cmFzaC1hbHQgZmEtMXhcIj48L2k+PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gdXBkYXRlXCIgaWQ9XCJ1cGRhdGUtJHtpZH1cIiB2YWx1ZT1cInVwZGF0ZVwiIG9uY2xpY2s9XCJpbml0U2tpbGxzVXBkYXRlKCR7aWR9LCBza2lsbHNVcmwpXCI+PGkgY2xhc3M9XCJmYXMgZmEtZWRpdCBmYS0xeFwiPjwvaT48L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgYFxuXG5cblxuXG4vKiBGT1JNICovXG4vLyBJbnB1dCBFbGVtZW50c1xubGV0XG4gIGlucHV0U2tpbGxzU2tpbGwsXG4gIGlucHV0U2tpbGxzSWNvbjtcblxuXG4vKiBSZXR1cm5zIE9iamVjdCB0byBzZW5kIGZvciBQT1NUIG9yIFBVVCh3aXRoIGlkKVxuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICBpZCAgICAgICAgICAgICAgUG9zdCBJRFxuKi9cbmNvbnN0IHNraWxsc0ZldGNoT2JqZWN0ID0gKGlkKSA9PlxuICBpZCA/IHtcbiAgICB0b2tlbjogc2VzaFRva2VuLFxuICAgIGlkOiBpZCxcbiAgICBza2lsbDogaW5wdXRTa2lsbHNTa2lsbC52YWx1ZSxcbiAgICBpY29uOiBpbnB1dFNraWxsc0ljb24udmFsdWUsXG4gIH0gOiB7XG4gICAgICB0b2tlbjogc2VzaFRva2VuLFxuICAgICAgc2tpbGw6IGlucHV0U2tpbGxzU2tpbGwudmFsdWUsXG4gICAgICBpY29uOiBpbnB1dFNraWxsc0ljb24udmFsdWUsXG4gICAgfTtcblxuXG4vKiBHZXQgUG9zdCBhbmQgQXV0byBGaWxsIElucHV0IEZpZWxkc1xuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICBpZCAgICAgICAgICAgICAgUG9zdCBJRFxuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICB1cmwgICAgICAgICAgICAgQVBJLXVybFxuKi9cbmNvbnN0IGluaXRTa2lsbHNVcGRhdGUgPSAoaWQsIHVybCkgPT4ge1xuICB1cGRhdGVJZCA9IGlkO1xuXG4gIGZldGNoKGAke3VybH0/aWQ9JHtpZH1gKVxuICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgY29uc3QgeyBza2lsbCwgaWNvbiB9ID0gZGF0YS5za2lsbHNbMF07XG5cbiAgICAgIGlucHV0U2tpbGxzU2tpbGwudmFsdWUgPSBza2lsbDtcbiAgICAgIGlucHV0U2tpbGxzSWNvbi52YWx1ZSA9IGljb247XG5cbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCk7XG4gICAgfSlcbn1cblxuXG4vLyBGb3JtIEhUTUxcbmNvbnN0IHNraWxsc0Zvcm1IdG1sID0gKCkgPT4gYFxuICAgICAgPGZvcm0gaWQ9XCJlZGl0LWZvcm1cIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwic2tpbGxcIj5Ta2lsbDwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNraWxsXCIgaWQ9XCJza2lsbFwiIHBsYWNlaG9sZGVyPVwiU2tpbGxcIiByZXF1aXJlZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cImljb25cIj5JY29uPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaWNvblwiIGlkPVwiaWNvblwiIHBsYWNlaG9sZGVyPVwiSWNvblwiIHJlcXVpcmVkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm1fYnV0dG9uc1wiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTdWJtaXRcIiBpZD1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuXCIgXG4gICAgICAgIG9uY2xpY2s9XCJ1cGRhdGVPckFkZChldmVudCwgdXBkYXRlSWQsIHNraWxsc1VybCwgc2tpbGxzRmV0Y2hPYmplY3QsIGNyZWF0ZVNraWxscylcIj4gXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIkNhbmNlbFwiIGlkPVwic3VibWl0XCIgY2xhc3M9XCJidG5cIiBvbmNsaWNrPVwiY2FuY2VsRm9ybShldmVudClcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgYCIsIi8qIFNUVURJRVMgKi9cbi8qIFJldHVybnMgU3R1ZGllcyBQb3N0IEhUTUxcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgaWQgICAgICAgICAgICAgIFBvc3QgSURcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgdGl0bGUgICAgICAgICAgIENvdXJzZSBUaXRsZVxuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICBpbnN0aXR1dGlvbiAgICAgQ291cnNlIEluc3RpdHV0aW9uXG4gICogQHBhcmFtICAge3N0cmluZ30gICAgIHN0YXJ0ICAgICAgICAgICBTdGFydCBEYXRlXG4gICogQHBhcmFtICAge3N0cmluZ30gICAgIGVuZCAgICAgICAgICAgICBFbmQgRGF0ZVxuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICBkZXNjciAgICAgICAgICAgQ291cnNlIERlc2NyaXB0aW9uXG4qL1xuY29uc3Qgc3R1ZGllc0h0bWwgPSAoaWQsIHRpdGxlLCBpbnN0aXR1dGlvbiwgc3RhcnQsIGVuZCwgZGVzY3IpID0+IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bWUtaXRlbVwiPlxuICAgICAgICA8aDQ+JHt0aXRsZX08L2g0PlxuICAgICAgICA8c3Bhbj4ke2luc3RpdHV0aW9ufTwvc3Bhbj48YnI+XG4gICAgICAgIDxzcGFuPiR7c3RhcnR9IOKAkyAke2VuZCA9PSAnMDAwMC0wMC0wMCcgPyAnQ3VycmVudCcgOiBlbmR9PC9zcGFuPlxuICAgICAgICA8cD4ke2Rlc2NyfTwvcD5cblxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGRlbGV0ZVwiIGlkPVwiZGVsZXRlLSR7aWR9XCIgdmFsdWU9XCJkZWxldGVcIiBvbmNsaWNrPVwiZGVsZXRlUG9zdCgke2lkfSwgc3R1ZGllc1VybCwgY3JlYXRlU3R1ZGllcylcIj48aSBjbGFzcz1cImZhcyBmYS10cmFzaC1hbHQgZmEtMXhcIj48L2k+PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gdXBkYXRlXCIgaWQ9XCJ1cGRhdGUtJHtpZH1cIiB2YWx1ZT1cInVwZGF0ZVwiIG9uY2xpY2s9XCJpbml0U3R1ZGllc1VwZGF0ZSgke2lkfSwgc3R1ZGllc1VybClcIj48aSBjbGFzcz1cImZhcyBmYS1lZGl0IGZhLTF4XCI+PC9pPjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuXG5cbi8qIEZPUk0gKi9cbi8vIElucHV0IEVsZW1lbnRzXG5sZXRcbiAgaW5wdXRTdHVkaWVzVGl0bGUsXG4gIGlucHV0U3R1ZGllc0luc3RpdHV0aW9uLFxuICBpbnB1dFN0dWRpZXNTdGFydCxcbiAgaW5wdXRTdHVkaWVzRW5kLFxuICBpbnB1dFN0dWRpZXNEZXNjcjtcblxuXG4vKiBSZXR1cm5zIE9iamVjdCB0byBzZW5kIGZvciBQT1NUIG9yIFBVVCh3aXRoIGlkKVxuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICBpZCAgICAgICAgICAgICAgUG9zdCBJRFxuKi9cbmNvbnN0IHN0dWRpZXNGZXRjaE9iamVjdCA9IChpZCkgPT5cbiAgaWQgPyB7XG4gICAgdG9rZW46IHNlc2hUb2tlbixcbiAgICBpZDogaWQsXG4gICAgdGl0bGU6IGlucHV0U3R1ZGllc1RpdGxlLnZhbHVlLFxuICAgIGluc3RpdHV0aW9uOiBpbnB1dFN0dWRpZXNJbnN0aXR1dGlvbi52YWx1ZSxcbiAgICBkYXRlX3N0YXJ0OiBpbnB1dFN0dWRpZXNTdGFydC52YWx1ZSxcbiAgICBkYXRlX2VuZDogaW5wdXRTdHVkaWVzRW5kLnZhbHVlLFxuICAgIGRlc2NyOiBpbnB1dFN0dWRpZXNEZXNjci52YWx1ZVxuICB9IDoge1xuICAgICAgdG9rZW46IHNlc2hUb2tlbixcbiAgICAgIHRpdGxlOiBpbnB1dFN0dWRpZXNUaXRsZS52YWx1ZSxcbiAgICAgIGluc3RpdHV0aW9uOiBpbnB1dFN0dWRpZXNJbnN0aXR1dGlvbi52YWx1ZSxcbiAgICAgIGRhdGVfc3RhcnQ6IGlucHV0U3R1ZGllc1N0YXJ0LnZhbHVlLFxuICAgICAgZGF0ZV9lbmQ6IGlucHV0U3R1ZGllc0VuZC52YWx1ZSxcbiAgICAgIGRlc2NyOiBpbnB1dFN0dWRpZXNEZXNjci52YWx1ZVxuICAgIH07XG5cblxuXG4vKiBHZXQgUG9zdCBhbmQgQXV0byBGaWxsIElucHV0IEZpZWxkc1xuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICBpZCAgICAgICAgICAgICAgUG9zdCBJRFxuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICB1cmwgICAgICAgICAgICAgQVBJLXVybFxuKi9cbmNvbnN0IGluaXRTdHVkaWVzVXBkYXRlID0gKGlkLCB1cmwpID0+IHtcbiAgdXBkYXRlSWQgPSBpZDtcblxuICBmZXRjaChgJHt1cmx9P2lkPSR7aWR9YClcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGNvbnN0IHsgaWQsIHRpdGxlLCBpbnN0aXR1dGlvbiwgZGF0ZV9zdGFydCwgZGF0ZV9lbmQsIGRlc2NyIH0gPSBkYXRhLmNvdXJzZXNbMF07XG5cbiAgICAgIGlucHV0U3R1ZGllc1RpdGxlLnZhbHVlID0gdGl0bGU7XG4gICAgICBpbnB1dFN0dWRpZXNJbnN0aXR1dGlvbi52YWx1ZSA9IGluc3RpdHV0aW9uO1xuICAgICAgaW5wdXRTdHVkaWVzU3RhcnQudmFsdWUgPSBkYXRlX3N0YXJ0O1xuICAgICAgaW5wdXRTdHVkaWVzRW5kLnZhbHVlID0gZGF0ZV9lbmQ7XG4gICAgICBpbnB1dFN0dWRpZXNEZXNjci52YWx1ZSA9IGRlc2NyO1xuXG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQpO1xuICAgIH0pXG59XG5cblxuLy8gRm9ybSBIVE1MXG5jb25zdCBzdHVkaWVzRm9ybUh0bWwgPSAoKSA9PiBgXG4gICAgICA8Zm9ybSBpZD1cImVkaXQtZm9ybVwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgcGxhY2Vob2xkZXI9XCJUaXRsZVwiIHJlcXVpcmVkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwiaW5zdGl0dXRpb25cIj5JbnN0aXR1dGlvbjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImluc3RpdHV0aW9uXCIgaWQ9XCJpbnN0aXR1dGlvblwiIHBsYWNlaG9sZGVyPVwiSW5zdGl0dXRpb25cIiByZXF1aXJlZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cInN0YXJ0LWRhdGVcIj5TdGFydCBEYXRlPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic3RhcnQtZGF0ZVwiIGlkPVwic3RhcnQtZGF0ZVwiIHBsYWNlaG9sZGVyPVwiU3RhcnQgRGF0ZVwiIHJlcXVpcmVkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwiZW5kLWRhdGVcIj5FbmQgRGF0ZTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImVuZC1kYXRlXCIgaWQ9XCJlbmQtZGF0ZVwiIHBsYWNlaG9sZGVyPVwiRW5kIERhdGVcIiByZXF1aXJlZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cImRlc2NyXCI+RGVzY3JpcHRpb248L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJkZXNjclwiIGlkPVwiZGVzY3JcIiBwbGFjZWhvbGRlcj1cIkRlc2NyaXB0aW9uXCIgcmVxdWlyZWQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybV9idXR0b25zXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdFwiIGlkPVwic3VibWl0XCIgY2xhc3M9XCJidG5cIiBvbmNsaWNrPVwidXBkYXRlT3JBZGQoZXZlbnQsIHVwZGF0ZUlkLCBzdHVkaWVzVXJsLCBzdHVkaWVzRmV0Y2hPYmplY3QsIGNyZWF0ZVN0dWRpZXMpXCI+IFxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJDYW5jZWxcIiBpZD1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuXCIgb25jbGljaz1cImNhbmNlbEZvcm0oZXZlbnQpXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICBgOyIsIi8qIFdPUksgKi9cbi8qIFJldHVybnMgV29yayBQb3N0IEhUTUxcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgaWQgICAgICAgICAgICAgIFBvc3QgSURcbiAgKiBAcGFyYW0gICB7c3RyaW5nfSAgICAgY29tcGFueSAgICAgICAgIFdvcmsgQ29tcGFueSBOYW1lXG4gICogQHBhcmFtICAge3N0cmluZ30gICAgIHRpdGxlICAgICAgICAgICBXb3JrIFRpdGxlXG4gICogQHBhcmFtICAge3N0cmluZ30gICAgIHN0YXJ0ICAgICAgICAgICBTdGFydCBEYXRlXG4gICogQHBhcmFtICAge3N0cmluZ30gICAgIGVuZCAgICAgICAgICAgICBFbmQgRGF0ZVxuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICBkZXNjciAgICAgICAgICAgSm9iIERlc2NyaXB0aW9uXG4qL1xuY29uc3Qgd29ya0h0bWwgPSAoaWQsIGNvbXBhbnksIHRpdGxlLCBzdGFydCwgZW5kLCBkZXNjcikgPT4gYFxuICAgICAgPGRpdiBjbGFzcz1cInJlc3VtZS1pdGVtXCI+XG4gICAgICAgIDxoND4ke2NvbXBhbnl9PC9oND5cbiAgICAgICAgPHNwYW4+JHt0aXRsZX08L3NwYW4+PGJyPlxuICAgICAgICA8c3Bhbj4ke3N0YXJ0fSDigJMgJHtlbmQgPT0gJzAwMDAtMDAtMDAnID8gJ0N1cnJlbnQnIDogZW5kfTwvc3Bhbj5cbiAgICAgICAgPHA+JHtkZXNjcn08L3A+XG5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBkZWxldGVcIiBpZD1cImRlbGV0ZS0ke2lkfVwiIHZhbHVlPVwiZGVsZXRlXCIgb25jbGljaz1cImRlbGV0ZVBvc3QoJHtpZH0sIHdvcmtVcmwsIGNyZWF0ZVdvcmspXCI+PGkgY2xhc3M9XCJmYXMgZmEtdHJhc2gtYWx0IGZhLTF4XCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHVwZGF0ZVwiIGlkPVwidXBkYXRlLSR7aWR9XCIgdmFsdWU9XCJ1cGRhdGVcIiBvbmNsaWNrPVwiaW5pdFdvcmtVcGRhdGUoJHtpZH0sIHdvcmtVcmwpXCI+PGkgY2xhc3M9XCJmYXMgZmEtZWRpdCBmYS0xeFwiPjwvaT48L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cblxuXG4vKiBGT1JNICovXG4vLyBJbnB1dCBFbGVtZW50c1xubGV0XG4gIGlucHV0V29ya0NvbXBhbnksXG4gIGlucHV0V29ya1RpdGxlLFxuICBpbnB1dFdvcmtTdGFydCxcbiAgaW5wdXRXb3JrRW5kLFxuICBpbnB1dFdvcmtEZXNjcjtcblxuXG4vKiBSZXR1cm5zIE9iamVjdCB0byBzZW5kIGZvciBQT1NUIG9yIFBVVCh3aXRoIGlkKVxuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICBpZCAgICAgICAgICAgICAgUG9zdCBJRFxuKi9cbmNvbnN0IHdvcmtGZXRjaE9iamVjdCA9IChpZCkgPT5cbiAgaWQgPyB7XG4gICAgdG9rZW46IHNlc2hUb2tlbixcbiAgICBpZDogaWQsXG4gICAgY29tcGFueTogaW5wdXRXb3JrQ29tcGFueS52YWx1ZSxcbiAgICB0aXRsZTogaW5wdXRXb3JrVGl0bGUudmFsdWUsXG4gICAgZGF0ZV9zdGFydDogaW5wdXRXb3JrU3RhcnQudmFsdWUsXG4gICAgZGF0ZV9lbmQ6IGlucHV0V29ya0VuZC52YWx1ZSxcbiAgICBkZXNjcjogaW5wdXRXb3JrRGVzY3IudmFsdWVcbiAgfSA6IHtcbiAgICAgIHRva2VuOiBzZXNoVG9rZW4sXG4gICAgICBjb21wYW55OiBpbnB1dFdvcmtDb21wYW55LnZhbHVlLFxuICAgICAgdGl0bGU6IGlucHV0V29ya1RpdGxlLnZhbHVlLFxuICAgICAgZGF0ZV9zdGFydDogaW5wdXRXb3JrU3RhcnQudmFsdWUsXG4gICAgICBkYXRlX2VuZDogaW5wdXRXb3JrRW5kLnZhbHVlLFxuICAgICAgZGVzY3I6IGlucHV0V29ya0Rlc2NyLnZhbHVlXG4gICAgfTtcblxuXG4vKiBHZXQgUG9zdCBhbmQgQXV0byBGaWxsIElucHV0IEZpZWxkc1xuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICBpZCAgICAgICAgICAgICAgUG9zdCBJRFxuICAqIEBwYXJhbSAgIHtzdHJpbmd9ICAgICB1cmwgICAgICAgICAgICAgQVBJLXVybFxuKi9cbmNvbnN0IGluaXRXb3JrVXBkYXRlID0gKGlkLCB1cmwpID0+IHtcbiAgdXBkYXRlSWQgPSBpZDtcblxuICBmZXRjaChgJHt1cmx9P2lkPSR7aWR9YClcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGNvbnN0IHsgaWQsIGNvbXBhbnksIHRpdGxlLCBkYXRlX3N0YXJ0LCBkYXRlX2VuZCwgZGVzY3IgfSA9IGRhdGEuam9ic1swXTtcblxuICAgICAgaW5wdXRXb3JrQ29tcGFueS52YWx1ZSA9IGNvbXBhbnk7XG4gICAgICBpbnB1dFdvcmtUaXRsZS52YWx1ZSA9IHRpdGxlO1xuICAgICAgaW5wdXRXb3JrU3RhcnQudmFsdWUgPSBkYXRlX3N0YXJ0O1xuICAgICAgaW5wdXRXb3JrRW5kLnZhbHVlID0gZGF0ZV9lbmQ7XG4gICAgICBpbnB1dFdvcmtEZXNjci52YWx1ZSA9IGRlc2NyO1xuXG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQpO1xuICAgIH0pXG59XG5cblxuLy8gRm9ybVxuY29uc3Qgd29ya0Zvcm1IdG1sID0gKCkgPT4gYFxuICAgICAgPGZvcm0gaWQ9XCJlZGl0LWZvcm1cIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwiY29tcGFueVwiPkNvbXBhbnk8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJjb21wYW55XCIgaWQ9XCJjb21wYW55XCIgcGxhY2Vob2xkZXI9XCJDb21wYW55XCIgcmVxdWlyZWQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGl0bGVcIiBpZD1cInRpdGxlXCIgcGxhY2Vob2xkZXI9XCJUaXRsZVwiIHJlcXVpcmVkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwic3RhcnQtZGF0ZVwiPlN0YXJ0IERhdGU8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzdGFydC1kYXRlXCIgaWQ9XCJzdGFydC1kYXRlXCIgcGxhY2Vob2xkZXI9XCJTdGFydCBEYXRlXCIgcmVxdWlyZWQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbmQtZGF0ZVwiPkVuZCBEYXRlPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZW5kLWRhdGVcIiBpZD1cImVuZC1kYXRlXCIgcGxhY2Vob2xkZXI9XCJFbmQgRGF0ZVwiIHJlcXVpcmVkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwiZGVzY3JcIj5EZXNjcmlwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImRlc2NyXCIgaWQ9XCJkZXNjclwiIHBsYWNlaG9sZGVyPVwiRGVzY3JpcHRpb25cIiByZXF1aXJlZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtX2J1dHRvbnNcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU3VibWl0XCIgaWQ9XCJzdWJtaXRcIiBjbGFzcz1cImJ0blwiIG9uY2xpY2s9XCJ1cGRhdGVPckFkZChldmVudCwgdXBkYXRlSWQsIHdvcmtVcmwsIHdvcmtGZXRjaE9iamVjdCwgY3JlYXRlV29yaylcIj4gXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIkNhbmNlbFwiIGlkPVwic3VibWl0XCIgY2xhc3M9XCJidG5cIiBvbmNsaWNrPVwiY2FuY2VsRm9ybShldmVudClcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Zvcm0+XG4gIGA7Il19
