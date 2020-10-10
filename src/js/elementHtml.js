const aboutHtml = (id, heading, bio, image, published) =>
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
        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id})"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initUpdate(${id})"><i class="fas fa-edit fa-1x"></i></button>
      </div>
    `;



const skillsHtml = (id, skill, icon) => `
      <div class="skill">
        <i class="${icon} fa-3x"></i>
        <span>${skill}</span>

        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id})"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initUpdate(${id})"><i class="fas fa-edit fa-1x"></i></button>
      </div>
    `



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



const portfolioHtml = (id, title, url, descr, image) => `
      <div class="portfolio-item">
        <img src="${image}" alt="" />

        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id})"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initUpdate(${id})"><i class="fas fa-edit fa-1x"></i></button>
      </div>
    `;