/* SKILLS */
/* Returns Skill Post HTML
  * @param   {string}     id         Post ID
  * @param   {string}     skill      Post Skill 
  * @param   {string}     icon       Skill Font Awesome Icon, e.g 'fab fa-react'
*/
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


/* Returns Object to send for POST or PUT(with id)
  * @param   {string}     id              Post ID
*/
const skillsFetchObject = (id) =>
  id ? {
    token: seshToken,
    id: id,
    skill: inputSkillsSkill.value,
    icon: inputSkillsIcon.value,
  } : {
      token: seshToken,
      skill: inputSkillsSkill.value,
      icon: inputSkillsIcon.value,
    };


/* Get Post and Auto Fill Input Fields
  * @param   {string}     id              Post ID
  * @param   {string}     url             API-url
*/
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
      <form id="edit-form">
        <div>
          <label for="skill">Skill</label>
          <input type="text" name="skill" id="skill" placeholder="Skill" required>
        </div>
        <div>
          <label for="icon">Icon</label>
          <input type="text" name="icon" id="icon" placeholder="Icon" required>
        </div>
        <div class="form_buttons">
          <input type="submit" value="Submit" id="submit" class="btn" 
        onclick="updateOrAdd(event, updateId, skillsUrl, skillsFetchObject, createSkills)"> 
          <input type="submit" value="Cancel" id="submit" class="btn" onclick="cancelForm(event)">
        </div>
        </form>
  `