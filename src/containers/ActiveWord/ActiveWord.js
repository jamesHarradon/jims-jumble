import React, { useState } from "react";
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
        let letters = grid.querySelectorAll('div.selected');
        letters.forEach(letter => letter.className = 'letter revealed');
        props.setSelectedLetters([]);
        
    }

    const isWord = async(word) => {
        const response = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_WORDS_CLIENT_ID
            }
        });
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
    }

    const hideSubmitted = () => {
        let grid = document.getElementById('letter-grid');
        let letters = grid.querySelectorAll('div.selected');
        letters.forEach(letter => letter.className = 'letter submitted');
    }

    const onSubmitHandler = (e) => {
        if(props.selectedLetters.length === 0) {
            return;
        }
        let wordToSubmit = lettersToWord(props.selectedLetters);
        isWord(wordToSubmit);
    }

    const changePlayerHandler = (player) => {
        setPlayer(player);
    }


    return (
        <div id='word-container'>
            <div id='top-section' >
                <PlayerOneWords changePlayer={changePlayerHandler} words={playerOneWords} setWords={setPlayerOneWords} isTurn={player === 'Player1' ? true : false}/>
                <div id='word-btn-flex'>
                    <p id='word' data-testid='word'>{lettersToWord(props.selectedLetters)}</p>
                    <button id='clear' onClick={onClearHandler}>Clear</button> 
                    <button id='submit' onClick={onSubmitHandler}>Submit</button>
                    <div id='instructions'>
                        <h3>Instructions:</h3><br></br>
                        <ul>
                            <li>Each player takes turns to reveal a letter from the grid.</li>
                            <li>When a player thinks they can make a word, they click on their designated player number, select their letters and submit the word.</li>
                            <li>Players can steal a word from the other player if they think they can make a better word out of it and the letters available by clicking on it and using the stolen letters in their new word.</li>
                        </ul> 
                    </div>
                </div> 
                <PlayerTwoWords changePlayer={changePlayerHandler} words={playerTwoWords} setWords={setPlayerTwoWords} isTurn={player === 'Player2' ? true : false}/> 
            </div> 
        </div>
    )
}

export default ActiveWord;