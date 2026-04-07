import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar";
import usePersonDetail from "../hooks/usePersonDetail";

function PersonDetail() {
    const { id } = useParams()
    const { person, loading, error } = usePersonDetail(id)

    console.log(person)
    return(
        <>
            <div className="min-h-screen bg-zinc-950 flex flex-col">
                <NavBar />
                <main className="relative max-w-5xl mx-auto w-full px-6 md:px-16 py-12 overflow-hidden">
                    <section className="text-white">
                        {person.name}
                    </section>
                </main>
            </div>
        </>
    )
}

export default PersonDetail