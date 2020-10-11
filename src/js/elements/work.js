/* WORK */
// Post
const workHtml = (id, company, title, start, end, descr) => `
      <div class="resume-item">
        <h4>${company}</h4>
        <span>${title}</span><br>
        <span>${start} – ${end}</span>
        <p>${descr}</p>

        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id})"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initUpdate(${id})"><i class="fas fa-edit fa-1x"></i></button>
      </div>
    `;

// Form
const workFormHtml = () => `
      <form class="edit-form">
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
        <input type="submit" value="Submit" id="submit" class="btn" onclick="updateOrAdd(event, updateId, workUrl)"> 
        <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
      </form>
  `;