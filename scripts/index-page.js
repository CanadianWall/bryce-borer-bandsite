// https://project-1-api.herokuapp.com?api_key=6943b8bd-d12b-46e7-8f57-c03dd24e34b5

// API Server
let baseUrl = "https://project-1-api.herokuapp.com";
let api_key = '?api_key=6943b8bd-d12b-46e7-8f57-c03dd24e34b5';
let commentsEndpoint = "/comments";

const getComments = () => {
    const myCommentsEl = document.querySelector("#posted--comment");
                myCommentsEl.innerHTML = "";
    axios.get(`${baseUrl}${commentsEndpoint}${api_key}`) //this give me back a promise
        .then((result) => {
            let objectIndex = 0; // for sorting comments
            result.data.forEach((user) => {
                const wrapperEl = document.createElement('div');
                wrapperEl.classList.add('comments--wrapper');

                const avatarEl = document.createElement('img');
                avatarEl.classList.add('avatar__posted');
                wrapperEl.appendChild(avatarEl);

                // This is for all the text in the comment card
                const cardEl = document.createElement('div');
                cardEl.classList.add('comment-card');

                // Makes the name and date have a space between them, and placed above the comment text
                const cardTopEl = document.createElement('div');
                cardTopEl.classList.add('comment-card__top');

                const cardBottomEl = document.createElement('div');
                cardBottomEl.classList.add('comment-card__bottom');

                const nameEl = document.createElement('h3');
                nameEl.textContent = user.name;

                const commentEl = document.createElement('h4');
                commentEl.textContent = user.comment;
                commentEl.classList.add('comment-card--posted')

                const likesEl = document.createElement('p');
                likesEl.textContent = user.likes;
                likesEl.classList.add('comment-card__likes');

                const likeButtonEl = document.createElement('img');
                likeButtonEl.src = "./assets/icons/SVG/Icon-like.svg";
                likeButtonEl.classList.add('like__button');

                const deleteEl = document.createElement('img');
                deleteEl.src = "./assets/icons/SVG/Icon-delete.svg";
                deleteEl.classList.add('comment-card__delete-button');


                const dateEl = document.createElement('h4');
                dateEl.textContent = timeSince(user.timestamp);
                dateEl.classList.add('comment-card__top');

                const dividerEl = document.createElement('div');
                dividerEl.classList.add('card-divider');

                cardTopEl.appendChild(nameEl);
                cardTopEl.appendChild(dateEl);
                
                cardEl.appendChild(cardTopEl);
                cardEl.appendChild(commentEl);

                cardBottomEl.appendChild(likesEl);
                cardBottomEl.appendChild(likeButtonEl)
                cardBottomEl.appendChild(deleteEl)

                cardEl.appendChild(cardBottomEl);
                cardEl.appendChild(dividerEl);
                wrapperEl.appendChild(cardEl);

                // This sorts the comments chronologically.
                if(objectIndex > 0 && result.data[objectIndex].timestamp > result.data[objectIndex-1].timestamp){
                    myCommentsEl.prepend(wrapperEl);
                }else{
                    myCommentsEl.appendChild(wrapperEl);
                }
                objectIndex++;              
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
    if (interval < 0.05) {
        return "Just now";
    }
    return Math.floor(seconds) + " seconds ago";
}

function handlePostSubmit(event) {
    event.preventDefault();

    let name = event.target.name.value
    let comment = event.target.comments.value

    //Form Validattion
    if (name === '') {
        document.querySelector('input').classList.add('comment-error');
    }else{
        document.querySelector('input').classList.remove('comment-error');
    }
    if (comment === '') {
        document.querySelector('textarea').classList.add('comment-error');
    }else{
        document.querySelector('textarea').classList.remove('comment-error');
    }

    //exits if either text box's are empty (after making one or both have a red border)
    if (comment === '' || name === '') {
        return;
    }

    const newComment = {
        name,
        comment
    }
    
    //posts the new comment
    axios.post(`${baseUrl}${commentsEndpoint}${api_key}`, newComment)
    .catch((error) => console.log(error))

    // Verifies POST is complete, then runs getComments()
    let postCheck = axios.get(`${baseUrl}${commentsEndpoint}${api_key}`)
    .then((response) => this.data = response.data)
    postCheck.then(() => {getComments();})

    //clears the textboxes
    event.target.name.value = '';
    event.target.comments.value = '';
}


getComments()
const myForm = document.getElementById('comment-section');
myForm.addEventListener("submit", handlePostSubmit);

