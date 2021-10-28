import React from "react";
import { useState, useEffect } from "react";
import ActiveWord from "../ActiveWord/ActiveWord";
import { nanoid } from 'nanoid'

const LetterGrid = () => {
    const [ letters, setLetters ] = useState([]);
    const [ chosenLetters, setChosenLetters ] = useState([]);

    const generateGrid = () => {
        const letterArray = [];
        const extraLetters = [10, 12, 14, 18, 21, 23, 24, 27, 28, 29, 30];

        for (let j = 0; j < 3; j++) {
            for (let i = 10; i < 36; i++) {
                letterArray.push(i.toString(36))
                if (extraLetters.some(el => el === i && j > 0)) {
                    letterArray.push(i.toString(36))
                }
            }
        }

        letterArray.forEach((letter, ind, arr) => arr.splice(ind, 1, {id: nanoid(), letter: letter}));
        letterArray.sort(function() {
            return 0.5 - Math.random()
            });

        setLetters(letterArray);
    };

    useEffect(() => {
        generateGrid();
    }, []);


    const onClickHandler = (e) => {
        if (e.target.className === 'letter unselected') {
            e.target.className = 'letter selected';
            setChosenLetters((prev) => {
                return [
                    ...prev, 
                    {
                        id: e.target.dataset.id,
                        letter: e.target.dataset.value
                    }
                ]
            });
        } else {
            e.target.className = 'letter unselected';
            setChosenLetters((prev) => {
                return prev.filter(letter => letter.id !== e.target.dataset.id)
            })
        }
    }

    return (
        <div id='letter-container'>
            <ActiveWord chosenLetters={chosenLetters} />
            <div id='letter-grid'>
            {letters.map(letter => {
                return <p className='letter unselected' onClick={onClickHandler} key={letter.id} data-id={letter.id} data-value={letter.letter}>{letter.letter}</p>
            })}
            </div>
        </div>
        
    )
} 

export default LetterGrid;