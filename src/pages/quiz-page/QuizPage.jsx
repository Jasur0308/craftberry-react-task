import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import questions from "../../data/questions";

export default function QuizPage() {
    const { step } = useParams();
    const navigate = useNavigate();
    const index = parseInt(step) - 1;
    const question = questions[index];
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        const storedAnswers = JSON.parse(localStorage.getItem("hair_quiz_answers")) || [];
        if (storedAnswers[index]) setSelectedAnswer(storedAnswers[index]);
    }, [index]);

    if (!question) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center text-red-600">
                Invalid or missing question step. Please start again.
            </div>
        );
    }

    const handleSelect = (option) => {
        setSelectedAnswer(option);
        const storedAnswers = JSON.parse(localStorage.getItem("hair_quiz_answers")) || [];
        storedAnswers[index] = option;
        localStorage.setItem("hair_quiz_answers", JSON.stringify(storedAnswers));
        setTimeout(() => goNext(), 300);
    };

    const goNext = () => {
        if (index + 1 < questions.length) navigate(`/quiz/${index + 2}`);
        else navigate("/results");
    };

    const goBack = () => {
        if (index > 0) navigate(`/quiz/${index}`);
        else navigate("/");
    };

    const progress = questions.length > 0 ? ((index + 1) / questions.length) * 100 : 0;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center font-sans relative">
            <div className="absolute right-10 top-10 flex flex-col items-center">
                <div className="relative w-[60px] h-[60px]">
                    <svg className="rotate-[-90deg]" width="60" height="60">
                        <circle
                            cx="30"
                            cy="30"
                            r="25"
                            stroke="#e5e7eb"
                            strokeWidth="4"
                            fill="none"
                        />
                        <circle
                            cx="30"
                            cy="30"
                            r="25"
                            stroke="#3b82f6"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={157}
                            strokeDashoffset={`${(1 - progress / 100) * 157}`}
                            strokeLinecap="round"
                            className="transition-all duration-300"
                        />
                    </svg>
                    {/* Progress number inside circle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">
                            {index + 1}/{questions.length}
                        </span>
                    </div>
                </div>
            </div>

            <h2 className="title text-2xl md:text-3xl font-semibold mb-8">{question?.question}</h2>

            <div className="flex flex-wrap justify-around gap-[10px] mb-10 w-full max-w-5xl">
                {question?.options.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => handleSelect(opt)}
                        className={`variant flex items-center text-[15px] text-center max-w-[330px] min-w-[190px] h-[44px] border pl-[20px] pr-[24px] pt-[14px] pb-[14px] rounded-[8px] cursor-pointer ${selectedAnswer === opt
                            ? "bg-blue-500 text-white"
                            : "border-blue-400 hover:bg-blue-50"
                            }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            <div className="flex gap-4">
                <button onClick={goBack} className="button text-blue-500 underline text-sm cursor-pointer">Back</button>
                <button
                    onClick={goNext}
                    className="button bg-blue-100 hover:bg-blue-200 px-5 py-2 rounded-full cursor-pointer"
                >
                    Next question →
                </button>
            </div>
        </div>
    );
}