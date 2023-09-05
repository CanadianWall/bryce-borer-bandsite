let activeId;

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




    const buttonEl = document.createElement('button');
    buttonEl.innerText = 'BUY TICKETS';
    buttonEl.classList.add('button--shows');

    if (screen.width < 768 || ((screen.width >= 768) && i === 5)) {
        dateGroup.appendChild(dateHeading);
        venueGroup.appendChild(venueHeading);
        locationGroup.appendChild(locationHeading);
        console.log('article' + i);
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
    const myShowsEl = document.querySelector("#shows--posted");

    // Clear the comments div first
    myShowsEl.innerHTML = "";

    // Outputs comments, chronologically
    for (let i = shows.length - 1; i >= 0; i--) {
        const card = createShowCard(shows[i], i);
        myShowsEl.appendChild(card);
    }

}
displayShow();

window.addEventListener("resize", function (event) {
    console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight + ' high');
    displayShow();
})