import React, { useEffect, useState } from 'react'
import Card from '@/Components/Common/Card'
import { useParams } from 'react-router-dom'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, ReferenceLine } from "recharts";
import { ChevronRight } from 'lucide-react';

const ProductAnalytics = () => {

    const products = [
        {
            id: 1,
            name: 'Sony Headphones',
            currentPrice: 2999,
            lowestPrice: 2499,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.',
            imageUrl: 'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            status: 'stable'
        },
        {
            id: 2,
            name: 'Nike Jordan',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.',
            currentPrice: 15999,
            lowestPrice: 14999,
            imageUrl: 'https://images.unsplash.com/photo-1644426059269-36535c7c00fc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            status: 'stable'
        },
        {
            id: 3,
            name: 'IPhone 13 Pro',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.',
            currentPrice: 39999,
            lowestPrice: 34999,
            imageUrl: 'https://images.unsplash.com/photo-1652721367098-0ecad4cc0370?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            status: 'Price Dropped!'
        },
        {
            id: 4,
            name: 'M2 MacBook Pro',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.',
            currentPrice: 119999,
            lowestPrice: 109999,
            imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            status: 'Increased'
        },
        {
            id: 5,
            name: 'Smart Watch',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.',
            currentPrice: 1999,
            lowestPrice: 2199,
            imageUrl: 'https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?q=80&w=702&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            status: 'Increased'
        },
        {
            id: 6,
            name: 'Apple iPad',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.',
            currentPrice: 39999,
            lowestPrice: 34999,
            imageUrl: 'https://images.unsplash.com/photo-1666451907573-41a93d07864b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            status: 'stable'
        }
    ]

    const priceHistory = [
        { date: "Apr 1", price: 2800 },
        { date: "Apr 5", price: 2700 },
        { date: "Apr 10", price: 3000 },
        { date: "Apr 15", price: 2750 },
        { date: "Apr 20", price: 2900 },
        { date: "Apr 25", price: 2999 }
    ]


    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const axisFontSize =
        screenWidth >= 1536 ? 18 :   // 2xl
            screenWidth >= 768 ? 16 :    // md
                12                           // mobile

    const { id } = useParams()

    const product = products.find(product => product.id === Number(id))

    if (!product) return <h1>Product Not Found</h1>

    return (
        <div className='w-full flex flex-col items-start justify-center gap-3'>

            {/* Header */}
            <div className='flex w-full items-center justify-between'>
                <div>
                    <h1 className='text-sm md:text-md 2xl:text-xl font-semibold text-gray-500'>Analytics / {product.name}</h1>
                    <h2 className='text-xl md:text-2xl 2xl:text-4xl font-bold text-gray-800'>{product.name}</h2>
                </div>
                <div className='flex items-center md:px-4 md:py-2 2xl:px-6 2xl:py-3 2xl:text-lg active:scale-95 hover:bg-blue-700 transition-all duration-300 bg-blue-500 text-white rounded-lg px-3 py-1 justify-center gap-1'>
                    <ChevronRight />
                    <button>Buy Now</button>
                </div>
            </div>

            {/* Price History */}
            <div className='flex flex-wrap w-full md:flex-row flex-col gap-5'>
                <Card variant="analytics" showButton={false} product={product}>
                    <div className="w-full bg-white rounded-2xl shadow-xl p-3">

                        <h2 className="text-xl font-semibold mb-4">
                            Price History
                        </h2>

                        <div className="w-full h-62.5">

                            {/* Chart */}
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    data={priceHistory}>

                                    <defs>
                                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>

                                    <ReferenceLine
                                        y={product.lowestPrice}
                                        stroke="red"
                                        strokeDasharray="5 5"
                                    />

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#e5e7eb"
                                    />

                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fill: "#6b7280", fontSize: axisFontSize }}
                                    />

                                    <YAxis
                                        domain={['dataMin - 200', 'dataMax + 200']}
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={20}
                                        tick={{ fill: "#6b7280", fontSize: axisFontSize }}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "10px",
                                            border: "none",
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                                        }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fill="url(#priceGradient)"
                                        dot={false}
                                        activeDot={{ r: 5 }}
                                    />

                                </AreaChart>
                            </ResponsiveContainer>

                        </div>

                        {/* Current and Target Price */}
                        <div className='flex gap-7 mt-20'>
                            <h2 className="text-md text-gray-500 md:text-xl 2xl:text-2xl font-semibold mb-4">
                                Current:<span className='text-black text-lg md:text-2xl 2xl:text-3xl'> 2,999</span>
                            </h2>
                            <h2 className="text-md text-gray-500 md:text-xl 2xl:text-2xl font-semibold mb-4">
                                Target:<span className='text-black text-lg md:text-2xl 2xl:text-3xl'> 2,499</span>
                            </h2>
                        </div>
                        <div className='flex md:text-xl 2xl:text-2xl items-center text-md gap-2'>
                            <h2 className='text-gray-500'>Product Status : <span className='text-green-500 font-bold'>{product.status}</span></h2>
                        </div>
                    </div>

                </Card>

            </div>

        </div>
    )
}

export default ProductAnalytics