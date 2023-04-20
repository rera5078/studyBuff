import { useState, useEffect } from "react";
import "./TypingAnimation.css";

type Props = {
  sentences: string[];
};

const TypingAnimation = ({ sentences }: Props) => {
  const [currentSentence, setCurrentSentence] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTyping) {
        const sentence = sentences[currentIndex];
        const nextChar = sentence[currentSentence.length];

        if (nextChar) {
          setCurrentSentence((prev) => prev + nextChar);
        } else {
          setIsTyping(false);
        }
      } else {
        const timeoutId = setTimeout(() => {
          setCurrentSentence("");
          setCurrentIndex((prev) => (prev + 1) % sentences.length);
          setIsTyping(true);
        }, 1000);

        return () => {
          clearTimeout(timeoutId);
        };
      }
    }, 150);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSentence, currentIndex, isTyping, sentences]);

  return (
    <div className="typing-animation">
      {currentSentence}
      <span className={`typing-cursor ${isTyping ? "visible" : ""}`}>|</span>
    </div>
  );
};

export default TypingAnimation;
