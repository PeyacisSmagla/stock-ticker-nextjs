import { useEffect, useState } from "react";

export function SearchPlaceholder(words, delay = 2000) {
  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let typeSpeed = isDeleting ? 50 : 100;

    const update = () => {
      if (!isDeleting) {
        setPlaceholder("Search " + currentWord.slice(0, letterIndex + 1));
        setLetterIndex(letterIndex + 1);

        if (letterIndex === currentWord.length) {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        setPlaceholder("Search " + currentWord.slice(0, letterIndex - 1));
        setLetterIndex(letterIndex - 1);

        if (letterIndex === 0) {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(update, typeSpeed);
    return () => clearTimeout(timer);
  }, [letterIndex, isDeleting, wordIndex, words, delay]);

  return placeholder;
}
