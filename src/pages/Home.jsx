import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import useTrending from "../hooks/useTrending";
import { useNavigate } from "react-router-dom";
import { useState } from "react"

function Home() {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = () => {
        if (query) navigate(`/search?query=${query}`)
    }

    const { movies, loading, error } = useTrending()

    return(
        <>
            <div className="min-h-screen bg-zinc-950 flex flex-col">
                <NavBar />
                <section
                    className="relative flex flex-col items-center justify-center py-16 overflow-hidden bg-zinc-950 "
                    >
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-800/40 to-transparent" />

                    <div className="relative z-10 flex flex-col items-center text-center px-8 w-full max-w-2xl">
                        <p className="text-yellow-400 text-xs tracking-widest mb-4">DISCOVER CINEMA</p>
                        <h1 className="text-6xl font-bold text-white mb-8 leading-tight">What's on your mind?</h1>
                        <SearchBar 
                            onSearch={setQuery}
                            onKeyDown={handleSearch}
                            className="w-full px-6 py-3 bg-zinc-900 text-white rounded-lg border-2 border-zinc-700 focus:outline-none focus:border-red-900 focus:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-300 placeholder:text-zinc-500"
                            placeholder="Search for a movie..."
                        />
                    </div>
                </section>
                <section className="flex-1 w-full max-w-5xl mx-auto w-full px-8 py-4 text-white">
                    <div className="flex flex-wrap justify-between items-center border-b border-zinc-800 pb-2 mb-5">
                        <h2>Recommended for you</h2>
                        <p><span>{movies.length}</span> RESULTS FOUND</p>
                    </div>
                    {loading && <p className="text-zinc-500 text-sm tracking-widest animate-pulse">LOADING...</p>}
                    {error && <p className="text-red-500 text-sm tracking-widest">Something went wrong.</p>}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </section>

            </div>
        </>
    )
}

export default Home