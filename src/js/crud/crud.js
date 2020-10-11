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
                    bio: inputBio.value,
                    published: inputPublished.checked ? true : false
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
const initUpdate = (id, url) => {
    // 1. Update updateId
    updateId = id;
    console.log('init update on id:', updateId);
    console.log('to url:', url)
    // 2. Fetch data
    fetch(`${url}?id=${id}`)
        .then(res => res.json())
        .then(data => {
            const { id, heading, bio, img_src, published } = data.bios[0];

            // 3. Fill input fields
            inputHeading.value = heading;
            inputBio.value = bio;
            inputImage.value = img_src;
            inputPublished.checked = published == 1 ? true : false;

            window.scrollTo(0, document.body.scrollHeight);
        })
}



const updatePost = (id, url) => {
    // Fetch
    console.log(`PUT req on id ${id} to ${url}`);

    fetch(url,
        {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id: id,
                    heading: inputHeading.value,
                    bio: inputBio.value,
                    img_src: inputImage.value,
                    published: inputPublished.checked ? true : false
                }
            ),
        }
    )
        .then(res => res.json())
        // .then(json => userFeedback(json, '#feedback'))
        .then(data => resetForm())
        .then(data => fetchAndCreate(aboutUrl, createBio))
        .catch(e => console.error(e))
}



/********** DELETE **********/
const deletePost = (id, url) => {
    confirmIt('delete post') ? fetch(`${url}?id=${id}`,
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