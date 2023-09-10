// let currentDate = new Array();
// let actualDate = new Array();
// let dateCount = 0;
// "api_key": "6943b8bd-d12b-46e7-8f57-c03dd24e34b5"

// const commentList = document.querySelector("#posted--comment");
const comments = document.querySelector("#posted--comment");
// const comments = [];
console.log('comments: ');
console.log(comments);

let requestOptions = {
    method: 'GET',
    header: {
        'Content-Type': 'application/json',
    },
}


//Necessary 
// API Server
let baseUrl = "https://project-1-api.herokuapp.com";

// Two ways to break down the api_key
let api_key = '?api_key=6943b8bd-d12b-46e7-8f57-c03dd24e34b5';
// let second_api_key = '53b1fc9f-eae8-4052-8b37-599e09015560';

//Optional
let commentsEndpoint = "/comments";
let showsEndpoint = "/showdates";


// const comments = [
//     {
//         avatar: 1,
//         name: 'Miles Acosta',
//         date: "20/12/2020",
//         commentText: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
//     },
//     {
//         avatar: 1,
//         name: 'Emilie Beach',
//         date: "09/01/2021",
//         commentText: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
//     },
//     {
//         avatar: 1,
//         name: 'Conner Walton',
//         date: "17/02/2021",
//         commentText: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
//     }
// ];

fetch(`${baseUrl}${commentsEndpoint}${api_key}`,requestOptions)
.then((response)=> {
    return response.json()
})
.then((data)=> {
    data.forEach(comment => {
        const nameElement = document.createElement("p");
        nameElement.innerText = comment.name;
        comments.appendChild(nameElement);
    });
    console.log('data: ');
    console.log(data[0]);
    // console.log('comments object: ');
    // console.log(comments);
})
.catch((error) => {
        console.error('Fetch Error:', error);
});
console.log(comments);
//This fetch is for shows
// fetch(`${baseUrl}${showsEndpoint}${api_key}`,requestOptions)
// .then((response)=> {
//     return response.json()
// })
// .then((data)=> {
//     console.log(data)
// })
// .catch((error) => {
//         console.error('Fetch Error:', error);
// });


function createCommentCard(comment) {

    // The wrapper contains each comment card
    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('comments--wrapper');

    // This is for the little avatar on the left

    const avatarEl = document.createElement('img');

    // gives new comments an avatar picture
    if (comment.avatar !== 1) {
        avatarEl.src = "./assets/images/Mohan-muruge.jpg";
    }

    avatarEl.classList.add('avatar__posted');
    wrapperEl.appendChild(avatarEl);

    // This is for all the text in the comment card
    const cardEl = document.createElement('div');
    cardEl.classList.add('comment-card');

    // Makes the name and date have a space between them, and placed above the comment text
    const cardTopEl = document.createElement('div');
    cardTopEl.classList.add('comment-card__top');

    const dateEl = document.createElement('h4')

    // if(typeof(comment.date)==='string'){
    //     dateEl.innerText = comment.date;
    // }else{
    //     actualDate[dateCount]= timeSince(currentDate[dateCount]);
    //     dateEl.innerText = comment.actualDate[dateCount];
    // }
    
    
    if (typeof comment.date === 'undefined') {
        const newDate = new Date();
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        comment.date = `${month}/${day}/${year}`;
    }
    
    dateEl.innerText = comment.date;
    dateEl.classList.add('comment-card__top');

    const nameEl = document.createElement('h3');
    nameEl.innerText = comment.name;
    nameEl.classList.add('comment-card__top');


    const commentEl = document.createElement('h4');
    commentEl.innerText = comment.commentText;
    commentEl.classList.add('comment-card--posted')

    const dividerEl = document.createElement('div');
    dividerEl.classList.add('card-divider');


    cardTopEl.appendChild(nameEl);
    cardTopEl.appendChild(dateEl);
    cardEl.appendChild(cardTopEl);
    cardEl.appendChild(commentEl);
    cardEl.appendChild(dividerEl);

    wrapperEl.appendChild(cardEl);

    return wrapperEl;
}

function displayComment() {
    const myCommentsEl = document.querySelector("#posted--comment");

    // Clear the comments div first
    myCommentsEl.innerHTML = "";

    // Outputs comments, chronologically
    for (let i = comments.length - 1; i >= 0; i--) {
        const card = createCommentCard(comments[i]);
        myCommentsEl.appendChild(card);
    }
}



function handlePostSubmit(event) {
    event.preventDefault();

    let name = event.target.name.value
    let commentText = event.target.comments.value
    let currentDate;

    //Form Validattion
    if (name === '') {
        document.querySelector('input').style.borderColor = '#D22D2D';
    }else{
        document.querySelector('input').style.borderColor = '#000';
    }
    if (commentText === '') {
        document.querySelector('textarea').style.borderColor = '#D22D2D';
    }else{
        document.querySelector('textarea').style.borderColor = '#000';
    }

    //exits if either text box's are empty (after making one or both have a red border)
    if (commentText === '' || name === '') {
        return;
    }
    // currentDate[dateCount] = timeSince(Date.now());
    // currentDate[dateCount] = new Date(Date.now());
    const newComment = {
        name,
        currentDate,
        commentText
    }
    
    comments.push(newComment)
    displayComment();
    event.target.name.value = '';
    event.target.comments.value = '';
}


const myForm = document.getElementById('comment-section');
myForm.addEventListener("submit", handlePostSubmit);

// function timeSince(date) {
//     var seconds = Math.floor((new Date() - date) / 1000);
//     var interval = seconds / 31536000;
//     if (interval > 1) {
//         return Math.floor(interval) + " years";
//     }
//     interval = seconds / 2592000;
//     if (interval > 1) {
//         return Math.floor(interval) + " months";
//     }
//     interval = seconds / 86400;
//     if (interval > 1) {
//         return Math.floor(interval) + " days";
//     }
//     interval = seconds / 3600;
//     if (interval > 1) {
//         return Math.floor(interval) + " hours ago";
//     }
//     interval = seconds / 60;
//     if (interval > 1) {
//         return Math.floor(interval) + " minutes ago";
//     }
//     return Math.floor(seconds) + " seconds ago";
// }


displayComment();
