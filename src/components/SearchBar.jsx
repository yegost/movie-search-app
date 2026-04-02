function SearchBar({ onSearch, onKeyDown, className, placeholder }) {
    return(
        <>
            <input 
                onChange={(e) => onSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onKeyDown()}
                className={className}
                placeholder={placeholder}
            />
        </>
    )
}

export default SearchBar