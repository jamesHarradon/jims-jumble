import React from "react";
import { useState } from "react";

const PlayerTwoWords = (props) => {

    const onClickHandler = (e) => {
        let stolenWordLetterIds = e.target.dataset.letters.filter(letter => letter.id);
        let grid = document.getElementById('letter-grid');
        let letters = grid.querySelectorAll('p.submitted');
        letters.forEach(letter => {
            if(stolenWordLetterIds.find(letter.dataset.id)) {
                letter.className = 'letter stolen'
            } 
        });
        props.words.filter(word => word.word !== e.target.dataset.word);
    } 
    
    return (
        <div className='player'>
            <h1 className={props.isTurn? 'red' : 'grey'}>Player Two</h1>
            <ul>
            {props.words.map(word => {
                return (
                    <li key={word.id} data-letters={word.letters} onClick={onClickHandler}>{word.word}</li>
                )
            })}
            </ul>
        </div>  
    )
}

export default PlayerTwoWords;