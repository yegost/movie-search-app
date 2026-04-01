function SearchBar({ onSearch, onKeyDown }) {
    return(
        <>
            <input 
                onChange={(e) => onSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onKeyDown()}
            />
        </>
    )
}

export default SearchBar