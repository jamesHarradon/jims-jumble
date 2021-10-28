import React from "react";

const Word = (props) => {
    
    return (
        <li key={props.id} onClick={() => props.onClickHandler(props.letters, props.word)}>{props.word}</li>
    )
}

export default Word;