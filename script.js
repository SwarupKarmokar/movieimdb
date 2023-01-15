// IMPORTING ALL ELEMENT FROM HTML USING DOM 
const movieSearchBox = document.querySelector('#movie-search-box');
const searchList = document.querySelector('#search-list');
const resultGrid = document.querySelector('#result-grid');

// SETTING UP LOCAL STORAGE 
if (!localStorage.getItem('favMovies')) {
    let favMovies = [];
    localStorage.setItem('favMovies', JSON.stringify(favMovies));
}
// LOADING OMDB API
async function loadMovies(searchTerm) {
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=e957ce28`;
    const res = await fetch(`${URL}`);
    const data = await res.json();

    if (data.Response == "True") {
        displayMovies(data.Search);
    }
}

// ADDING SEARCH FUNTIONALITY LIKE GOOGLE
const findMovies = () => {
    let searchTerm = (movieSearchBox.value).trim();

    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

// SHOWING MOVIE RESULT BASED ON TYPED WORD
const displayMovies = (movies) => {
    searchList.innerHTML = "";

    for (let id = 0; id < movies.length; id++) {
        // CREATING DYNAMIC HTML PAGE USING DOM 
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[id].imdbID;
        movieListItem.classList.add('search-list-item');

        if (movies[id].Poster != "N/A") {
            moviePoster = movies[id].Poster;


            movieListItem.innerHTML = `<div class="search-item-thumbnail"> 
        <img src="${moviePoster}" alt="movie">
    </div>
    <div class="search-item-info">
        <h3>${movies[id].Title}</h3>
        <p>${movies[id].Year}</p>
    </div>`;

            searchList.appendChild(movieListItem);
        }
        loadMovieDetails();
    }
}

    // LOADING THE MOVIE DETAILS
    const loadMovieDetails = () => {
        const searchListMovies = searchList.querySelectorAll('.search-list-item');

        searchListMovies.forEach(movie => {
            movie.addEventListener('click', async () => {
                searchList.classList.add('hide-search-list');
                movieSearchBox.value = "";
                localStorage.setItem('movieID', movie.dataset.id);
                let dir = window.location.origin + "moviePage.html";
                window.location.href = "moviePage.html";
                // let dir = window.location.origin + "/1234/MoviePage/moviePage.html";
                // window.location.href = "https://swarupkarmokar.github.io/1234/MoviePage/moviePage.html";
            })
        })
    }


    // CREATING EVENT LISTENER 
    window.addEventListener('click', (e) => {
        if (e.target.className != 'form-control') {
            searchList.classList.add('hide-search-list');
        }
    })

    // WHEN PERSON TYPE WORD ITS AUTOMATICALLY SEARCH MOVIE BY EACH WORD 
    movieSearchBox.addEventListener('keyup', findMovies);
    movieSearchBox.addEventListener('click', findMovies);