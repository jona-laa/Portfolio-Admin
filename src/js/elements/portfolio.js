/* PORTFOLIO */
// Post
const portfolioHtml = (id, title, url, descr, image) => `
      <div class="portfolio-item">
        <img src="${image}" alt="" />

        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id})"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initUpdate(${id})"><i class="fas fa-edit fa-1x"></i></button>
      </div>
    `;

// Form
const portfolioFormHtml = () => `
      <form class="edit-form">
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
        <input type="submit" value="Submit" id="submit" class="btn" onclick="updateOrAdd(event, updateId, portfolioUrl)"> 
        <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
      </form>
  `;