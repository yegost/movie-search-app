import NavBar from "../components/NavBar";
import { useParams } from 'react-router-dom'
import CastCard from "../components/CastCard";
import useMovieDetail from "../hooks/useMovieDetail";

function MovieDetail() {
    const { id } = useParams()
    const { movie, loading, error } = useMovieDetail(id)

    const formatRevenue = (revenue) => {
        if (!revenue || revenue === 0) return 'N/A'
        if (revenue >= 1000000000) return `$${(revenue / 1000000000).toFixed(1)} Billion`
        if (revenue >= 1000000) return `$${(revenue / 1000000).toFixed(1)} Million`
        if (revenue >= 1000) return `$${(revenue / 1000).toFixed(1)} Thousand`
        return `$${revenue}`
    }

    if (loading) return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <p className="text-zinc-500 text-sm tracking-widest animate-pulse">LOADING...</p>
        </div>
    )

    if (error) return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <p className="text-red-500 text-sm tracking-widest">Something went wrong!</p>
        </div>
    )

    if (!movie) return null

    return(
        <div className="min-h-screen bg-zinc-950 text-white">
            <NavBar />
            <section className="relative overflow-hidden min-h-[400px] bg-gray-900 flex items-end">
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className="absolute right-0 top-0 h-full w-5/6 object-cover object-left-top"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900/30 bg-black/80" />
                <div className="relative flex flex-col mb-10 max-w-5xl mx-auto w-full px-6 md:px-16">
                    <div className="flex gap-1 z-10 text-white">
                        {movie.adult && <span>"18+ · "</span>}
                        <span>{movie.release_date.slice(0, 4)} · </span>
                        <span className="flex flex-row">{Math.floor(movie.runtime / 60)}H {movie.runtime % 60}M</span>
                    </div>
                    <div className="relative">
                        <h1 className="text-white text-6xl">{movie.title}</h1>
                    </div>
                </div>
            </section>
            <section className="max-w-5xl mx-auto w-full px-6 md:px-16">
                <div className="flex flex-col md:flex-row justify-between gap-10 py-10">
                    <div className="flex-1 flex flex-col gap-10">
                        <div>
                            <h3 className="text-red-500 font-bold mb-4">DESCRIPTION</h3>
                            <p className="text-zinc-300 text-sm leading-relaxed">{movie.overview}</p>
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-4">TOP CAST</h3>
                            <div className="flex flex-wrap gap-4">
                                {movie.credits.cast.slice(0, 4).map((actor) => (
                                    <CastCard key={actor.id} actor={actor} />
                                ))}
                            </div>
                        </div>
                    </div>
                
                    <div className="flex flex-col gap-5 w-full md:w-[220px]">
                        <div className="bg-zinc-900 border-l-2 border-r-2 rounded-lg p-5 flex flex-col gap-5">
                            <div>
                                <p className="text-zinc-500 text-xs tracking-widest mb-1">GENRE</p>
                                <p className="text-white text-sm font-semibold">
                                    {movie.genres.map((genre, i) => (
                                        <span key={genre.id}>
                                            {genre.name}{i < movie.genres.length - 1 && <span className="text-zinc-500"> · </span>}
                                        </span>
                                    ))}
                                </p>
                            </div>
                            <div>
                                <p className="text-zinc-500 text-xs tracking-widest mb-1">DIRECTOR</p>
                                <p className="text-white text-lg font-bold uppercase">
                                    {movie.credits.crew.filter((p) => p.known_for_department === "Directing")[0]?.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-zinc-500 text-xs tracking-widest mb-1">BOX OFFICE</p>
                                <p className="text-lg text-white">{formatRevenue(movie.revenue)}</p>
                            </div>
                        </div>
                        <div className="bg-zinc-900 rounded-lg p-5 border-l-2 border-r-2 border-red-500 md:w-[220px]">
                            <p className="bg-yellow-500 w-7 rounded-full text-white flex justify-center text-lg mb-2">★</p>
                            <p className="text-white text-2xl font-bold tracking-wide mb-2">RATING</p>
                            <p className="text-white text-3xl font-black">{movie.vote_average.toFixed(1)}<span className="text-zinc-500 text-lg font-semibold">/10</span></p>
                            <p className="text-zinc-500 text-xs tracking-widest mt-1">CRITIC CHOICE</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MovieDetail