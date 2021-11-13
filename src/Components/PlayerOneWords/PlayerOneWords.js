import React from "react";
import Word from "../Word/Word";



const PlayerOneWords = (props) => {

    const onClickHandler = (letters, word) => {
        
        let grid = document.getElementById('letter-grid');
        let letterIds = letters.map(el => el.id);
        let submittedLetters = Array.from(grid.querySelectorAll('div.submitted'));

        submittedLetters.forEach(letter => {
            if (letterIds.includes(letter.dataset.id)) {
                letter.className = 'letter stolen';
            } 
        });

        props.setWords(prev => {
            return prev.filter(el => el.word !== word)
        })  
    }

    return (
        <div id='playerOne' className='player'>
            <h1 className={props.isTurn? 'active' : 'inactive'}>Player One</h1>
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