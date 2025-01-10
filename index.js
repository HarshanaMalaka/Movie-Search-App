function search() {
    const movieSearch = document.getElementById('movie');
    const movieName = movieSearch.value;
    const movieDetails = document.getElementById('movieDetails');
    
    if (!movieName) {
        showToast('Please enter a movie name');
        return;
    }
    
    // Add loading state
    document.querySelector('.search-button').classList.add('loading');
    
    const request = new XMLHttpRequest();
    const url = `http://www.omdbapi.com/?apikey=7ac2a447&t=${encodeURIComponent(movieName)}`;
    
    request.open('GET', url);
    request.responseType = "json";
    request.send();
    
    request.onload = function() {
        // Remove loading state
        document.querySelector('.search-button').classList.remove('loading');
        
        const response = request.response;
        
        if (response.Response === "False") {
            showToast('Movie not found!');
            movieDetails.classList.add('hidden');
            return;
        }
        
        // Show the movie details with animation
        movieDetails.classList.remove('hidden');
        
        // Update all elements with movie data
        updateMovieDetails(response);
    };
    
    request.onerror = function() {
        document.querySelector('.search-button').classList.remove('loading');
        showToast('Error fetching movie data');
        movieDetails.classList.add('hidden');
    };
}

function updateMovieDetails(data) {
    const elements = {
        "poster": data.Poster,
        "title": data.Title,
        "rating-badge": data.imdbRating,
        "year": data.Year,
        "released": data.Released,
        "runtime": data.Runtime,
        "imdb": data.imdbRating,
        "votes": data.imdbVotes,
        "metascore": data.Metascore,
        "director": data.Director,
        "writers": data.Writer,
        "actors": data.Actors,
        "genre": data.Genre,
        "language": data.Language,
        "country": data.Country,
        "plot": data.Plot
    };

    for (const [id, value] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            if (id === "poster") {
                element.src = value;
            } else {
                element.textContent = value || 'N/A';
            }
        }
    }
}

function showToast(message) {
    // Create and show toast notification
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Add enter key support
document.getElementById('movie').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        search();
    }
});