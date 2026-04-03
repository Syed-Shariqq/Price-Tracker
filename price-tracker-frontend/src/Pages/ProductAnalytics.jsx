import React, { useEffect, useState } from "react";
import Card from "@/Components/Common/Card";
import { useParams } from "react-router-dom";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
  ReferenceLine,
} from "recharts";
import { ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import {
  getProductAnalytics,
  getTrackedProductsOfUser,
} from "../Api/productApi";

const ProductAnalytics = () => {
  const [product, setProduct] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getProductAnalytics(id);
      if (res.data.status === 200) {
        setProduct(res.data.data.product);
        const history = res.data.data.priceHistory.map((h) => {
          const date = new Date(h.recordedAt);

          const formatted = date.toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });

          return {
            price: Number((h.price * 92.16).toFixed(2)),
            date: formatted.replace(",", " ·"),
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
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const axisFontSize = screenWidth >= 1536 ? 16 : screenWidth >= 768 ? 14 : 14;

  const { id } = useParams();

  if (!product) return <h1>Product Not Found</h1>;

  return (
    <div className="animate-fade-in w-full flex flex-col items-start justify-center gap-3">
      {/* Header */}
      <div className="flex w-full my-5 items-center justify-between">
        <div>
          <h1 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Analytics / {product.productName}
          </h1>
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {product.productName}
          </h2>
        </div>
        <a href={product.productUrl}>
          <button className="flex items-center justify-center gap-1 active:scale-95 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-all">
            <ChevronRight className="w-4 h-4" />
            Buy Now
          </button>
        </a>
      </div>

      {/* Price History */}
      <div className="flex flex-wrap w-full md:flex-row flex-col gap-5">
        <Card
          avg={
            priceHistory.reduce((sum, p) => sum + Number(p.price), 0) /
            priceHistory.length
          }
          variant="analytics"
          showButton={false}
          product={product}
        >
          <div className="w-full pt-2">
            <h2 className="text-base font-bold text-gray-800 mb-2">
              Price History
            </h2>

            <div className="w-full">
              {/* Chart */}
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={priceHistory}
                  margin={{ top: 10, right: 20, left: 20, bottom: 35 }} // ✅ spacing fix
                >
                  <defs>
                    <linearGradient
                      id="priceGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#3b82f6"
                        stopOpacity={0.25}
                      />
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
                    tick={{
                      fill: "#111827",
                      fontSize: axisFontSize,
                      fontWeight: 500,
                    }}
                  />

                  <YAxis
                    width={80} // ✅ prevents ₹ clipping
                    tickFormatter={(value) => `₹${value}`}
                    domain={["auto", "auto"]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tick={{
                      fill: "#111827",
                      fontSize: axisFontSize,
                      fontWeight: 500,
                    }}
                  />

                  <Tooltip
                    formatter={(value) => `₹${value}`}
                    contentStyle={{
                      borderRadius: "10px",
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
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
                priceHistory.every(
                  (p) => p.price === priceHistory[0].price,
                ) && (
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

            {/* Stats Boxes */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-3 flex flex-col gap-1 justify-center">
                <h2 className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">
                  Current Price
                </h2>
                <span className="text-lg font-extrabold tabular-nums text-gray-900">
                  ₹{(product.currentPrice * 92.16).toFixed(2)}
                </span>
              </div>
              <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-3 flex flex-col gap-1 justify-center">
                <h2 className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">
                  Lowest Price
                </h2>
                <span className="text-lg font-extrabold tabular-nums text-gray-900">
                  ₹{(product.lowestPrice * 92.16).toFixed(2)}
                </span>
              </div>
              <div className="bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-3 flex flex-col gap-1 justify-center col-span-2 md:col-span-1">
                <h2 className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Product Status
                </h2>
                <span className="text-sm font-bold text-emerald-700 uppercase">
                  {product.status}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductAnalytics;
