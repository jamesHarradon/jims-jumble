import React, { useEffect, useState } from "react";
import PlayerOneWords from "../../Components/PlayerOneWords/PlayerOneWords";
import PlayerTwoWords from "../../Components/PlayerTwoWords/PlayerTwoWords";
import { nanoid } from 'nanoid';


const ActiveWord = (props) => {
    const [playerOneWords, setPlayerOneWords] = useState([]);
    const [playerTwoWords, setPlayerTwoWords] = useState([]);
    const [player, setPlayer] = useState('Player1');

    const lettersToWord = (selectedLetters) => {
        let word = [];
        selectedLetters.map(letter => word.push(letter.letter));
        return word.join('');
    }

    const onClearHandler = () => {
        let grid = document.getElementById('letter-grid');
        let letters = grid.querySelectorAll('p.selected');
        letters.forEach(letter => letter.className = 'letter unselected');
        props.setSelectedLetters([]);
    }

    const isWord = async(word) => {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (response.ok) {
            if (player === 'Player1') {
                setPlayerOneWords(prev => [...prev, {id: nanoid(), word: word, letters: props.selectedLetters}]);
                hideSubmitted();
                props.setSelectedLetters([]);
                
            } else {
                setPlayerTwoWords(prev => [...prev, {id: nanoid(), word: word, letters: props.selectedLetters}]);
                hideSubmitted();
                props.setSelectedLetters([]);  
            }
        } else {
            alert('Submitted Word Not Found!');
                onClearHandler();
        }
        setPlayer(player === 'Player1' ? 'Player2': 'Player1');
    }

    const hideSubmitted = () => {
        let grid = document.getElementById('letter-grid');
        let letters = grid.querySelectorAll('p.selected');
        letters.forEach(letter => letter.className = 'letter submitted');
    }

    const onSubmitHandler = () => {
        let wordToSubmit = lettersToWord(props.selectedLetters);
        isWord(wordToSubmit);
    }


    return (
        <div id='word-container'>
            <div id='top-section' >
                <PlayerOneWords words={playerOneWords} setWords={setPlayerOneWords} isTurn={player === 'Player1' ? true : false}/>
                <div id='word-btn-flex'>
                    <p id='word' data-testid='word'>{lettersToWord(props.selectedLetters)}</p>
                    <button id='clear' onClick={onClearHandler}>Clear</button> 
                    <button id='submit' onClick={onSubmitHandler}>Submit</button>
                </div> 
                <PlayerTwoWords words={playerTwoWords} setWords={setPlayerTwoWords} isTurn={player === 'Player2' ? true : false}/> 
            </div> 
        </div>
    )
}

export default ActiveWord;