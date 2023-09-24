// API Server
let baseUrl = "https://project-1-api.herokuapp.com";

// let api_key = '?api_key=6943b8bd-d12b-46e7-8f57-c03dd24e34b5';
let api_key = '?api_key=6943b8bd-d12b-46e7-8f57-c03dd24e34b5';

let showsEndpoint = "/showdates";
let cardEl;
let showIndex = 0;

const getShows = () => {
    const myShowsEl = document.querySelector("#showsId");
    myShowsEl.innerHTML = "";
    showIndex = 0;
    axios.get(`${baseUrl}${showsEndpoint}${api_key}`) //this give me back a promise
        .then((result) => {
            result.data.forEach((showTicket) => {

                //initialize a card
                cardEl = document.createElement('article');
                cardEl.classList.add('show');
                cardEl.classList.add('default-show-color');
                cardEl.setAttribute('id', 'card' + showIndex);

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

                const buttonEl = document.createElement('button');
                buttonEl.innerText = 'BUY TICKETS';
                buttonEl.classList.add('button--shows');
                buttonEl.setAttribute('id', 'bttn' + showIndex);

                dateGroup.appendChild(dateHeading);
                venueGroup.appendChild(venueHeading);
                locationGroup.appendChild(locationHeading);


                dateGroup.appendChild(dateEl);
                venueGroup.appendChild(venueEl);
                locationGroup.appendChild(locationEl);

                cardEl.appendChild(dateGroup);
                cardEl.appendChild(venueGroup);
                cardEl.appendChild(locationGroup);
                cardEl.appendChild(buttonEl);
                myShowsEl.appendChild(cardEl);
                showIndex++;

            })

        })
        .then(() => {
            for (i = 0; i <= 5; i++) {
                document.getElementById('card' + i).addEventListener('click', function (event) {
                    selectedShow(event.target.id);
                })
                document.getElementById('bttn' + i).addEventListener('click', function (event) {
                    selectedShow(event.target.id);
                })
            }
        })
        .catch((error) => console.log(error));
}

//Converts the new date object to a string and removes the time
function formatDate(date) {
    const stringDate = new Date(date).toString();
    const formattedDate = stringDate.slice(0, 15);
    return formattedDate;
}

// this reverts the color to white on all rows, except darkens the "selected" row
function selectedShow(activeShow) {
    let idNum = activeShow.split('')

    for (i = 0; i <= 5; i++) {
        document.getElementById('card' + i).classList.remove('active-show-color');
        document.getElementById('card' + i).classList.add('default-show-color');
    }
    document.getElementById('card' + idNum[4]).classList.add('active-show-color');
    document.getElementById('card' + idNum[4]).classList.remove('default-show-color');

}

// Shows will be rerendered when the screen size changes
window.addEventListener("resize", function (event) {
    location.reload();
})

getShows();