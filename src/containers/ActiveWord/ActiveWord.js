import React, { useState } from "react";


const ActiveWord = (props) => {
    const [checkedWord, setCheckedWord] = useState('');

    const lettersToWord = (selectedLetters) => {
        let word = [];
        selectedLetters.map(letter => word.push(letter.letter));
        return word.join('');
    }

    const isWord = async () => {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${lettersToWord(props.selectedLetters)}`);
        console.log(response)
        if(response.ok) {
            setCheckedWord(lettersToWord(props.selectedLetters));
        } else {
            alert('Submitted Word Not Found!');
        }
    }

    const onSubmitHandler = () => {
        isWord();  
    }

    const onClearHandler = () => {
        let grid = document.getElementById('letter-grid');
        let letters = grid.querySelectorAll('p.selected');
        console.log(letters)
        letters.forEach(letter => letter.className = 'letter unselected');
        props.setSelectedLetters([]);
    }

    return (
        <div id='word-container'>
            <div id='word-btn-flex'>
                <p id='word'>{lettersToWord(props.selectedLetters)}</p>
                <button id='clear' onClick={onClearHandler}>Clear</button> 
                <button id='submit' onClick={onSubmitHandler}>Submit</button>  
                 
            </div> 
        </div>
    )
}

export default ActiveWord;