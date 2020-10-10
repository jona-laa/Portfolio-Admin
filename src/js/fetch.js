// Output Elements
const
  editItemsContainer = document.querySelector('#edit-items_container');


// API URLs
const aboutUrl = 'http://localhost:8080/portfolio/api/bio';
const skillsUrl = 'http://localhost:8080/portfolio/api/skills';
const workUrl = 'http://localhost:8080/portfolio/api/jobs';
const studiesUrl = 'http://localhost:8080/portfolio/api/courses';
const portfolioUrl = 'http://localhost:8080/portfolio/api/projects';



/********** GET **********/
/* Gets data and creates appropriate element
  * @param        {string}        url                 API-url
  * @param        {function}      createElement       createBio/Skills/Work/Studies/Portfolio
*/
const fetchAndCreate = (url, createElement) => {
  fetch(url)
    .then(res => res.json())
    .then(data => createElement(data))
    .catch(e => console.error(e))
};



/* Creates About Section
  * @param        {object}        fetchData       fetchData.bios[0].id/heading/bio/img_src
*/
const createBio = (fetchData) => {
  resetDOM();

  editItemsContainer.classList.remove('trio');

  const bios = fetchData.bios;

  bios.forEach(bio => {
    editItemsContainer.innerHTML += aboutHtml(bio.id, bio.heading, bio.bio, bio.img_src, bio.published);
  });
};



/* Creates Skills Section
  * @param        {object}        fetchData       fetchData.skills
*/
const createSkills = (fetchData) => {
  resetDOM();

  editItemsContainer.classList.remove('trio');

  const skills = fetchData.skills;

  skills.forEach(skill => {
    editItemsContainer.innerHTML += skillsHtml(skill.id, skill.skill, skill.icon);
  })
};



/* Creates Work Section
  * @param        {object}        fetchData       fetchData.jobs
*/
const createWork = (fetchData) => {
  resetDOM();

  const jobs = fetchData.jobs;

  editItemsContainer.classList.add('trio')

  jobs.forEach(job => {
    editItemsContainer.innerHTML += workHtml(job.id, job.company, job.title, job.date_start, job.date_end, job.descr);
  });
};



/* Creates Studies Section
  * @param        {object}        fetchData       fetchData.courses
*/
const createStudies = (fetchData) => {
  resetDOM();

  const courses = fetchData.courses;

  editItemsContainer.classList.add('trio');

  courses.forEach(course => {
    editItemsContainer.innerHTML += studiesHtml(course.id, course.title, course.institution, course.date_start, course.date_end, course.descr);
  });
};



/* Creates Portfolio Section
  * @param        {object}        fetchData       fetchData.projects
*/
const createPortfolio = (fetchData) => {
  resetDOM();

  const projects = fetchData.projects;

  editItemsContainer.classList.add('trio');

  projects.forEach(project => {
    editItemsContainer.innerHTML += portfolioHtml(project.id, project.title, project.prj_url, project.descr, project.img_src);
  });
};



// window.addEventListener("load",
//   fetchAndCreate(aboutUrl, createBio),
//   fetchAndCreate(skillsUrl, createSkills),
//   fetchAndCreate(workUrl, createWork),
//   fetchAndCreate(studiesUrl, createStudies),
//   fetchAndCreate(portfolioUrl, createPortfolio)
// );
