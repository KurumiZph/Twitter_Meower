console.log("Client.js Started")

// just grabbing an elemetn on the page
const form = document.querySelector('form');
const LoadingElement = document.querySelector('.loading');

const API_URL = 'http://localhost:5000/tweews';

LoadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name');
    const stuff = formData.get('stuff');

    const tweew = {
        name, stuff
    };

    // console.log('Form was submitted');
    // console.log(tweew);

    form.style.display = 'none';
    LoadingElement.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(tweew), //the object just made above
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(createdTweew => {
            console.log(createdTweew);
            form.style.display = '';
            LoadingElement.style.display = 'none';
        });
});