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
    const filterClass = filter.split(' ').join('-')
}

function capitalizeFirstLetter(phrase){
    const arr = phrase.split(' ')
    const capitalizedFirstLetterArray = arr.map((word) => {
        return word[0].toUpperCase() + word.slice(1)
    })
    const newPhrase = capitalizedFirstLetterArray.join(' ')
    return newPhrase

}


// FUNCTION TO CONVERT LINKS IN STING TO JSX
  function convertLinksToAnchors(text) {
    const urlRegex = /\b(https?:\/\/[^\s]+[^\s.,)]*)\b|\[([^\]]*)\]/g;

    // Split text into parts and create an array of React components
    const parts = text.split(urlRegex).map((part, index) => {
      if (index % 3 === 1) {
        // If it's a URL, return an anchor component
        return (
          <a key={index} href={part} target="_blank">
            {part}
          </a>
        );
      } else if (index % 3 === 2) {
        // If it's content inside brackets, skip it
        return null;
      } else {
        // Otherwise, return the text as is
        return <span key={index}>{part}</span>;
      }
    }).filter(part => part !== null); // Remove null elements

    return <div>{parts}</div>;
  }


export { saveToLocalStorageCart, getDataFromLocalStorage, getFilterClass, capitalizeFirstLetter, convertLinksToAnchors }