// let currentDate = new Array();
// let actualDate = new Array();
// let dateCount = 0;
// "api_key": "6943b8bd-d12b-46e7-8f57-c03dd24e34b5"

// const comments = document.querySelector("#posted--comment");

let requestOptions = {
    method: 'GET',
    header: {
        'Content-Type': 'application/json',
    },
}

// https://project-1-api.herokuapp.com?api_key=6943b8bd-d12b-46e7-8f57-c03dd24e34b5
//Necessary 
// API Server
let baseUrl = "https://project-1-api.herokuapp.com";

// Two ways to break down the api_key
let api_key = '?api_key=6943b8bd-d12b-46e7-8f57-c03dd24e34b5';
// let second_api_key = '53b1fc9f-eae8-4052-8b37-599e09015560';

//Optional
let commentsEndpoint = "/comments";
let showsEndpoint = "/showdates";

// const form = document.getElementById('post-user-form')

const getUsers = () => {
    axios.get(`${baseUrl}${commentsEndpoint}${api_key}`) //this give me back a promise
        .then((result) => {
            result.data.forEach((user) => {
                console.log(user);
                const wrapperEl = document.createElement('div');
                wrapperEl.classList.add('comments--wrapper');

                const avatarEl = document.createElement('img');
                avatarEl.src = "./assets/images/Mohan-muruge.jpg";
                avatarEl.classList.add('avatar__posted');
                wrapperEl.appendChild(avatarEl);

                // This is for all the text in the comment card
                const cardEl = document.createElement('div');
                cardEl.classList.add('comment-card');

                // Makes the name and date have a space between them, and placed above the comment text
                const cardTopEl = document.createElement('div');
                cardTopEl.classList.add('comment-card__top');

                const nameEl = document.createElement('h3');
                nameEl.textContent = user.name;

                const commentEl = document.createElement('h4');
                commentEl.textContent = user.comment;
                commentEl.classList.add('comment-card--posted')


                const likesEl = document.createElement('p');
                likesEl.textContent = user.likes;
                likesEl.classList.add('comment-card__likes');

                const dateEl = document.createElement('h4');
                dateEl.textContent = timeSince(user.timestamp);
                dateEl.classList.add('comment-card__top');

                const dividerEl = document.createElement('div');
                dividerEl.classList.add('card-divider');


                wrapperEl.appendChild(nameEl);
                wrapperEl.appendChild(dateEl);
                cardEl.appendChild(cardTopEl);
                wrapperEl.appendChild(commentEl);
                wrapperEl.appendChild(likesEl);
                cardEl.appendChild(dividerEl);
                
                document.body.appendChild(wrapperEl);
            })
        })
        .catch((error) => console.log(error));
}

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

getUsers()