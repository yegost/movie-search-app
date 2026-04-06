import { useRef } from "react"
import CastCard from "./CastCard"

function CastSlider({ cast }) {
    const sliderRef = useRef(null)

    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }

    return(
        <div className="relative w-full overflow-hidden">
            <h3 className="text-white font-bold mb-4">TOP CAST</h3>
            <div className="relative group w-full">
                <button 
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                >
                    ‹
                </button>
                <div 
                    ref={sliderRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-2"
                >
                    {cast.map((actor) => (
                        <div key={actor.id} className="shrink-0">
                            <CastCard actor={actor} />
                        </div>
                    ))}
                </div>
                <button 
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                >
                    ›
                </button>
            </div>
        </div>
    )
}

export default CastSlider