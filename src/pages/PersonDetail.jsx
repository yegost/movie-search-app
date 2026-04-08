import { useState } from "react"
import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar";
import usePersonDetail from "../hooks/usePersonDetail";

function PersonDetail() {
    const { id } = useParams()
    const { person, loading, error } = usePersonDetail(id)
    const [openItems, setOpenItems] = useState([])

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
                    <section className="mb-5">
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
                    <section>
                        <h3>CAST</h3>
                        <div>
                            <div>
                                {person.movie_credits?.cast.sort((a, b) => b.popularity - a.popularity).map((m) => (
                                    <div key={m.id}>
                                        <div 
                                            onClick={() => setOpenItems(prev =>
                                                prev.includes(m.id)
                                                    ? prev.filter(id => id !== m.id)
                                                    : [...prev, m.id]
                                            )}
                                            className="p-5 border-b border-zinc-800 overflow-hidden"
                                        >
                                            <p>{m.title}</p>
                                        </div>
                                        <div className={openItems.includes(m.id) ? "h-full border-b border-zinc-800 p-5" : "h-0 overflow-hidden"}>
                                            <p>hi</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    )
}

export default PersonDetail