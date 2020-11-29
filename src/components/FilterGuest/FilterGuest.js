import React from 'react';
import './FilterGuest.css';

export const FilterGuest = (props) => {

    const {title, subTitle, increment, decrement, guestCounter} = props;

    return (
        <div className='filter-guest'>
            <div className='filter-guest__title'>{title}</div>
            <div className='filter-guest__subtitle'>{subTitle}</div>
            <div data-title={title} className='filter-guest__counter'>
                <button onClick={decrement} className='filter-guest__counter-decrement'>–</button>
                <span className='filter-guest__counter-counter'>{guestCounter}</span>
                <button onClick={increment} className='filter-guest__counter-increment'>+</button>
            </div>
        </div>
    )
}
