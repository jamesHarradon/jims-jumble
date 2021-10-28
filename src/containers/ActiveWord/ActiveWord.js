import React, { useState } from "react";


const ActiveWord = ({selectedLetters}) => {
    const [checkedWord, setCheckedWord] = useState('');

    const lettersToWord = (selectedLetters) => {
        let word = [];
        selectedLetters.map(letter => word.push(letter.letter));
        return word.join('');
    }

    const isWord = async () => {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${lettersToWord(selectedLetters)}`);
        console.log(response)
        if(response.ok) {
            setCheckedWord(lettersToWord(selectedLetters));
        } else {
            alert('Submitted Word Not Found!');
        }
    }

    const onSubmitHandler = () => {
        isWord();  
    }

    const onClearHandler = () => {
        selectedLetters.map(letter => letter)
    }

    return (
        <div id='word-container'>
            <div id='word-btn-flex'>
                <p id='word'>{lettersToWord(selectedLetters)}</p>
                <button id='clear' onClick={onClearHandler}>Clear</button> 
                <button id='submit' onClick={onSubmitHandler}>Submit</button>  
                 
            </div> 
        </div>
    )
}

export default ActiveWord;