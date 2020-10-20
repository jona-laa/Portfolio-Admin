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
        <button class="btn update" id="update-${id}" value="update" onclick="initWorkUpdate(${id})"><i class="fas fa-edit fa-1x"></i></button>
      </div>
    `;



/* FORM */
// Input Elements
let
  inputWorkCompany,
  inputWorkTitle,
  inputWorkStart,
  inputWorkEnd,
  inputWorkDescr;


/* Returns Object to send for POST or PUT(with id)
  * @param   {string}     id              Post ID
*/
const workFetchObject = (id) =>
  id ? {
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
*/
const initWorkUpdate = (id) => {
  updateId = id;

  const objIndex = JSON.parse(localStorage.jobs).findIndex(obj => obj.id == id);

  const { company, title, date_start, date_end, descr } = JSON.parse(localStorage.jobs)[objIndex];

  inputWorkCompany.value = company;
  inputWorkTitle.value = title;
  inputWorkStart.value = date_start;
  inputWorkEnd.value = date_end;
  inputWorkDescr.value = descr;

  window.scrollTo(0, document.body.scrollHeight);
}


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