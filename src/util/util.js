function removeDuplicatesFromArray(array) {
    let uniqueElements = {};
    
    array.forEach((element) => {
        uniqueElements = {
            ...uniqueElements,
            [element]: element
        };
    });
    return Object.values(uniqueElements);
}


function saveToLocalStorageCart(data){
    window.localStorage.setItem('localCart', JSON.stringify(data))
}

function getDataFromLocalStorage(data) {
    return JSON.parse(window.localStorage.getItem(data))
}

function getFilterClass(filter){
    console.log(filter)
    const filterClass = filter.split(' ').join('-')
    console.log(filterClass)
}

function capitalizeFirstLetter(phrase){
    const arr = phrase.split(' ')
    const capitalizedFirstLetterArray = arr.map((word) => {
        return word[0].toUpperCase() + word.slice(1)
    })
    const newPhrase = capitalizedFirstLetterArray.join(' ')
    return newPhrase

}

export { saveToLocalStorageCart, getDataFromLocalStorage, getFilterClass, capitalizeFirstLetter }