
const shows = [
    {
        date: 'Wed Dec 15 2021',
        venue: 'Press Club',
        location: "San Francisco, CA"
    },
    {
        date: 'Fri Nov 26 2021',
        venue: 'Moscow Center',
        location: "San Francisco, CA"
    },
    {
        date: 'Sat Nov 06 2021',
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA'
    },
    {
        date: 'Fri Oct 15 2021',
        venue: 'View Lounge',
        location: 'San Francisco, CA'
    },
    {
        date: 'Tue Sept 21 2021',
        venue: 'Pier 3 East ',
        location: 'San Francisco, CA'
    },
    {
        date: 'Mon Sept 06 2021',
        venue: 'Ronald Lane',
        location: 'San Francisco, CA'
    }
];

function createShowCard(show, i) {
    //initialize a card
    const cardEl = document.createElement('article');
    cardEl.classList.add('show');
    cardEl.setAttribute('id', i);

    const dateGroup = document.createElement('div');
    dateGroup.classList.add('show__groups');

    const dateHeading = document.createElement('h4'); // is a node
    dateHeading.innerHTML = 'DATE';
    dateHeading.classList.add('shows--heading');

    const dateEl = document.createElement('h4');
    dateEl.innerText = show.date;
    dateEl.classList.add('demi');
    dateEl.classList.add('shows__item');

    const venueGroup = document.createElement('div');
    venueGroup.classList.add('show__groups');

    const venueHeading = document.createElement('h4'); // is a node
    venueHeading.innerHTML = 'VENUE';
    venueHeading.classList.add('shows--heading');

    const venueEl = document.createElement('h4');
    venueEl.innerText = show.venue;
    venueEl.classList.add('shows__item');

    const locationGroup = document.createElement('div');
    locationGroup.classList.add('show__groups');

    const locationHeading = document.createElement('h4'); // is a node
    locationHeading.innerHTML = 'LOCATION';
    locationHeading.classList.add('shows--heading');

    const locationEl = document.createElement('h4');
    locationEl.innerText = show.location;
    locationEl.classList.add('shows__item');

    buttonId = i+10;
    const buttonEl = document.createElement('button');
    buttonEl.innerText = 'BUY TICKETS';
    buttonEl.classList.add('button--shows');
    buttonEl.setAttribute('id', buttonId);

    if (screen.width < 768 || ((screen.width >= 768) && i === 5)) {
        dateGroup.appendChild(dateHeading);
        venueGroup.appendChild(venueHeading);
        locationGroup.appendChild(locationHeading);
    }

    dateGroup.appendChild(dateEl);
    venueGroup.appendChild(venueEl);
    locationGroup.appendChild(locationEl);

    cardEl.appendChild(dateGroup);
    cardEl.appendChild(venueGroup);
    cardEl.appendChild(locationGroup);
    cardEl.appendChild(buttonEl);

    return cardEl;
}

function displayShow() {
    const myShowsEl = document.querySelector("#showsId");

    // Clear the comments div first
    myShowsEl.innerHTML = "";

    // Outputs comments, chronologically
    for (let i = shows.length - 1; i >= 0; i--) {
        const card = createShowCard(shows[i], i);
        myShowsEl.appendChild(card);
    }

}

// this reverts the color to white on all rows, except darkens the "selected" row
function selectedShow(activeShow){
    console.log("active " + activeShow)
    
    //this statement converts the button id to the article (background) id
    if (activeShow >=10){
        activeShow -=10;
        }

     for(i = 0; i<=5; i++){
    document.getElementById(i).style.backgroundColor = "#FFFFFF";
     }
    document.getElementById(activeShow).style.backgroundColor = "#E1E1E1";
}
    


displayShow();

// Shows will be rerendered when the screen size changes
window.addEventListener("resize", function (event) {
    location.reload();
})

//this listens for mouse clicks on the "selected" row on the show table
for (i = 0; i<=5; i++){ 
    document.getElementById(i).addEventListener('click', function(event){
            selectedShow(event.target.id);
    })
    document.getElementById(i+10).addEventListener('click', function(event){
            selectedShow(event.target.id);
    })
}

// API Server
let baseUrl = "https://project-1-api.herokuapp.com";

// let api_key = '?api_key=6943b8bd-d12b-46e7-8f57-c03dd24e34b5';
let api_key = '?api_key=6943b8bd-d12b-46e7-8f57-c03dd24e34b5';


let commentsEndpoint = "/comments";
let showsEndpoint = "/showdates";

const getShows = () => {
    const myCommentsEl = document.querySelector("#posted--comment");
                myCommentsEl.innerHTML = "";
    axios.get(`${baseUrl}${showsEndpoint}${api_key}`) //this give me back a promise
        .then((result) => {
            console.log(result.data);
            let objectIndex = 0; // for sorting comments
            result.data.forEach((user) => {
                const wrapperEl = document.createElement('div');
                wrapperEl.classList.add('comments--wrapper');

                const avatarEl = document.createElement('img');
                // avatarEl.src = "./assets/images/Mohan-muruge.jpg";
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
                // dateEl.textContent = new Date(user.timestamp);
                // dateEl.textContent = user.timestamp;
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

                // This sorts the comments chronologically. Only works because objects are already in chronological order
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
    return Math.floor(seconds) + " seconds ago";
}
function handlePostSubmit(event) {
    event.preventDefault();

    let name = event.target.name.value
    let comment = event.target.comments.value

    //Form Validattion
    if (name === '') {
        document.querySelector('input').style.borderColor = '#D22D2D';
    }else{
        document.querySelector('input').style.borderColor = '#000';
    }
    if (comment === '') {
        document.querySelector('textarea').style.borderColor = '#D22D2D';
    }else{
        document.querySelector('textarea').style.borderColor = '#000';
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
    .then((response) => console.log(response))
    .catch((error) => console.log(error))

    // Verifies POST is complete, then runs getShows()
    let postCheck = axios.get(`${baseUrl}${commentsEndpoint}${api_key}`)
    .then((response) => this.data = response.data)
    postCheck.then(() => {getShows();})

    //clears the textboxes
    event.target.name.value = '';
    event.target.comments.value = '';
}


getShows()