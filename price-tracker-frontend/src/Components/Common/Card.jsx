import { ChartNoAxesCombined } from 'lucide-react'
import React from 'react'

const Card = ({ product }) => {
    return (
        <div className="w-full hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 md:max-w-xl shadow-xl bg-white rounded-2xl p-4 mx-auto px-6 flex flex-col gap-4">

            {/* Top Section */}
            <div className="flex gap-4">

                {/* Image */}
                <div className="w-20 h-20 md:w-28 md:h-28 2xl:w-40 2xl:h-40 shrink-0">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-1">

                    <div>
                        <h1 className="text-sm md:text-lg 2xl:text-2xl font-bold">
                            {product.name}
                        </h1>
                        <p className="text-xs md:text-sm 2xl:text-lg text-gray-500">
                            {product.description}
                        </p>
                    </div>

                    <div className="mt-2 space-y-1">
                        <p className="text-sm md:text-base font-semibold">
                            Current: ₹{product.currentPrice}
                        </p>
                        <p className="text-sm md:text-base font-semibold">
                            Target: ₹{product.lowestPrice}
                        </p>

                        <span className="inline-block px-2 py-1 text-xs md:text-sm rounded-lg bg-green-100 text-green-600">
                            {product.status}
                        </span>
                    </div>

                </div>
            </div>

            {/* Button */}
           
             <button className="w-full flex gap-2 active:scale-95 hover:scale-105 transition-all duration-300 hover:bg-blue-700 md:w-auto md:self-end px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white text-sm md:text-base rounded-lg">
                 View Analytics
                <ChartNoAxesCombined />
            </button>

        </div>
    )
}

export default Card