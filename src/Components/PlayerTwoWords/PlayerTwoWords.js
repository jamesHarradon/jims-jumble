import React from "react";
import Word from "../Word/Word";

const PlayerTwoWords = (props) => {

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
        <div id='playerTwo' className='player'>
            <ul>
            {props.words.map(word => {
                return (
                    <Word key={word.id} id={word.id} word={word.word} letters={word.letters} onClickHandler={onClickHandler} />    
                )
            })}
            </ul>
            <h1 className={props.isTurn? 'red' : 'grey'}>Player Two</h1>
        </div>  
    )
}

export default PlayerTwoWords;