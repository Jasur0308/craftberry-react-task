import React from "react";
import { Routes, Route } from "react-router-dom";
import QuizPage from "./pages/quiz-page/QuizPage";
import Home from "./pages/home/Home";
import ResultsPage from "./pages/result-page/ResultsPage"; // optional

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/:step" element={<QuizPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  );
}

export default App;