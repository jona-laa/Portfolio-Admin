/* PORTFOLIO */
/* Returns Portfolio Post HTML
  * @param   {string}     id              Post ID
  * @param   {string}     title           Project Title
  * @param   {string}     url             Project URL
  * @param   {string}     descr           Project Description
*/
const portfolioHtml = (id, title, url, descr, image) => `
      
      <div class="portfolio-item">
        <img src="${image}" alt="" />
        <h3>${title}</h3>
        <a href="${url}" target="_blank">${url}</a>
        <p>${descr}</p>

        <div class="edit-items_controls">
          <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id}, portfolioUrl, createPortfolio)"><i class="fas fa-trash-alt fa-1x"></i></button>
          <button class="btn update" id="update-${id}" value="update" onclick="initPortfolioUpdate(${id})"><i class="fas fa-edit fa-1x"></i></button>
        </div>
      </div>
    `;



/* FORM */
// Input Elements
let
  inputPortfolioTitle,
  inputPortfoliUrl,
  inputPortfolioDescr,
  inputPortfolioImage;


/* Returns Object to send for POST or PUT(with id)
  * @param   {string}     id              Post ID
*/
const portfolioFetchObject = (id) =>
  id ? {
    token: seshToken,
    id: id,
    title: inputPortfolioTitle.value,
    prj_url: inputPortfoliUrl.value,
    descr: inputPortfolioDescr.value,
    img_src: inputPortfolioImage.value
  } : {
      token: seshToken,
      title: inputPortfolioTitle.value,
      prj_url: inputPortfoliUrl.value,
      descr: inputPortfolioDescr.value,
      img_src: inputPortfolioImage.value
    };


/* Get Post and Auto Fill Input Fields
  * @param   {string}     id              Post ID
*/
const initPortfolioUpdate = (id) => {
  updateId = id;

  const objIndex = JSON.parse(localStorage.projects).findIndex(obj => obj.id == id);

  const { title, prj_url, descr, img_src } = JSON.parse(localStorage.projects)[objIndex];

  inputPortfolioTitle.value = title;
  inputPortfoliUrl.value = prj_url;
  inputPortfolioDescr.value = descr;
  inputPortfolioImage.value = img_src;
  
  window.scrollTo(0, document.body.scrollHeight);
}


// Form HTML
const portfolioFormHtml = () => `
      <form id="edit-form">
        <div>
          <input type="text" name="title" id="title" placeholder="Title" required>
          <label for="title">Title</label>
        </div>
        <div>
          <input type="text" name="url" id="url" placeholder="Url" required>
          <label for="url">Url</label>
        </div>
        <div>
          <input type="text" name="descr" id="descr" placeholder="Description" required>
          <label for="descr">Description</label>
        </div>
        <div>
          <input type="text" name="image" id="image" placeholder="Image" required>
          <label for="image">Image</label>
        </div>
        <div class="form_buttons">
          <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
          <input type="submit" value="Submit" id="submit" class="btn" onclick="updateOrAdd(event, updateId, portfolioUrl, portfolioFetchObject, createPortfolio)"> 
        </div>
      </form>
  `;