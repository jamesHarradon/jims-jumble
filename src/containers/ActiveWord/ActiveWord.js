import React, { useState } from "react";


const ActiveWord = ({chosenLetters}) => {
    const [checkedWord, setCheckedWord] = useState('');

    const lettersToWord = (chosenLetters) => {
        let word = [];
        chosenLetters.map(letter => word.push(letter.letter));
        return word.join('');
    }

    const isWord = async () => {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${lettersToWord(chosenLetters)}`);
        console.log(response)
        if(response.ok) {
            setCheckedWord(lettersToWord(chosenLetters));
        } else {
            alert('Submitted Word Not Found!');
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        isWord();  
    }

    return (
        <div id='word-container'>
            <div id='word-btn-flex'>
                <p id='word'>{lettersToWord(chosenLetters)}</p>
                <button onClick={onSubmitHandler}>Submit</button>  
            </div> 
        </div>
    )
}

export default ActiveWord;