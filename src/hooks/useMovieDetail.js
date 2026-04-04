import { useState, useEffect } from "react"

function useMovieDetail(id) {
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true)

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
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMovie()
    }, [id])

    return { movie, loading, error }
}

export default useMovieDetail