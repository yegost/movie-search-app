import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
import useMovieSearch from "../hooks/useMovieSearch";
import { useSearchParams } from "react-router-dom";

function SearchResults() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('query')
    const { movies, loading, error } = useMovieSearch(query)

    if (error) return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <p className="text-red-500 text-sm tracking-widest">Something went wrong!</p>
        </div>
    )

    return(
        <>
            <div className="min-h-screen bg-zinc-950 flex flex-col">
                <NavBar />
                <section className="relative bg-zinc-950 px-6 md:px-16 py-12 pb-0">
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-800/40 to-transparent " />
                    <div className="max-w-5xl mx-auto">
                        <span className="text-xs tracking-widest bg-gray-700 text-red-400 px-3 py-2 rounded-full">SEARCH RESULTS</span>
                        <h1 className="tracking-wide font-black text-white mt-4 mb-3">Results for <span className="italic tracking-normal text-red-500 capitalize">”{query}”</span></h1>
                        <p className="text-zinc-500 text-xs tracking-widest border-b border-zinc-800 pb-12"><span className="tracking-widest">{movies.length} </span> MATCHES FOUND</p>
                    </div>
                </section>
                <section className="flex-1 max-w-6xl mx-auto px-6 md:px-16 py-10 w-full">
                    {loading && <p className="text-zinc-500 text-sm tracking-widest animate-pulse">Loading...</p>}
                    {!loading && movies.length === 0 && query && (
                        <p className="text-zinc-500 text-sm tracking-widest">No results for "{query}"</p>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}

export default SearchResults