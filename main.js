const form = document.querySelector('form');
const searchInput = document.querySelector('input');
const movieList = document.querySelector('#movie-list');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchQuery = searchInput.value;

    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=430a1ecb&s=${searchQuery}`);
        const data = await res.json();

        if (data.Search) {
            movieList.innerHTML = '';
            data.Search.forEach((movie) => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                const moviePoster = movie.Poster === 'N/A' ? 'https://via.placeholder.com/130x200.png?text=No+Poster+Available' : movie.Poster;
                movieDiv.innerHTML = `
            <img src="${moviePoster}" alt="Movie Poster" />
            <div class="movie-info">
                <h3 class="movie-title">${movie.Title}</h3>
                <span class="movie-year">Release Year: ${movie.Year}</span>
                <span class="movie-type">Type: ${movie.Type}</span>
            </div>
        `;
                movieList.appendChild(movieDiv);
            }); 
        } else {
            movieList.innerHTML = '<p>No results found</p>';
        }
    } catch (err) {
        console.error(err);
    }
});
