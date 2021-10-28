import React from "react";

const Letter = (props) => {
    return (
    <p className='letter unselected' onClick={props.onClickHandler} key={props.key} data-id={props.id} data-value={props.value} data-selected={props.selected}>{props.value}</p>
    )
}

export default Letter;