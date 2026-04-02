import NavBar from "../components/NavBar";

function Favorites() {
    return(
        <>
            <div className="min-h-screen bg-zinc-950 flex flex-col">
                <NavBar />
                <section className="relative bg-zinc-950 px-6 md:px-16 py-12 pb-0 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-800/40 to-transparent" />
                    <div className="relative z-10 max-w-5xl mx-auto flex border-b border-zinc-800 items-center">
                        <div className="text-white flex-1">
                            <p className="text-yellow-400 text-xs tracking-widest mb-3">CURATED</p>
                            <h1 className="tracking-wide font-black mt-4 mb-3">Your Favorites</h1>
                            <p className="text-zinc-500 text-xs tracking-widest pb-12 max-w-md">A personal gallery of cinematic masterpieces and stories that moved you. High-definition visual storytelling at your fingertips.</p>
                        </div>
                        <div className="hidden sm:block ml-auto pb-10">
                            <img 
                                src={`/hero.jpg`} 
                                alt="Absolute Cinema" 
                                className="w-50 h-40 object-cover rounded-lg shadow-2xl border-1 border-zinc-700 opacity-90"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Favorites