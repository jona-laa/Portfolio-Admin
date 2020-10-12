/* Creates About Section
  * @param        {object}        fetchData       fetchData.bios[0].id/heading/bio/img_src
*/
const createBio = (fetchData) => {
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
const createSkills = (fetchData) => {
  resetDOM();

  editItemsContainer.classList.remove('trio');

  const skills = fetchData.skills;

  skills.forEach(skill => {
    editItemsContainer.innerHTML += skillsHtml(skill.id, skill.skill, skill.icon);
  })

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
const createWork = (fetchData) => {
  resetDOM();

  const jobs = fetchData.jobs;

  editItemsContainer.classList.add('trio')

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
const createStudies = (fetchData) => {
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
const createPortfolio = (fetchData) => {
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
