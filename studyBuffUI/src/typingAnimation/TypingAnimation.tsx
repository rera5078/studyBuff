import { useState, useEffect } from "react";
import "./TypingAnimation.css";

interface Props {
  sentences: string[];
}

const TypingAnimation = ({ sentences }: Props): JSX.Element => {
  const [currentSentence, setCurrentSentence] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTyping) {
        const sentence = sentences[currentIndex];
        const nextChar = sentence[currentSentence.length];

        if (nextChar) {
          setCurrentSentence(prev => prev + nextChar);
        } else {
          setIsTyping(false);
        }
      } else {
        const timeoutId = setTimeout(() => {
          setCurrentSentence("");
          setCurrentIndex(prev => (prev + 1) % sentences.length);
          setIsTyping(true);
        }, 100);

        return () => {
          clearTimeout(timeoutId);
        };
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, currentSentence.length, isTyping, sentences]);

  return (
    <div className="type-container">
      <div className="typing-animation">
        {currentSentence}
        <span className={`typing-cursor ${isTyping ? "visible" : ""}`}>|</span>
      </div>
    </div>
  );
};

export default TypingAnimation;
