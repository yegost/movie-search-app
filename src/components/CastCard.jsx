function CastCard({ actor }) {
    return(
        <div key={actor.id} className="bg-zinc-800 w-28 gap-1 overflow-hidden rounded-md">
            <img 
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={`${actor.name}`} 
                className="w-full h-34 object-cover object-top"
            />
            <p className="p-1 pt-2 text-white text-xs font-bold capitalize">{actor.name}</p>
            <p className="p-1 text-zinc-500 text-xs">{actor.character}</p>
        </div>
    )
}

export default CastCard