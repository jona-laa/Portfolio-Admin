/* SKILLS */
// Post
const skillsHtml = (id, skill, icon) => `
      <div class="skill">
        <i class="${icon} fa-3x"></i>
        <span>${skill}</span>

        <button class="btn delete" id="delete-${id}" value="delete" onclick="deletePost(${id}, skillsUrl, createSkills)"><i class="fas fa-trash-alt fa-1x"></i></button>
        <button class="btn update" id="update-${id}" value="update" onclick="initSkillsUpdate(${id}, skillsUrl)"><i class="fas fa-edit fa-1x"></i></button>
      </div>
      
    `




/* FORM */
// Input Elements
let
  inputSkillsSkill,
  inputSkillsIcon;


// Object to send for POST(id) or PUT
const skillsFetchObject = (id) =>
  id ? {
    id: id,
    skill: inputSkillsSkill.value,
    icon: inputSkillsIcon.value,
  } : {
      skill: inputSkillsSkill.value,
      icon: inputSkillsIcon.value,
    };


// Get post and auto fill input fields
const initSkillsUpdate = (id, url) => {
  updateId = id;

  fetch(`${url}?id=${id}`)
    .then(res => res.json())
    .then(data => {
      const { skill, icon } = data.skills[0];

      inputSkillsSkill.value = skill;
      inputSkillsIcon.value = icon;

      window.scrollTo(0, document.body.scrollHeight);
    })
}


// Form HTML
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
        <input type="submit" value="Submit" id="submit" class="btn" 
        onclick="updateOrAdd(event, updateId, skillsUrl, skillsFetchObject, createSkills)"> 
        <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
      </form>
  `