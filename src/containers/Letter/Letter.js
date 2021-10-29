import React, { useEffect, useState } from "react";


const Letter = ({setSelectedLetters, key, id, value }) => {

    const [classNames, setClassNames] = useState('letter unselected');

    const onClickHandler = () => {
        if (classNames === 'letter unselected') {
            setClassNames('letter selected');
            setSelectedLetters((prev) => {
                return [
                    ...prev, 
                    {
                        id: id,
                        letter: value
                    }
                ]
            });
        } else {
            setClassNames('letter unselected');
            setSelectedLetters(prev => {
                return prev.filter(letter => letter.id !== id)
            })
        }
    }

    
    
    return (
    <p className={classNames} key={id} data-id={id} onClick={onClickHandler} data-value={value}>{value}</p>
    )
}

export default Letter;