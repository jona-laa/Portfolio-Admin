/* ABOUT */

/* POST */
// Post HTML
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
  <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id}, aboutUrl, createAbout)"><i class="fas fa-trash-alt fa-1x"></i></button>
  <button class="btn update" id="update-${id}" value="update" onclick="initAboutUpdate(${id}, aboutUrl)"><i class="fas fa-edit fa-1x"></i></button>
  </div>
`;



/* FORM */
// Input Elements
let
  inputAboutHeading,
  inputAboutImage,
  inputAboutBio,
  inputAboutPublished;


// Object to send for POST(id) or PUT
const aboutFetchObject = (id) =>
  id ? {
    id: id,
    heading: inputAboutHeading.value,
    img_src: inputAboutImage.value,
    bio: inputAboutBio.value,
    published: inputAboutPublished.checked ? true : false
  } : {
      heading: inputAboutHeading.value,
      img_src: inputAboutImage.value,
      bio: inputAboutBio.value,
      published: inputAboutPublished.checked ? true : false
    };


// Get post and auto fill input fields
const initAboutUpdate = (id, url) => {
  updateId = id;

  fetch(`${url}?id=${id}`)
    .then(res => res.json())
    .then(data => {
      const { id, heading, bio, img_src, published } = data.bios[0];

      inputAboutHeading.value = heading;
      inputAboutBio.value = bio;
      inputAboutImage.value = img_src;
      inputAboutPublished.checked = published == 1 ? true : false;

      window.scrollTo(0, document.body.scrollHeight);
    })
}


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
         <div class="feedback">
            <span id="feedback-message"></span>
        </div>
        <div class="form_buttons">
            <input type="submit" value="Submit" id="submit" class="btn" onclick="updateOrAdd(event, updateId, aboutUrl, aboutFetchObject, createBio)"> 

            <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
        </div>
      </form>
  `