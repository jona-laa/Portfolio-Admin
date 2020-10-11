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
const updateOrAdd = (e, id, url, fetchData) => {
    e.preventDefault()
    id ? updatePost(id, url, fetchData) : addPost(url, fetchData);
}



/********** GET **********/
const addPost = (url, fetchData) => {
    fetch(url,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                fetchData()
            ),
        }
    )
        .then(res => res.json())
        // .then(feedback => userFeedback(feedback, '.feedback'))
        .then(data => resetForm())
        .then(data => fetchAndCreate(aboutUrl, createBio))
        .catch(e => console.error(e))
}



// updateId, url, fetchObject
const updatePost = (id, url, fetchData) => {
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
                fetchData(id)
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