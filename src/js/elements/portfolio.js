/* PORTFOLIO */
// Post
const portfolioHtml = (id, title, url, descr, image) => `
      <div class="portfolio-item">
        <img src="${image}" alt="" />

        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id}, portfolioUrl, createPortfolio)"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initPortfolioUpdate(${id}, portfolioUrl)"><i class="fas fa-edit fa-1x"></i></button>
      </div>
    `;



/* FORM */
// Input Elements
let
  inputPortfolioTitle,
  inputPortfoliUrl,
  inputPortfolioDescr,
  inputPortfolioImage;


// Object to send for POST(id) or PUT
const portfolioFetchObject = (id) =>
  id ? {
    id: id,
    title: inputPortfolioTitle.value,
    prj_url: inputPortfoliUrl.value,
    descr: inputPortfolioDescr.value,
    img_src: inputPortfolioImage.value
  } : {
      title: inputPortfolioTitle.value,
      prj_url: inputPortfoliUrl.value,
      descr: inputPortfolioDescr.value,
      img_src: inputPortfolioImage.value
    };


// Get post and auto fill input fields
const initPortfolioUpdate = (id, url) => {
  updateId = id;

  fetch(`${url}?id=${id}`)
    .then(res => res.json())
    .then(data => {
      const { id, title, prj_url, descr, img_src } = data.projects[0];

      inputPortfolioTitle.value = title;
      inputPortfoliUrl.value = prj_url;
      inputPortfolioDescr.value = descr;
      inputPortfolioImage.value = img_src;

      window.scrollTo(0, document.body.scrollHeight);
    })
}


// Form HTML
const portfolioFormHtml = () => `
      <form id="edit-form">
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
        <div class="form_buttons">
          <input type="submit" value="Submit" id="submit" class="btn" onclick="updateOrAdd(event, updateId, portfolioUrl, portfolioFetchObject, createPortfolio)"> 
          <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
        </div>
      </form>
  `;