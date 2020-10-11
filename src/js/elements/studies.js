/* STUDIES */
// Post
const studiesHtml = (id, title, institution, start, end, descr) => `
      <div class="resume-item">
        <h4>${title}</h4>
        <span>${institution}</span><br>
        <span>${start} – ${end}</span>
        <p>${descr}</p>

        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id})"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initUpdate(${id})"><i class="fas fa-edit fa-1x"></i></button>
      </div>
    `;

// Form
const studiesFormHtml = () => `
      <form class="edit-form">
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
        <input type="submit" value="Submit" id="submit" class="btn" onclick="updateOrAdd(event, updateId, studiesUrl)"> 
        <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
      </form>
  `;