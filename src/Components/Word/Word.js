import React from "react";

const Word = (props) => {
    
    return (
        <li key={props.id} data-word={props.word} onClick={() => props.onClickHandler(props.letters, props.word)}>{props.word}</li>
    )
}

export default Word;