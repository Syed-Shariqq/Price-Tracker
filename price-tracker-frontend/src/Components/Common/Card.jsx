import { ChartNoAxesCombined, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Card = ({ handleStopTracking, avg, product, showButton = true, variant, children, isProduct = false }) => {

    const navigate = useNavigate();

    const sizeClasses =
        variant === "analytics"
            ? ""
            : "md:max-w-xl"

    const averagePrice = (((product.currentPrice + product.lowestPrice) / 2) * 92.16).toFixed(2);

    return (
        <div className={`w-full ${variant === "analytics" ? "min-h-screen md:min-h-full 2xl:min-h-full" : "hover:-translate-y-1 hover:shadow-xl hover:border-blue-100 border border-gray-100 shadow-md"} ${sizeClasses} overflow-hidden transition-all duration-300 ease-out ${variant !== "analytics" && "md:max-w-xl"} bg-white rounded-2xl p-4 mx-auto flex flex-col gap-3`}>

            {/* Top Section */}
            <div className="flex relative gap-4">
                {variant === "analytics" && (
                    <button
                        onClick={() => navigate("/analytics")}
                        className="absolute -top-4 -right-2 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
                {/* Image */}
                <div className="w-16 h-16 shrink-0">
                    <img
                        src={product.imgUrl}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>

                {/* Details */}
                <div className={`flex ${variant === "analytics" ? "2xl:flex-row" : ""} flex-col justify-between flex-1`}>
                    <div>
                        <h1 className={`text-sm mt-0.5 font-semibold text-gray-900 leading-tight line-clamp-2`}>
                            {product.productName}
                        </h1>
                        <p className={`text-xs text-gray-500 leading-relaxed line-clamp-2`}>
                            {product.description}
                        </p>
                    </div>

                    <div className={`mt-2 flex flex-col gap-1`}>
                        <div className="flex items-center justify-between">
                            <span className='text-xs font-medium text-gray-400 uppercase tracking-wide'>Current:</span>
                            <span className='text-base font-extrabold tabular-nums text-gray-900'>₹{(product.currentPrice * 92.16).toFixed(2)}</span>
                        </div>
                        {variant === "analytics" && (
                            <div className="flex items-center justify-between">
                                <span className='text-xs font-medium text-gray-400 uppercase tracking-wide'>Average:</span>
                                <span className='text-base font-extrabold tabular-nums text-gray-900'>₹{avg.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <span className='text-xs font-medium text-gray-400 uppercase tracking-wide'>{variant === "analytics" ? "Lowest:" : "Target:"}</span>
                            <span className='text-base font-extrabold tabular-nums text-gray-900'>₹{variant === "analytics" ? (product.lowestPrice * 92.16).toFixed(2) : (product.targetPrice * 92.16).toFixed(2)}</span>
                        </div>

                        <span className={`inline-block w-fit mt-1 px-2 py-1 text-[10px] uppercase tracking-wide bg-green-100 rounded-md text-green-700 font-bold`}>
                            {product.status}
                        </span>
                    </div>

                </div>

            </div>

            {children}

            {/* Button */}
            {showButton && (<button
                onClick={() => { navigate(`/analytics/${product.id}`) }}
                className="w-full flex items-center justify-center gap-2 active:scale-95 transition-all duration-300 hover:bg-blue-700 md:w-auto md:self-end px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md font-medium">
                View Analytics
                <ChartNoAxesCombined className="w-4 h-4" />
            </button>)}

            {/*Products Page Button */}
            {isProduct && (<div className='flex items-center justify-between gap-2 pt-2 border-t border-gray-100/60'>
                <a href={product.productUrl} className='flex-1'>
                    <button
                        className='w-full px-3 py-1.5 hover:bg-blue-700 transition-all duration-300 active:scale-95 bg-blue-600 font-medium text-sm text-white rounded-md'>
                        Buy
                    </button>
                </a>
                <button
                    onClick={() => { handleStopTracking(product.id) }}
                    className='px-3 py-1.5 bg-gray-100 hover:bg-gray-200 transition-all duration-300 active:scale-95 font-medium text-sm text-gray-700 rounded-md border border-gray-200'>
                    Cancel Tracking
                </button>
            </div>)}

        </div>
    )
}

export default Card