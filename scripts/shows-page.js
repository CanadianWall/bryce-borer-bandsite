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

function createShowCard(show) {
    //initialize a card
    const cardEl = document.createElement('div');    
    cardEl.classList.add('show');

    const dateHeading = document.createElement('h3'); // is a node
    dateHeading.innerHTML = 'DATE';
    dateHeading.classList.add('shows--heading');

    const dateEl = document.createElement('h3');
    dateEl.innerText = show.date;
    dateEl.classList.add('bold');
    dateEl.classList.add('shows__item');

    const venueHeading = document.createElement('h3'); // is a node
    venueHeading.innerHTML = 'VENUE';
    venueHeading.classList.add('shows--heading');

    const venueEl = document.createElement('h3');
    venueEl.innerText = show.venue;
    venueEl.classList.add('shows__item');

    const locationHeading = document.createElement('h3'); // is a node
    locationHeading.innerHTML = 'LOCATION';
    locationHeading.classList.add('shows--heading');

    const locationEl = document.createElement('h3');
    locationEl.innerText = show.location;
    locationEl.classList.add('shows__item');

    const buttonEl = document.createElement('button');
    buttonEl.innerText = 'BUY TICKETS';
    buttonEl.classList.add('button--shows');

    const dividerEl = document.createElement('div');
    dividerEl.classList.add('card-divider');

    cardEl.appendChild(dateHeading);
    cardEl.appendChild(dateEl);
    cardEl.appendChild(venueHeading);
    cardEl.appendChild(venueEl);
    cardEl.appendChild(locationHeading);
    cardEl.appendChild(locationEl);
    cardEl.appendChild(buttonEl);
    cardEl.appendChild(dividerEl);

    return cardEl;
}

function displayShow() {
    const myShowsEl = document.querySelector("#shows--posted");

    // Clear the comments div first
    myShowsEl.innerHTML = "";

    // Outputs comments, chronologically
    for (let i = shows.length - 1; i >= 0; i--) {
        const card = createShowCard(shows[i]);
        myShowsEl.appendChild(card);
    }

}


displayShow();