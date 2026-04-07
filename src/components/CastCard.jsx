import { Link } from "react-router-dom"

function CastCard({ actor }) {
    return(
        <Link to={`/person/${actor.id}`} >
            <div key={actor.id} className="bg-zinc-800 w-36 h-full gap-1 overflow-hidden rounded-md">
                <img 
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "/pfp.png"}
                    alt={`${actor.name}`} 
                    className="w-full h-46 object-cover object-top"
                />
                <p className="p-1 pt-2 text-white text-xs font-bold capitalize">{actor.name}</p>
                <p className="p-1 text-zinc-500 text-xs">{actor.character}</p>
            </div>
        </Link>
    )
}

export default CastCard