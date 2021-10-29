import React, { useEffect, useState } from "react";


const Letter = ({selectedLetters, setSelectedLetters, key, id, value }) => {

    const [classNames, setClassNames] = useState('letter unselected');
    //const [clickCount, setClickCount] = useState(0);
    let count = 0;
    
    
    const onClickHandler = () => {
        //setClickCount(prev => prev++);
        count++;
        if(count === 1) {
            setClassNames('letter preselected');
            return;
        } else if(count === 2) {
            setClassNames('letter selected');
            if(selectedLetters.some(el => el.id === id)) {
                return;
            }
            setSelectedLetters((prev) => {
                return [
                    ...prev, 
                    {
                        id: id,
                        letter: value
                    }
                ]
            });
        }else {
            count = 0;
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