import SearchBar from "./components/SearchBar"
import useMovieSearch from "./hooks/useMovieSearch"
import { useState } from "react"

function App() {
  const [query, setQuery] = useState('')

  const { movies, loading, error } = useMovieSearch(query)

  return (
    <div>
      <h1>Movie App</h1>
      <SearchBar
        onSearch={setQuery}
      />
      {movies.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  )
}

export default App