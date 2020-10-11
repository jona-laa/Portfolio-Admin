/********** GET **********/
/* Gets data and creates appropriate element
  * @param        {string}        url                 API-url
  * @param        {function}      createElement       createBio/Skills/Work/Studies/Portfolio
*/
const fetchAndCreate = (url, createElement) => {
    fetch(url)
        .then(res => res.json())
        .then(data => createElement(data))
        .catch(e => console.error(e))
};



/* "Routes" functionality of Send button
* @param   {object}     e       Event object
* @param   {number}     [id]    ID of course to update(updateId)
*/
const updateOrAdd = (e, id, url) => {
    e.preventDefault()
    id ? updatePost(id, url) : addPost(url);
}



/********** GET **********/
const addPost = (url) => {
    console.log(`POST req to ${url}`);
    console.log(inputHeading.value, inputImage.value, inputBio.value)

    fetch(url,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    heading: inputHeading.value,
                    img_src: inputImage.value,
                    bio: inputBio.value
                }
            ),
        }
    )
        .then(res => res.json())
        // .then(feedback => userFeedback(feedback, '.feedback'))
        .then(data => resetForm())
        .then(data => fetchAndCreate(aboutUrl, createBio))
        .catch(e => console.error(e))
}



/********** UPDATE **********/
const initUpdate = (id) => {
    updateId = id;
    console.log('init update', id, updateId)
    // 2. Fetch data
    // 3. Fill input fields
}



const updatePost = (id, url) => {
    // Fetch
    console.log(`PUT req on id ${id} to ${url}`);
}



/********** DELETE **********/
const deletePost = (id, url) => {
    // console.log('delete post', url, id);
    confirmIt('delete course') ? fetch(`${url}?id=${id}`,
        {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
        .then(res => res.json())
        // .then(feedback => userFeedback(feedback, '.feedback'))
        .then(data => resetForm())
        .then(data => fetchAndCreate(aboutUrl, createBio))
        .catch(e => console.error(e)) : null;
}