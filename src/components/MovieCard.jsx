function MovieCard({ movie }) {
    return(
        <>
            <div className="movie-card">
                <h3>{movie.title}</h3>
                <img src={movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                    : "./posterPlaceholder.png"} alt={movie.title} 
                />
                <p>{movie.vote_average !== 0 ? "Rating: " + movie.vote_average.toFixed(1) : ''}</p>
                <p>{movie.release_date ? movie.release_date.slice(0,4) : ''}</p>
            </div>
        </>
    )
}

export default MovieCard