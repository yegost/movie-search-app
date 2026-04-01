function SearchBar({ onSearch }) {
    return(
        <>
            <input 
                onChange={(e) => onSearch(e.target.value)}
            />
        </>
    )
}

export default SearchBar