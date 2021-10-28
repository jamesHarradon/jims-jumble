import React from "react";
import { useState, useEffect } from "react";
import ActiveWord from "../ActiveWord/ActiveWord";
import Letter from "../Letter/Letter";
import { nanoid } from 'nanoid'

const LetterGrid = () => {
    const [ letters, setLetters ] = useState([]);
    const [ selectedLetters, setSelectedLetters ] = useState([]);

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

        letterArray.forEach((letter, ind, arr) => arr.splice(ind, 1, {id: nanoid(), letter: letter, selected: false}));
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
            setSelectedLetters((prev) => {
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
            setSelectedLetters((prev) => {
                return prev.filter(letter => letter.id !== e.target.dataset.id)
            })
        }
    }

    return (
        <div id='letter-container'>
            <ActiveWord selectedLetters={selectedLetters} setSelectedLetters={setSelectedLetters} />
            <div id='letter-grid'>
            {letters.map(letter => {
                return <Letter onClickHandler={onClickHandler} key={letter.id} id={letter.id} value={letter.letter} selected={letter.selected}/>
            })}
            </div>
        </div>
        
    )
} 

export default LetterGrid;