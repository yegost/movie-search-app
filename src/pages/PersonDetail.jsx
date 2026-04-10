import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import NavBar from "../components/NavBar";
import usePersonDetail from "../hooks/usePersonDetail";

function PersonDetail() {
    const { id } = useParams()
    const { person, loading, error } = usePersonDetail(id)
    const [openItems, setOpenItems] = useState([])
    const [openProd, setOpenProd] = useState([])

    if (loading) return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <p className="text-zinc-500 text-sm tracking-widest animate-pulse">LOADING...</p>
        </div>
    )

    if (error) return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <p className="text-red-500 text-sm tracking-widest">Something went wrong.</p>
        </div>
    )

    if (!person) return null

    const groupedCrew = person.movie_credits?.crew.reduce((acc, m) => {
        if (!acc[m.id]) {
            acc[m.id] = { ...m, jobs: [m.job] }
        } else {
            acc[m.id].jobs.push(m.job)
        }
        return acc
    }, {})

    const crewList = Object.values(groupedCrew || {})
        .sort((a, b) => b.popularity - a.popularity)

    function format(date) {
        if (!date) return null;

        const [year, month, day] = date.split("-");
        const d = new Date(year, month - 1, day);

        const formatted = d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
        return formatted;
    }

    console.log(person)
    return(
        <div className="min-h-screen bg-zinc-950 flex flex-col">
            <NavBar />
            <header className="relative max-w-5xl mx-auto w-full min-h-125 flex items-end">
                <div className="absolute mx-auto w-100 right-0">
                    <div className="relative overflow-hidden min-h-125">
                        <img 
                            src={person.profile_path 
                                ? `https://image.tmdb.org/t/p/h632${person.profile_path}` 
                                : "/pfp.png"}
                            alt={person.name}
                            className="absolute h-full w-full object-cover object-top opacity-40 max-w-100"                       
                        />
                        <div className="absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-zinc-950 via-transparent to-transparent" />
                        <div className="absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-zinc-950 via-transparent to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
                    </div>
                </div>
                <div className="relative z-10 max-w-5xl mx-auto w-full px-6 md:px-16 pb-12">
                    <p className="text-red-500 text-xs tracking-widest uppercase mb-2">
                        {person.known_for_department}
                    </p>
                    <h1 className="text-6xl md:text-8xl font-black w-3/4 text-white uppercase leading-none mb-6">
                        {person.name}
                    </h1>
                    <div className="flex gap-8 text-xs tracking-widest uppercase">
                        {person.birthday && (
                            <div>
                                <p className="text-zinc-500 mb-1">Born</p>
                                <p className="text-white">{format(person.birthday)}</p>
                            </div>
                        )}
                        {person.deathday && (
                            <div>
                                <p className="text-zinc-500 mb-1">Died</p>
                                <p className="text-white">{format(person.deathday)}</p>
                            </div>
                        )}
                        {person.place_of_birth && (
                            <div>
                                <p className="text-zinc-500 mb-1">Origin</p>
                                <p className="text-white">{person.place_of_birth}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-zinc-500 mb-1">Role</p>
                            <p className="text-white">{person.movie_credits?.cast?.length} Credits</p>
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-5xl mx-auto text-white w-full px-6 md:px-16 py-10">
                {person.biography && (
                    <section className="mb-10">
                        <h3 className="text-red-500 font-bold mb-4">PERSONAL DETAILS</h3>
                        <div className="flex flex-col gap-4">
                            {person.biography.split('\n\n').map((paragraph, i) => (
                                <p key={i} className="text-zinc-300 text-sm leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </section>
                )}
                {person.movie_credits?.cast.length > 0 && (
                    <section className="mb-10">
                        <h3 className="text-white font-bold mb-6">CAST</h3>
                        <div>
                            {person.movie_credits?.cast.sort((a, b) => b.popularity - a.popularity).map((m) => (
                                <div key={m.id}>
                                    <div 
                                        onClick={() => setOpenItems(prev =>
                                            prev.includes(m.id)
                                                ? prev.filter(id => id !== m.id)
                                                : [...prev, m.id]
                                        )}
                                        className={`overflow-hidden ${openItems.includes(m.id) ? "" : "border-b border-zinc-800"}`}
                                    >
                                        <div className="flex p-5 gap-5 items-center cursor-pointer hover:text-olive-300">
                                            <img src={openItems.includes(m.id) ? `${import.meta.env.BASE_URL}downarrow.png` : `${import.meta.env.BASE_URL}rightarrow.png`} className="w-5 h-5"/>
                                            <p className="tracking-widest">{m.title}</p>
                                        </div>
                                    </div>
                                    <div className={openItems.includes(m.id) ? "border-b border-zinc-800 p-5 flex gap-4" : "h-0 overflow-hidden"}>
                                        <img 
                                            src={m.poster_path 
                                                ? `https://image.tmdb.org/t/p/w92${m.poster_path}` 
                                                : "/posterPlaceholder.png"}
                                            className="w-32 object-cover rounded"
                                        />
                                        <div className="flex flex-col justify-end gap-1">
                                            <Link to={`/movie/${m.id}`}>
                                                <p className="text-white font-semibold pb-3 hover:text-gray-300">{m.title}</p>
                                            </Link>
                                            <p className="text-zinc-400 text-sm">as <span className="text-white">{m.character}</span></p>
                                            <div className="flex gap-3 mt-1">
                                                {m.release_date && <p className="text-zinc-500 text-sm">{m.release_date.slice(0, 4)}</p>}
                                                {m.vote_average !== 0 && <p className="text-yellow-500 text-sm">⭐ {m.vote_average.toFixed(1)}</p>}
                                                {m.adult && <p className="text-red-500 text-sm">18+</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {crewList.length > 0 && (
                    <section className="mb-5">
                        <h3 className="text-white font-bold mb-6">PRODUCTION</h3>
                        <div>
                            {crewList.map((m) => (
                                <div key={m.id}>
                                    <div 
                                        onClick={() => setOpenProd(prev =>
                                            prev.includes(m.id)
                                                ? prev.filter(id => id !== m.id)
                                                : [...prev, m.id]
                                        )}
                                        className={`overflow-hidden ${openProd.includes(m.id) ? "" : "border-b border-zinc-800"}`}
                                    >
                                        <div className="flex p-5 gap-5 items-center cursor-pointer hover:text-olive-300">
                                            <img src={openProd.includes(m.id) ? `${import.meta.env.BASE_URL}downarrow.png` : `${import.meta.env.BASE_URL}rightarrow.png`} className="w-5 h-5"/>
                                            <p className="tracking-widest">{m.title}</p>
                                        </div>
                                    </div>
                                    <div className={openProd.includes(m.id) ? "border-b border-zinc-800 p-5 flex gap-4" : "h-0 overflow-hidden"}>
                                        <img 
                                            src={m.poster_path 
                                                ? `https://image.tmdb.org/t/p/w92${m.poster_path}` 
                                                : "/posterPlaceholder.png"}
                                            className="w-32 object-cover rounded"
                                        />
                                        <div className="flex flex-col justify-end gap-1">
                                            <Link to={`/movie/${m.id}`}>
                                                <p className="text-white font-semibold pb-3 hover:text-gray-300">{m.title}</p>
                                            </Link>
                                            <p className="text-zinc-400 text-sm">as <span className="text-white">{m.jobs.join(' · ')}</span></p>
                                            <div className="flex gap-3 mt-1">
                                                {m.release_date && <p className="text-zinc-500 text-sm">{m.release_date.slice(0, 4)}</p>}
                                                {m.vote_average !== 0 && <p className="text-yellow-500 text-sm">⭐ {m.vote_average.toFixed(1)}</p>}
                                                {m.adult && <p className="text-red-500 text-sm">18+</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    )
}

export default PersonDetail