import { GrNext, GrPrevious } from "react-icons/gr";
// File: pages/ResultsPage.jsx
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/result-background.png";

const WISHLIST_KEY = "hair_quiz_wishlist";

function matchesUser(product, answers = []) {
    const lower = `${product.title} ${product.body_html} ${product.tags}`.toLowerCase();
    return answers.some((answer) => lower.includes(answer.toLowerCase()));
}

export default function ResultsPage() {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [page, setPage] = useState(1);
    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
        const answers = JSON.parse(localStorage.getItem("hair_quiz_answers")) || [];
        setWishlist(stored);
        setUserAnswers(answers);
    }, []);

    useEffect(() => {
        fetch(`https://jeval.com.au/collections/hair-care/products.json?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                const filtered = data.products.filter((p) => matchesUser(p, userAnswers));
                const sorted = [
                    ...filtered.filter((p) => wishlist.includes(p.id)),
                    ...filtered.filter((p) => !wishlist.includes(p.id)),
                ];
                setProducts(sorted);
            });
    }, [page, wishlist, userAnswers]);

    const toggleWishlist = (id) => {
        const newWishlist = wishlist.includes(id)
            ? wishlist.filter((i) => i !== id)
            : [...wishlist, id];
        setWishlist(newWishlist);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
    };

    return (
        <div className="min-h-screen font-sans bg-white relative">
            <div className="relative h-[540px] flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-black opacity-40" />

                <div className="relative text-white text-center max-w-xl px-4">
                    <h1 className="title text-4xl font-bold mb-4 leading-tight">
                        Build your everyday self care routine.
                    </h1>
                    <p className="description text-sm mb-6">
                        Based on your answers, these products match what you're looking for.
                    </p>
                    <Link to="/" className="button border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition">
                        Retake the quiz
                    </Link>
                </div>
            </div>

            <div className="px-6 flex flex-col items-center space-y-10 relative -mt-24 z-10 pt-12 pb-16">
                {/* Product Row */}
                <div className="flex gap-[30px] flex-wrap justify-center relative items-center">

                    {/* Show Previous button only after page 1 */}
                    {page > 1 && (
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            className="w-[60px] h-[60px] text-black shadow rounded-full flex items-center justify-center hover:bg-gray-50 transition cursor-pointer absolute left-[-80px]"
                        >
                            <span className="text-[28px] leading-none">
                                <GrPrevious />
                            </span>
                        </button>
                    )}

                    {/* Always show Daily Routine */}
                    <div className="bg-[#EEF7FB] rounded-[8px] shadow-md p-6 w-72">
                        <h2 className="title text-[24px] font-bold mb-4 text-gray-800 text-center">Daily routine</h2>
                        <p className="description text-[16px] text-gray-600">
                            Perfect for if you're looking for soft,
                            nourished skin, our moisturizing body washes
                            are made with skin-natural nutrients that work
                            with your skin to replenish moisture. With a light
                            formula, the bubbly lather leaves your skin feeling
                            cleansed and cared for. And by choosing relaxing
                            fragrances you can add a moment of calm to the end of your day.
                        </p>
                    </div>

                    {/* Show two products based on pagination */}
                    {products.slice((page - 1) * 2, page * 2).map((p) => (
                        <div key={p.id} className="bg-white rounded-[8px] shadow-md p-4 w-72 relative">
                            <div className="absolute top-3 right-3 text-[24px] text-red-400 cursor-pointer" onClick={() => toggleWishlist(p.id)}>
                                {wishlist.includes(p.id) ? <AiFillHeart /> : <AiOutlineHeart />}
                            </div>
                            <img
                                src={p.images[0]?.src}
                                alt={p.title}
                                className="w-full h-48 object-cover rounded mb-3"
                            />
                            <h3 className="title text-[24px] font-[600] text-center text-[#1C2635]">{p.title}</h3>
                            <p className="title text-[18px] text-center text-[#1C2635] font-[500] mt-1">
                                ${Number(p.variants[0]?.price || 0).toFixed(2)}
                            </p>
                        </div>
                    ))}

                    {/* Next Button – locked after page 3 */}
                    <button
                        onClick={() => {
                            if (page < 3) setPage((p) => p + 1);
                        }}
                        disabled={page >= 3}
                        className={`w-[60px] h-[60px] text-black shadow rounded-full flex items-center justify-center transition cursor-pointer absolute right-[-80px]
                ${page >= 3 ? "bg-gray-200 cursor-not-allowed" : "hover:bg-gray-50"}`}
                    >
                        <span className="text-[28px] leading-none">
                            <GrNext />
                        </span>
                    </button>
                </div>

                {/* Pagination dots */}
                <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((num) => (
                        <div
                            key={num}
                            className={`w-2 h-2 rounded-full ${page === num ? "bg-blue-600" : "bg-gray-300"}`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}