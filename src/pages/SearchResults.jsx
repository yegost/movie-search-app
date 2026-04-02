import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
import useMovieSearch from "../hooks/useMovieSearch";
import { useSearchParams } from "react-router-dom";

function SearchResults() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('query')
    const { movies, loading, error } = useMovieSearch(query)

    return(
        <>
            <NavBar />
            <section className="search-results-section">
                <div><p>search results</p></div>
                <h1>Results for "<span>{query}</span>"</h1>
                <p><span>{movies.length} </span> matches found</p>
            </section>
            <section className="search-movies-section">
                {loading && <p>Loading...</p>}
                {!loading && movies.length === 0 && query && <p>No results for "{query}"</p>}
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default SearchResults