import { useState, useEffect } from "react";

function usePersonDetail(id) {
    const [person, setPerson] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPerson = async () => {
            setLoading(true)

            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/person/${id}?append_to_response=movie_credits`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
                        }
                    }
                )
                const data = await response.json()
                setPerson(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPerson()
    }, [id])
    
    return { person, loading, error }
}

export default usePersonDetail