import { useRef } from "react"
import CastCard from "./CastCard"

function CastSlider({ cast }) {
    const sliderRef = useRef(null)

    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }

    return(
        <div className="relative w-full">
            <h3 className="text-white font-bold mb-4">TOP CAST</h3>
            <div className="relative group">
                <button 
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200/70 hover:bg-red-500/70 text-black text-2xl w-8 h-8 rounded-full flex items-center justify-center -translate-x-4 transition-all duration-200"
                >
                    ‹
                </button>
                <div 
                    ref={sliderRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
                >
                    {cast.map((actor) => (
                        <div key={actor.id} className="shrink-0">
                            <CastCard actor={actor} />
                        </div>
                    ))}
                </div>
                <button 
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200/70 hover:bg-red-500/70 text-black text-2xl w-8 h-8 rounded-full flex items-center justify-center translate-x-4 transition-all duration-200"
                >
                    ›
                </button>
            </div>
        </div>
    )
}

export default CastSlider