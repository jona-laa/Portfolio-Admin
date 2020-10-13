/********** GET **********/

// const { create } = require('browser-sync');

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
  * @param   {object}     e               Event object
  * @param   {number}     id              ID of post to update(updateId)
  * @param   {string}     url             API-url
  * @param   {object}     fetchData       Data object to be sent to API endpoint
  * @param   {function}   createElements  Creates post elements, e.g. createPortfolio
*/
const updateOrAdd = (e, id, url, fetchData, createElements) => {
    e.preventDefault()
    id ? updatePost(id, url, fetchData, createElements) : addPost(url, fetchData, createElements);
}



/********** POST **********/

/* Sends POST req, with data object to chosen endpoint
  * @param   {string}     url             API-url
  * @param   {object}     fetchData       Data object to be sent to API endpoint
  * @param   {function}   createElements  Creates post elements, e.g. createPortfolio
*/
const addPost = (url, fetchData, createElements) => {
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
        .then(json => userFeedback(json, '.feedback', '#feedback-message'))
        .then(data => resetForm())
        .then(data => fetchAndCreate(url, createElements))
        .catch(e => console.error(e))
}



/********** PUT **********/

/* Sends PUT req, with data object to chosen endpoint
  * @param   {number}     id              ID of post to update(updateId)
  * @param   {string}     url             API-url
  * @param   {object}     fetchData       Data object to be sent to API endpoint
  * @param   {function}   createElements  Creates post elements, e.g. createPortfolio
*/
const updatePost = (id, url, fetchData, createElements) => {
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
        .then(json => userFeedback(json, '.feedback', '#feedback-message'))
        .then(data => resetForm())
        .then(data => fetchAndCreate(url, createElements))
        .catch(e => console.error(e))
}



/********** DELETE **********/

/* Sends DELETE req to chosen endpoint, and reloads DOM with new data
  * @param   {number}     id              ID of post to update(updateId)
  * @param   {string}     url             API-url
  * @param   {function}   createElements  Creates post elements, e.g. createPortfolio
*/
const deletePost = (id, url, createElements) => {
    confirmIt('delete post') ? fetch(url,
        {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    token: seshToken,
                    id: id
                }
            ),
        }
    )
        .then(res => res.json())
        .then(json => userFeedback(json, '.feedback', '#feedback-message'))
        .then(data => resetForm())
        .then(data => fetchAndCreate(url, createElements))
        .catch(e => console.error(e)) : null;
}
