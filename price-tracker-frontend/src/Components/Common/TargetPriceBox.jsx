import React from 'react'

const TargetPriceBox = ({ setIsTargetPriceActive, product, setProduct, handleAddProduct }) => {
    return (
        <div className="relative">

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] transition-opacity">

                {/* Modal Box */}
                <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 transform transition-all">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Set Target Price</h3>
                        <button
                            onClick={() => setIsTargetPriceActive(false)}
                            className="text-gray-400 hover:text-gray-600">
                            {/* Close 'X' Icon */}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 mb-5">
                        Enter your desired price. We'll notify you as soon as the price drops to or below this amount.
                    </p>

                    <form
                        onSubmit={handleAddProduct}>
                        <div className="mb-6">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                Target Price
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-medium">₹</span>
                                <input
                                    type="number"
                                    id="price"
                                    value={product.targetPrice}
                                    onChange={(e) => setProduct({ ...product, targetPrice: e.target.value })}
                                    className="block w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                                    placeholder="e.g., 2000"
                                    required
                                    min="1"
                                    step="0.01"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsTargetPriceActive(false)}
                                type="button"
                                className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                            >
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default TargetPriceBox