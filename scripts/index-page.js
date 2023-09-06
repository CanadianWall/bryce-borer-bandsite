const comments = [
    {
        avatar: '',
        name: 'Miles Acosta',
        date: "20/12/2020",
        commentText: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    },
    {
        avatar: '',
        name: 'Emilie Beach',
        date: "09/01/2021",
        commentText: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        avatar: '',
        name: 'Conner Walton',
        date: "17/02/2021",
        commentText: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    }
];


function createCommentCard(comment) {
    
    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('comments--wrapper');

    const avatarEl = document.createElement('div');
    avatarEl.classList.add('avatar');
    // wrapperEl.appendChild(avatarEl);


    const cardEl = document.createElement('div');
    cardEl.classList.add('comment-card');
    
    const dateEl = document.createElement('h4')

    if (typeof comment.date === 'undefined'){
        const newDate = new Date();
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        comment.date = `${month}/${day}/${year}`;
    }

    console.log(comment.date)
    dateEl.innerText = comment.date;
    dateEl.classList.add('comment-card__top');

    const nameEl = document.createElement('h3');
    nameEl.innerText = comment.name;
    nameEl.classList.add('comment-card__top');

    const commentEl = document.createElement('h4');
    commentEl.innerText = comment.commentText;

    const dividerEl = document.createElement('div');
    dividerEl.classList.add('card-divider');

    cardEl.appendChild(nameEl);
    cardEl.appendChild(dateEl);
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
    for (let i = comments.length-1; i >=0 ; i--) {
        const card = createCommentCard(comments[i]);
        myCommentsEl.appendChild(card);
    }  
}



function handlePostSubmit(event) {
    event.preventDefault();

    let name = event.target.name.value
    let commentText = event.target.comments.value

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${month}/${day}/${year}`;

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
console.log(comments)
displayComment();
