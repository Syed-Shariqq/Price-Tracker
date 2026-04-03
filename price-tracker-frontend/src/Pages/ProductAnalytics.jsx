import React, { useEffect, useState } from 'react'
import Card from '@/Components/Common/Card'
import { useParams } from 'react-router-dom'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, ReferenceLine } from "recharts";
import { ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { getProductAnalytics, getTrackedProductsOfUser } from '../Api/productApi';

const ProductAnalytics = () => {

    const [product, setProduct] = useState(null)
    const [priceHistory, setPriceHistory] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {

        try {
            const res = await getProductAnalytics(id);
            if (res.data.status === 200) {

                setProduct(res.data.data.product);
                const history = res.data.data.priceHistory.map(h => {
                    const date = new Date(h.recordedAt);

                    const formatted = date.toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true
                    });

                    return {
                        price: Number((h.price * 92.16).toFixed(2)),
                        date: formatted.replace(",", " ·")
                    };
                });

                setPriceHistory(history);

                console.log(res.data.data);
                console.log(product);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error("An error occurred while fetching product data.");
        }
    }


    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const axisFontSize =
        screenWidth >= 1536 ? 16 :
            screenWidth >= 768 ? 14 :
                14

    const { id } = useParams()

    if (!product) return <h1>Product Not Found</h1>

    return (
        <div className='w-full flex flex-col items-start justify-center gap-3'>

            {/* Header */}
            <div className='flex w-full my-5 items-center justify-between'>
                <div>
                    <h1 className='text-xs font-medium text-gray-400 uppercase tracking-wide'>Analytics / {product.productName}</h1>
                    <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>{product.productName}</h2>
                </div>
                <a href={product.productUrl}>
                    <div className='flex items-center md:px-4 md:py-2 2xl:px-6 2xl:py-3 2xl:text-lg active:scale-95 hover:bg-blue-700 transition-all duration-300 bg-blue-500 text-white rounded-lg px-3 py-1 justify-center gap-1'>
                        <ChevronRight />
                        <button>Buy Now</button>
                    </div>
                </a>
            </div>

            {/* Price History */}
            <div className='flex flex-wrap w-full md:flex-row flex-col gap-5'>
                <Card avg={priceHistory.reduce((sum, p) => sum + Number(p.price), 0) / priceHistory.length} variant="analytics" showButton={false} product={product}>
                    <div className="w-full bg-white rounded-2xl shadow-xl p-3">

                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Price History
                        </h2>

                        <div className="w-full h-65">

                            {/* Chart */}
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    data={priceHistory}
                                    margin={{ top: 10, right: 20, left: 20, bottom: 35 }} // ✅ spacing fix
                                >

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
                                        tickMargin={12} // ✅ prevents overlap
                                        tick={{ fill: "#111827", fontSize: axisFontSize, fontWeight: 500 }}
                                    />

                                    <YAxis
                                        width={50} 
                                        tickFormatter={(value) => `₹${value}`}
                                        domain={['auto', 'auto']}
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={12}
                                        tick={{ fill: "#111827", fontSize: axisFontSize, fontWeight: 500 }}
                                    />

                                    <Tooltip
                                        formatter={(value) => `₹${value}`}
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
                            {priceHistory.length > 0 &&
                                priceHistory.every(p => p.price === priceHistory[0].price) && (
                                    <p className="text-sm text-gray-500 leading-relaxed text-center my-2">
                                        No price changes recorded yet
                                    </p>
                                )}
                            {priceHistory.length === 0 && (
                                <p className="text-sm text-gray-500 leading-relaxed text-center my-2">
                                    No price changes recorded yet
                                </p>
                            )}
                        </div>

                        {/* Current and Target Price */}
                        <div className='flex gap-7 mt-8'>
                            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wide flex flex-col gap-1">
                                Current
                                <span className='text-xl font-extrabold tabular-nums text-gray-900'>₹{(product.currentPrice * 92.16).toFixed(2)}</span>
                            </h2>
                            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wide flex flex-col gap-1">
                                lowest
                                <span className='text-xl font-extrabold tabular-nums text-gray-900'>₹{(product.lowestPrice * 92.16).toFixed(2)}</span>
                            </h2>
                        </div>
                        <div className='flex items-center text-sm font-medium text-gray-900 gap-2 mt-4'>
                            <h2 className='text-sm text-gray-500 leading-relaxed'>Product Status : <span className='text-emerald-600 font-bold'>{product.status}</span></h2>
                        </div>
                    </div>

                </Card>

            </div>

        </div>
    )
}

export default ProductAnalytics