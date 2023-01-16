// IMPORTING ALL NECCESSERY ELEMENT FROM HTML USING DOM 
let movieID = localStorage.getItem('movieID');
const addToFavBtn = document.querySelector('#addToFav');

let favMovies = JSON.parse(localStorage.getItem('favMovies'));
const resultGrid = document.querySelector('#result-grid');


//CREATING A FUNCTION WHICH SHOWING MOVIE DETAILS IN THE PAGE
const displayMovies = (details) => {
    //CREATING DYNAMIC HTML FOR MOVIE PAGE USING DOM
    resultGrid.innerHTML = `<div class="movie-poster">
    <img src="${details.Poster}" alt="movie-poster">
</div>
<div class="movie-info">
    <h3 class="movie-title">${details.Title}</h3>
    <ul class="movie-misc-info">
        <li class="year">Year: ${details.Year}</li>
        <li class="rated">Ratings: ${details.Rated}</li>
        <li class="released">Released: ${details.Released}</li>
    </ul>
    <p class="genre"><b>Genre: </b>${details.Genre}</p>
    <p class="writer"><b>Writer: </b> ${details.Writer}</p>
    <p class="actors"><b>Actors: </b> ${details.Actors}</p>
    <p class="plot"><b>Plot: </b> ${details.Plot}</p>
    <p class="language"><b>Language: </b> ${details.Language}</p>
    <p class="awards"><b>Awards: <i class="fa-solid fa-award"></i></b> ${details.Awards}</p>
</div>`;

}

// THIS FUCTION GETS ALL THE DATA FROM SERVER 
async function getData(movieID) {
    const result = await fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=e957ce28`);
    const movieDetails = await result.json();
    displayMovies(movieDetails);
}

//THIS BUTTON IS CREATED FOR SHOWING IS THE MOVIE ADDED IN FAVORITE PAGE OR NOT 
if (movieID) {
    if (favMovies.includes(movieID)) {
        addToFavBtn.textContent = 'Already Added To Favourites';
    }
}



//CREATING FAVORITE BUTTON WHICH STORED MOVIE DATA IN LOCAL STORAGE 
const addToFav = () => {
    addToFavBtn.textContent = 'Added To Favourites';
    //CHECK IF THE MOVIE ADDED OR NOT
    if (favMovies.includes(movieID)) {
        addToFavBtn.textContent = 'Already Added To Favourites';
    } else {
        favMovies.push(movieID);
        localStorage.setItem('favMovies', JSON.stringify(favMovies));
    }

}


//ITS FETCHING LOCAL STORAGE DATA IF THE SERVER RELOAD
if (movieID) {
    getData(movieID);
}

//ADDING CLICK FUNCTION TO THE BUTTON
addToFavBtn.addEventListener('click', addToFav);