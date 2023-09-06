let btnId;

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

