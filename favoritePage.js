// IMPORTING ELEMENT USING DOM 
const resultContainer = document.querySelector('.result-container');

// PARSING DATA FROM LOCAL STORAGE
let favMovies = JSON.parse(localStorage.getItem('favMovies'));

// GETTING MOVIE DETAILS FROM API
async function getData(movieID) {
    const result = await fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=e957ce28`);
    const movieDetails = await result.json();
    AddMovie(movieDetails);
}

// FETCHING ALL FAVORITE MOVIES
favMovies.forEach(id => {
    getData(id);
});

// CREATING DYNAMIC PAGE USING DOM     
const AddMovie = (details) => {

    const child = document.createElement('div');
    child.setAttribute('id', details.imdbID);
    child.setAttribute('class', 'result-grid');
    child.innerHTML = `<div class="movie-poster">
        <img src="${details.Poster}" alt="movie-poster">
    </div>
    
    <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <p class="plot"><b>Plot: </b> ${details.Plot}</p>
    </div> 
    `;

    const btn = document.createElement('button');
    btn.setAttribute('class', 'delete-btn');
    btn.innerHTML = `<i data-id="${details.imdbID}" class="fa-solid fa-trash">`;
    btn.addEventListener('click', deleteMovie);
    child.appendChild(btn);
    resultContainer.appendChild(child);

}

// DELETING MOVIE FROM LOCAL STORAGE
const deleteMovie = (e) => {
    //Get the id of the movie
    const delID = e.target.dataset.id;
    //Get the specific movie 
    const movie = document.getElementById(`${delID}`);
    //Delete movie from view
    movie.remove();
    //Delete the movie from list
    favMovies = favMovies.filter(id => id != delID);
    //remove from localstorage
    localStorage.setItem('favMovies', JSON.stringify(favMovies));
}