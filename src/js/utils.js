const resetDOM = (cancelPress) => {
    // updateId = null;
    // credits = 0;
    // codeInput.value = '';
    // nameInput.value = '';
    // progressionInput.value = '';
    // linkInput.value = '';
    // creditsInput.value = '';
    // iconInput.value = '';
    cancelPress ? null : editItemsContainer.innerHTML = '';
    // cancelPress ? null : getCourses(coursesUrl);
}