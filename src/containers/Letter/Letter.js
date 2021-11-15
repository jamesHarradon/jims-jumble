import React, { useEffect, useState } from "react";


const Letter = ({selectedLetters, setSelectedLetters, key, id, value }) => {

    const whichClass = (el, name) => {
        if(name === 'letter unselected') {
            el.className = 'letter revealed';
            return;
        } else if(name === 'letter revealed' || name === 'letter stolen') {
            el.className = 'letter selected';
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
            el.className = 'letter revealed';
            setSelectedLetters(prev => {
                return prev.filter(letter => letter.id !== id)
            })
        }
    }
    
    const onClickHandler = (e) => {
        console.log(e.target);
        let target = e.target;
        if(e.target.nodeName === 'P') {
            target = e.target.parentNode;
        } 
        
        whichClass(target, target.className);  
    }

   
    return (
        <div className='letter unselected' key={id} data-id={id} onClick={onClickHandler} data-value={value}>
            <p>{value}</p>
        </div>
    
    )
}

export default Letter;