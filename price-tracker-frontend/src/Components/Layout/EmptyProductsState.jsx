import React from 'react';
import { useNavigate } from 'react-router-dom';
import emptyCardboard from '../../assets/emptyState.png';

const EmptyProductsState = () => {

    const navigate = useNavigate();

    return (
        // The wrapper ensures it takes up decent vertical space and centers everything
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center ">

            {/* Illustration Container */}
            {/* Note: Replace the src with the actual path to your illustration asset */}
            <div className="mb-6 w-48 h-48 md:w-56 md:h-56 relative">
                <img
                    src={emptyCardboard}
                    alt="Empty cardboard box illustration"
                    className="object-contain w-full h-full"
                />
            </div>

            {/* Main Heading */}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                No products being tracked
            </h2>

            {/* Subtitle Text */}
            <p className="text-gray-500 text-sm md:text-base max-w-sm md:max-w-md mx-auto mb-8 leading-relaxed">
                It seems you haven't added any products yet. Start tracking to monitor prices and receive alerts.
            </p>

            {/* Action Button */}
            <button
                onClick={() => navigate("/home")}
                className="flex cursor-pointer items-center gap-2 px-6 py-2.5 bg-[#2a77f4] hover:bg-blue-700 text-white text-sm md:text-base font-medium rounded-md transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                {/* Plus Icon */}
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Track a product
            </button>

        </div>
    );
};

export default EmptyProductsState;