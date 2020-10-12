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
        <span>${start} – ${end}</span>
        <p>${descr}</p>

        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id}, studiesUrl, createStudies)"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initStudiesUpdate(${id}, studiesUrl)"><i class="fas fa-edit fa-1x"></i></button>
      </div>
    `;



/* FORM */
// Input Elements
let
  inputStudiesTitle,
  inputStudiesInstitution,
  inputStudiesStart,
  inputStudiesEnd,
  inputStudiesDescr;


/* Returns Object to send for POST or PUT(with id)
  * @param   {string}     id              Post ID
*/
const studiesFetchObject = (id) =>
  id ? {
    id: id,
    title: inputStudiesTitle.value,
    institution: inputStudiesInstitution.value,
    date_start: inputStudiesStart.value,
    date_end: inputStudiesEnd.value,
    descr: inputStudiesDescr.value
  } : {
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

  fetch(`${url}?id=${id}`)
    .then(res => res.json())
    .then(data => {
      const { id, title, institution, date_start, date_end, descr } = data.courses[0];

      inputStudiesTitle.value = title;
      inputStudiesInstitution.value = institution;
      inputStudiesStart.value = date_start;
      inputStudiesEnd.value = date_end;
      inputStudiesDescr.value = descr;

      window.scrollTo(0, document.body.scrollHeight);
    })
}


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