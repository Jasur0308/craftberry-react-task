import React from 'react'
import backgroundImage from "../../assets/home-background.png";
import { Link } from 'react-router-dom';
import './home.css'

const Home = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background image */}
            <img
                src={backgroundImage}
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

            {/* Centered Content */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center text-white h-full px-4">
                <h2 className="title text-[40px] md:text-5xl font-[600] mb-4">
                    Build a self care routine <br /> suitable for you
                </h2>
                <p className="description text-base md:text-[16px] mb-6 max-w-xl text-[16px]">
                    Take out test to get a personalised self care <br /> routine based on your needs.
                </p>
                <Link to={'/quiz/1'} className="link bg-[#C3EDFF] hover:bg-blue-200 transition-all text-[#1C2635] font-medium py-[14px] px-[40px] rounded-[8px] text-sm shadow-lg cursor-pointer">
                    Start the quiz
                </Link>
            </div>
        </div>
    )
}

export default Home