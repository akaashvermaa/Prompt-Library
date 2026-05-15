"use client";
import { useEffect, useState } from "react";

const QUOTES = [
  "Simulating intelligence... please wait.",
  "Optimizing prompt architecture...",
  "Dreaming of electric sheep...",
  "Teaching an old LLM new tricks...",
  "Your prompt is being polished by digital sprites.",
  "Aligning with your intentions...",
  "Almost there. Good prompts take time.",
  "Why did the AI cross the road? To minimize the loss function.",
  "If you're reading this, you're ahead of 99% of prompt engineers.",
  "Loading... but doing it with style.",
  "Calibrating the neural net...",
  "Prompting the database for a response...",
  "Every great prompt starts with a single word.",
  "Polishing tokens... 99% complete (not really, but soon).",
  "Don't worry, the AI is just overthinking it.",
  "Stay curious. The best prompts are yet to be written."
];

export default function Loading() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Randomize quote on mount
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  return (
    <div className="global-loader">
      <div className="loader-content">
        <div className="loader-spinner">
          <div className="spinner-inner"></div>
          <div className="spinner-sparkle"></div>
        </div>
        <p className="loader-quote">{quote}</p>
        <div className="loader-bar">
          <div className="loader-bar-fill"></div>
        </div>
      </div>
    </div>
  );
}
