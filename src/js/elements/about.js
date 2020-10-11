/* ABOUT */
// Post
const aboutItemHtml = (id, heading, bio, image, published) =>
    `
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
        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id}, aboutUrl)"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initUpdate(${id})"><i class="fas fa-edit fa-1x"></i></button>
      </div>
    `;

// Form
const aboutFormHtml = () => `
      <form class="edit-form">
        <div>
          <label for="heading">Heading</label>
          <input type="text" name="heading" id="heading" placeholder="Heading" required>
        </div>
        <div>
          <label for="image">Image</label>
          <input type="text" name="image" id="image" placeholder="Image Src" required>
        </div>
        <textarea id="bio" placeholder="About Text" required></textarea>
        <div>
          <label for="published">Publish?</label>
          <span>Publish?</span>
          <input type="checkbox" id="published" name="published">
        </div>
        <input type="submit" value="Submit" id="submit" class="btn" onclick="updateOrAdd(event, updateId, aboutUrl)"> 
        <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
      </form>
  `