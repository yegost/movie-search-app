import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useParams } from 'react-router-dom'

function MovieDetail() {
    const [movie, setMovie] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,watch/providers`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
                        }
                    }
                )
                const data = await response.json()
                setMovie(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchMovie()
    }, [id])

    const formatRevenue = (revenue) => {
        if (!revenue || revenue === 0) return 'N/A'
        if (revenue >= 1000000000) return `$${(revenue / 1000000000).toFixed(1)} Billion`
        if (revenue >= 1000000) return `$${(revenue / 1000000).toFixed(1)} Million`
        if (revenue >= 1000) return `$${(revenue / 1000).toFixed(1)} Thousand`
        return `$${revenue}`
    }

    console.log(movie)
    if (!movie) return <p>Loading...</p>

    return(
        <>
            <NavBar />
            <section className="relative overflow-hidden min-h-[400px] bg-gray-900 flex items-end">
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className="absolute right-0 top-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 bg-black/60" />
                <div className="relative flex flex-col ml-10 mb-10">
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
            <div className="max-w-5xl mx-auto w-full px-6 md:px-16">
                <section className="my-10">
                    <div className="flex flex-row justify-between gap-10">
                        <div className="flex-1">
                            <h3 className="text-red-500 text-xs tracking-widest uppercase font-semibold mb-4">Description</h3>
                            <p className="text-zinc-300 text-sm leading-relaxed">{movie.overview}</p>
                        </div>
                        <div className="flex flex-col gap-5 min-w-[200px] bg-zinc-900 rounded-lg p-5">
                            <div>
                                <p className="text-zinc-500 text-xs tracking-widest mb-1">GENRE</p>
                                <p className="text-white text-sm font-semibold">{movie.genres.map((genre, i) => (
                                    <span key={genre.id}>
                                        {genre.name}{i < movie.genres.length - 1 && <span className="text-zinc-500"> · </span>}
                                    </span>
                                ))}</p>
                            </div>
                            <div>
                                <p className="text-zinc-500 text-xs tracking-widest uppercase mb-1">director</p>
                                <p className="text-white text-sm font-bold uppercase">
                                    {movie.credits.crew.filter((p) => p.known_for_department === "Directing")[0].name}
                                </p>
                                <p className="text-zinc-500 text-xs tracking-widest uppercase my-1">box office</p>
                                <p className="text-white text-lg">{formatRevenue(movie.revenue)}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>top cast</p>
                        </div>
                        <div>
                            <p>rating</p>
                            <p><span>{movie.vote_average.toFixed(1)}</span>/10</p>
                            <p>critic choice</p>
                        </div>
                    </div>
                </section>
                <section>
                    <h3>Streaming</h3>
                    <p>buy</p>
                    {movie["watch/providers"]?.results?.GB?.buy.map((p) => (
                        <div>
                            <img src="" />
                            <p>{p.provider_name}</p>
                        </div>
                    ))}
                    <p>rent</p>
                    {movie["watch/providers"]?.results?.GB?.buy.map((p) => (
                        <div>
                            <img src="" />
                            <p>{p.provider_name}</p>
                        </div>
                    ))}
                </section>
            </div>
        </>
    )
}

export default MovieDetail