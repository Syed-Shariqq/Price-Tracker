import { ChartNoAxesCombined, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Card = ({handleStopTracking, avg , product, showButton = true, variant, children, isProduct = false }) => {

    const navigate = useNavigate();

    const sizeClasses =
        variant === "analytics"
            ? ""
            : "md:max-w-xl"

    const averagePrice = (((product.currentPrice + product.lowestPrice) / 2)*92.16).toFixed(2);

    return (
        <div className={`w-full ${variant === "analytics" ? "min-h-screen md:min-h-full 2xl:min-h-full" : "hover:-translate-y-1 "} ${sizeClasses} overflow-hidden hover:shadow-2xl transition-all duration-300 ${variant !== "analytics" && "md:max-w-xl"} shadow-xl bg-white rounded-2xl p-4 mx-auto px-6 flex flex-col gap-4`}>

            {/* Top Section */}
            <div className="flex  gap-4">
                {variant === "analytics" && (<button
                    onClick={() => navigate("/analytics")}
                    className="absolute 2xl:top-52 2xl:w-12 2xl:h-12 md:top-50 top-45 right-8 w-8 h-8 text-gray-500 hover:text-gray-800"
                >
                    <X />
                </button>)}
                {/* Image */}
                <div className="w-20 h-20 md:w-28 md:h-28 2xl:w-40 2xl:h-40 shrink-0">
                    <img
                        src={product.imgUrl}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Details */}
                <div className={`flex ${variant === "analytics" ? "2xl:flex-row" : ""} flex-col justify-between flex-1`}>
                    <div>
                        <h1 className={`text-sm ${variant === "analytics" ? "2xl:text-3xl md:text-xl" : ""} md:text-lg 2xl:text-2xl font-bold`}>
                            {product.productName}
                        </h1>
                        <p className={`text-xs line-clamp-3 ${variant === "analytics" ? "2xl:text-xl md:text-md" : ""} md:text-sm 2xl:text-lg text-gray-500`}>
                            {product.description}
                        </p>
                    </div>

                    <div className={`mt-2 ${variant === "analytics" ? "2xl:flex items-center justify-center 2xl:flex-row 2xl:gap-30 " : ""} space-y-1`}>
                        <p className={`text-sm ${variant === "analytics" ? "2xl:text-3xl text-gray-500 2xl:py-3 bg-gray-100 rounded-lg py-1 px-3 md:text-xl" : ""} md:text-base font-semibold`}>
                            Current: <span className='text-black font-bold'>₹{(product.currentPrice * 92.16).toFixed(2)}</span>
                        </p>
                        {variant === "analytics" && (<p className={`text-sm md:text-xl 2xl:py-3 text-gray-500 bg-gray-100 rounded-lg py-1 px-3 2xl:text-3xl font-semibold`}>
                            Average: <span className='text-black font-bold'>₹{avg.toFixed(2)}</span>
                        </p>)}
                        <p className={`text-sm md:text-base ${variant === "analytics" ? "2xl:text-3xl text-gray-500 2xl:py-3 bg-gray-100 rounded-lg py-1 px-3 md:text-xl" : ""} font-semibold`}>
                            {variant === "analytics" ? "Lowest:" : "Target:"} <span className='text-black font-bold'>₹{variant === "analytics" ? (product.lowestPrice * 92.16).toFixed(2) : (product.targetPrice * 92.16).toFixed(2)}</span>
                        </p>


                        <span className={`inline-block ${variant === "analytics" ? "2xl:text-xl align-center 2xl:h-16" : ""} px-2 py-1 text-xs bg-green-100 md:text-sm rounded-lg text-green-600`}>
                            {product.status}

                        </span>


                    </div>

                </div>

            </div>

            {children}

            {/* Button */}
            {showButton && (<button
                onClick={() => { navigate(`/analytics/${product.id}`) }}
                className="w-full flex gap-2 active:scale-95 hover:scale-105 transition-all duration-300 hover:bg-blue-700 md:w-auto md:self-end px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white text-sm md:text-base rounded-lg">
                View Analytics
                <ChartNoAxesCombined />
            </button>)}

            {/*Products Page Button */}
            {isProduct && (<div className='flex items-center justify-between'>
                <a href={product.productUrl}>
                    <button
                        className='px-4 py-1 md:px-6 md:py-3 hover:bg-blue-500 transition-all duration-300 active:scale-95 bg-blue-400 text-white rounded-lg'>
                        Buy
                    </button>
                </a>
                <button
                    onClick={() => { handleStopTracking(product.id)}}
                    className='px-4 py-1 md:px-6 md:py-3 hover:bg-gray-500 transition-all duration-300 active:scale-95 bg-gray-400 text-white rounded-lg'>
                    Cancel Tracking
                </button>
            </div>)}

        </div>
    )
}

export default Card