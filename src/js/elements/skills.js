/* SKILLS */
// Post
const skillsHtml = (id, skill, icon) => `
      <div class="skill">
        <i class="${icon} fa-3x"></i>
        <span>${skill}</span>

        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id})"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initUpdate(${id})"><i class="fas fa-edit fa-1x"></i></button>
      </div>
      
    `

// Form
const skillsFormHtml = () => `
      <form class="edit-form">
        <div>
          <label for="skill">Skill</label>
          <input type="text" name="skill" id="skill" placeholder="Skill" required>
        </div>
        <div>
          <label for="icon">Icon</label>
          <input type="text" name="icon" id="icon" placeholder="Icon" required>
        </div>
        <input type="submit" value="Submit" id="submit" class="btn" onclick="updateOrAdd(event, updateId, skillsUrl)"> 
        <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
      </form>
  `