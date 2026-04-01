function MovieCard({ movie }) {
    return(
        <>
            <div className="movie-card">
                <h3>{movie.title}</h3>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <p>{movie.vote_average !== 0 ? "Rating: " + movie.vote_average.toFixed(1) : ''}</p>
                <p>{movie.release_date.slice(0,4)}</p>
            </div>
        </>
    )
}

export default MovieCard