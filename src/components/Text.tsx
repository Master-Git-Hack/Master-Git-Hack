/** @format */

import React, { useState, useEffect, useRef } from 'react';

interface ConsoleTextProps {
	words: string[];
	colors: string[];
}

const ConsoleText: React.FC<ConsoleTextProps> = ({ words, colors }) => {
	const [currentText, setCurrentText] = useState('');
	const [letterCount, setLetterCount] = useState(1);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [isWaiting, setIsWaiting] = useState(false);
	const [textColor, setTextColor] = useState(colors[0]);
	const [direction, setDirection] = useState(1);
	const [isVisible, setIsVisible] = useState(true);
	const textRef = useRef(null);
	const underscoreRef = useRef(null);

	useEffect(() => {
		const wordCycle = setInterval(() => {
			if (!isWaiting) {
				const word = words[currentWordIndex];
				const newLetterCount = letterCount + direction;

				if (newLetterCount === 0 || newLetterCount === word.length + 1) {
					setIsWaiting(true);

					setTimeout(() => {
						if (newLetterCount === 0) {
							const nextIndex = (currentWordIndex + 1) % words.length;
							setCurrentWordIndex(nextIndex);
							setTextColor(colors[nextIndex]);
						}
						setDirection(newLetterCount === 0 ? 1 : -1);
						setIsWaiting(false);
					}, 1000);
				} else {
					setCurrentText(word.substring(0, newLetterCount));
					setLetterCount(newLetterCount);
				}
			}
		}, 120);

		return () => clearInterval(wordCycle);
	}, [letterCount, currentWordIndex, direction, isWaiting, words, colors]);

	useEffect(() => {
		const blinkCursor = setInterval(() => {
			setIsVisible((prev) => !prev);
		}, 400);

		return () => clearInterval(blinkCursor);
	}, []);

	return (
		<div>
			<div ref={textRef} style={{ color: textColor }} className='console-text'>
				{currentText}
				<span ref={underscoreRef} className={`console-underscore ${isVisible ? '' : 'hidden'}`}>
					_
				</span>
			</div>
		</div>
	);
};

export default ConsoleText;
