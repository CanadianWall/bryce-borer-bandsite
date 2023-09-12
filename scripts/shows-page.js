// API Server
let baseUrl = "https://project-1-api.herokuapp.com";

// let api_key = '?api_key=6943b8bd-d12b-46e7-8f57-c03dd24e34b5';
let api_key = '?api_key=6943b8bd-d12b-46e7-8f57-c03dd24e34b5';

let showsEndpoint = "/showdates";

const getShows = () => {
    const myShowsEl = document.querySelector("#showsId");
    myShowsEl.innerHTML = "";
    axios.get(`${baseUrl}${showsEndpoint}${api_key}`) //this give me back a promise
        .then((result) => {
            console.log(result.data);
            result.data.forEach((showTicket) => {
                //initialize a card
                const cardEl = document.createElement('article');
                cardEl.classList.add('show');
                // cardEl.setAttribute('id', i);

                const dateGroup = document.createElement('div');
                dateGroup.classList.add('show__groups');

                const dateHeading = document.createElement('h4'); // is a node
                dateHeading.innerHTML = 'DATE';
                dateHeading.classList.add('shows--heading');

                const dateEl = document.createElement('h4');
                dateEl.textContent = formatDate(showTicket.date);
                dateEl.classList.add('demi');
                dateEl.classList.add('shows__item');

                const venueGroup = document.createElement('div');
                venueGroup.classList.add('show__groups');

                const venueHeading = document.createElement('h4'); // is a node
                venueHeading.innerHTML = 'VENUE';
                venueHeading.classList.add('shows--heading');

                const venueEl = document.createElement('h4');
                venueEl.textContent = showTicket.place;
                venueEl.classList.add('shows__item');

                const locationGroup = document.createElement('div');
                locationGroup.classList.add('show__groups');

                const locationHeading = document.createElement('h4'); // is a node
                locationHeading.textContent = 'LOCATION';
                locationHeading.classList.add('shows--heading');

                const locationEl = document.createElement('h4');
                locationEl.textContent = showTicket.location;
                locationEl.classList.add('shows__item');

                // buttonId = i + 10;
                const buttonEl = document.createElement('button');
                buttonEl.innerText = 'BUY TICKETS';
                buttonEl.classList.add('button--shows');
                // buttonEl.setAttribute('id', buttonId);

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
                myShowsEl.appendChild(cardEl);
            })
        })
        .catch((error) => console.log(error));
}

// function displayShow() {
//     const myShowsEl = document.querySelector("#showsId");

//     // Clear the comments div first
//     myShowsEl.innerHTML = "";

//     // Outputs comments, chronologically
//     for (let i = shows.length - 1; i >= 0; i--) {
//         const card = createShowCard(shows[i], i);
//         myShowsEl.appendChild(card);
//     }

// }


// this reverts the color to white on all rows, except darkens the "selected" row
// function selectedShow(activeShow){
//     console.log("active " + activeShow)
    
//     //this statement converts the button id to the article (background) id
//     if (activeShow >=10){
//         activeShow -=10;
//         }

//      for(i = 0; i<=5; i++){
//     document.getElementById(i).style.backgroundColor = "#FFFFFF";
//      }
//     document.getElementById(activeShow).style.backgroundColor = "#E1E1E1";
// }

//Converts the new date object to a string and removes the time
function formatDate(date){
    const stringDate = new Date(date).toString();
    const formattedDate = stringDate.slice(0, 15);   
    return formattedDate;
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
    




// Shows will be rerendered when the screen size changes
window.addEventListener("resize", function (event) {
    location.reload();
})

//this listens for mouse clicks on the "selected" row on the show table
// for (i = 0; i<=5; i++){ 
//     document.getElementById(i).addEventListener('click', function(event){
//             selectedShow(event.target.id);
//     })
//     document.getElementById(i+10).addEventListener('click', function(event){
//             selectedShow(event.target.id);
//     })
// }

// displayShow();
getShows();