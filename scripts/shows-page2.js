// API Server
let baseUrl = "https://project-1-api.herokuapp.com";

// let api_key = '?api_key=6943b8bd-d12b-46e7-8f57-c03dd24e34b5';
let api_key = '?api_key=6943b8bd-d12b-46e7-8f57-c03dd24e34b5';

let showsEndpoint = "/showdates";
let cardEl = 1;
// cardEl is global

const getShows = () => {
    axios.get("https://project-1-api.herokuapp.com/showdates?api_key=testKey") //this give me back a promise
        .then((result) => {
            cardEl = 2;
            console.log('inside')
            console.log(cardEl)
            result.data.forEach((showTicket) => {
                //initialize a card
                
            })
            
        })
        .then()
        .catch((error) => console.log(error));
}


getShows();
if (cardEl === 2){
    console.log(cardEl)
}

