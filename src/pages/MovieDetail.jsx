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
            <section className="movie-detail-header">
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
                <div>
                    <p>{movie.adult ? "18+" : ""}</p>
                    <p>{movie.release_date ? movie.release_date.slice(0, 4) : ''}</p>
                    <p>{Math.floor(movie.runtime / 60)}H {movie.runtime % 60}M</p>
                </div>
                <h1>{movie.title}</h1>
            </section>
            <section className="movie-detail-body">
                <div>
                    <div className="movie-description">
                        <h3>Description</h3>
                        <p>{movie.overview}</p>
                    </div>
                    <div className="movie-genre">
                        <p>genre</p>
                        <p>{movie.genres.map((genre) => (
                            <span key={genre.id}>{genre.name}</span>
                        ))}</p>
                        <p>director</p>
                        <p>{movie.credits.crew.filter((p) => p.known_for_department === "Directing")[0].name}</p>
                        <p>box office</p>
                        <p>{formatRevenue(movie.revenue)}</p>
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
        </>
    )
}

export default MovieDetail