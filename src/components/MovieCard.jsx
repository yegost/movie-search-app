import { Link } from "react-router-dom"
import useFavorites from "../store/useFavorites"

function MovieCard({ movie }) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites()
    const isFav = isFavorite(movie.id)

    const handleFavorite = (e) => {
        e.preventDefault()
        e.stopPropagation()
        isFav ? removeFavorite(movie.id) : addFavorite(movie)
    }

    return(
        <>
            <Link to={`/movie/${movie.id}`}>
                <div className="group relative flex flex-col rounded-lg overflow-hidden bg-zinc-900 hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="relative">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
                    </div>
                    <div className="p-3 flex flex-col gap-1">
                        <h3 className="text-white text-sm font-semibold truncate">{movie.title}</h3>
                        <div className="flex justify-between items-center">
                            <p className="text-zinc-400 text-xs">{movie.release_date ? movie.release_date.slice(0,4) : ''}</p>
                            <p className="text-xs text-yellow-500 font-semibold">{movie.vote_average !== 0 ? "⭐ " + movie.vote_average.toFixed(1) : ''}</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleFavorite}
                        className={`absolute top-2 right-2 w-9 h-9 pt-[2px] pr-[1px] rounded-full flex items-center justify-center bg-black/80 text-lg transition-colors ${isFav ? "text-red-500" : "text-white hover:text-red-500"}`}
                        >
                        {isFav ? "♥" : "♡"}
                    </button>
                </div>
            </Link>
        </>
    )
}

export default MovieCard