import React from "react";
import Word from "../Word/Word";

const PlayerTwoWords = (props) => {

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
        <div id='playerTwo' className='player'>
            <ul>
            {props.words.map(word => {
                return (
                    <Word key={word.id} id={word.id} word={word.word} letters={word.letters} onClickHandler={onClickHandler} />    
                )
            })}
            </ul>
            <div className='player-flex'>
                <h1 className={props.isTurn? 'active' : 'inactive'} onClick={() => props.changePlayer('Player2')}>Player Two</h1>
                <p className='score'>{props.words.length}</p>
            </div>
        </div>  
    )
}

export default PlayerTwoWords;