import React from "react";
import Word from "../Word/Word";



const PlayerOneWords = (props) => {

    const onClickHandler = (letters, word) => {
        let grid = document.getElementById('letter-grid');
        let submittedLetters = Array.from(grid.querySelectorAll('p.submitted'));
    
        letters.forEach(letter => {
            if(submittedLetters.some(el => 
                el.dataset.id === letter.id
            )) {
                letter.className = 'letter stolen';
            }
        })

        props.setWords(prev => {
            return prev.filter(el => el.word !== word)
        })

        
    }

    return (
        <div className='player'>
            <h1 className={props.isTurn? 'red' : 'grey'}>Player One</h1>
            <ul>
            {props.words.map(word => {
                return (
                    <Word key={word.id} id={word.id} word={word.word} letters={word.letters} onClickHandler={onClickHandler} />    
                )
            })}
            </ul>
        </div>  
    )
}

export default PlayerOneWords;