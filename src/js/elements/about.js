/* ABOUT */

/* POST */
/* Returns About Post HTML
  * @param   {string}     id              Post ID
  * @param   {string}     heading         Post Heading
  * @param   {string}     bio             Post About Content
  * @param   {boolean}    published       If published or no. (Actually 1 for true or 0 for false)
*/
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
  <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id}, aboutUrl, createBio)"><i class="fas fa-trash-alt fa-1x"></i></button>
  <button class="btn update" id="update-${id}" value="update" onclick="initAboutUpdate(${id})"><i class="fas fa-edit fa-1x"></i></button>
  </div>
`;



/* FORM */
// Input Elements
let
  inputAboutHeading,
  inputAboutImage,
  inputAboutBio,
  inputAboutPublished;


/* Returns Object to send for POST or PUT(with id)
  * @param   {string}     id              Post ID
*/
const aboutFetchObject = (id) =>
  id ? {
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
*/
const initAboutUpdate = (id) => {
  updateId = id;

  const objIndex = JSON.parse(localStorage.about).findIndex(obj => obj.id == id);

  const { heading, bio, img_src, published } = JSON.parse(localStorage.about)[objIndex];

  inputAboutHeading.value = heading;
  inputAboutBio.value = bio;
  inputAboutImage.value = img_src;
  inputAboutPublished.checked = published == 1 ? true : false;

  window.scrollTo(0, document.body.scrollHeight);
}


// Form HTML
const aboutFormHtml = () => `
      <form id="edit-form">
        <div>
          <input type="text" name="heading" id="heading" placeholder="Heading" required>
          <label for="heading">Heading</label>
        </div>
        <div>
          <input type="text" name="image" id="image" placeholder="Image Src" required>
          <label for="image">Image</label>
        </div>
        <div class="textarea">
          <textarea id="bio" placeholder="About Text" required></textarea>
          <label for="bio">About Me</label>
        </div>
        <div class="form_checkbox">
          <input type="checkbox" id="published" name="published">
          <label for="published">Publish?</label>
        </div>
        <div class="form_buttons">
          <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
          <input type="submit" value="Submit" id="submit" class="btn" onclick="updateOrAdd(event, updateId, aboutUrl, aboutFetchObject, createBio)"> 
        </div>
        </form>
  `