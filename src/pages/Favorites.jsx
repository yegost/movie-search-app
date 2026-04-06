import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";
import useFavorites from "../store/useFavorites";

function Favorites() {
    const { favorites } = useFavorites()

    return(
        <>
            <div className="min-h-screen bg-zinc-950 flex flex-col">
                <NavBar />
                <section className="relative bg-zinc-950 px-6 md:px-16 py-12 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-zinc-800/40 to-transparent" />
                    <div className="relative z-10 max-w-5xl mx-auto flex items-center">
                        <div className="text-white flex-1">
                            <p className="text-yellow-400 text-xs tracking-widest mb-3">CURATED</p>
                            <h1 className="tracking-wide font-black mt-4 mb-3">Your Favorites</h1>
                            <p className="text-zinc-500 text-xs tracking-widest max-w-md">A personal gallery of cinematic masterpieces and stories that moved you. High-definition visual storytelling at your fingertips.</p>
                        </div>
                        <div className="hidden sm:block ml-auto">
                            <img 
                                src={`/hero.jpg`} 
                                alt="Absolute Cinema" 
                                className="w-50 h-40 object-cover rounded-lg shadow-2xl border border-zinc-700 opacity-90"
                            />
                        </div>
                    </div>
                </section>
                <section className="relative px-6 md:px-16">
                    <div className="max-w-5xl mx-auto w-full">
                        <p className="text-zinc-500 text-xs justify-center tracking-widest">{favorites.length} RESULTS FOUND</p>
                        <hr className="text-zinc-500 text-xs tracking-widest" />
                    </div>
                </section>
                <section className="relative px-6 md:px-16 py-5">
                    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {favorites.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}

export default Favorites