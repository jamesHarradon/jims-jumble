import React, { useState } from "react";


const Letter = (props) => {

    const [classNames, setClassNames] = useState('letter unselected');
    

    const onClickHandler = () => {
        if (classNames === 'letter unselected') {
            setClassNames('letter selected');
            props.setSelectedLetters((prev) => {
                return [
                    ...prev, 
                    {
                        id: props.id,
                        letter: props.value
                    }
                ]
            });
        } else {
            setClassNames('letter unselected');
            props.setSelectedLetters(prev => {
                return prev.filter(letter => letter.id !== props.id)
            })
        }
    }
    
    return (
    <p className={classNames} key={props.id} data-id={props.id} onClick={onClickHandler} data-value={props.value}>{props.value}</p>
    )
}

export default Letter;