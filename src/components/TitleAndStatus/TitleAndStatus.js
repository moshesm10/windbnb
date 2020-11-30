import React from 'react';
import './TitleAndStatus.css';

export const TitleAndStatus = (props) => {
    const {numOfStays} = props;
    console.log('numOfStays', numOfStays);

    const content = () => {
        let num = 0;
        let word = 'stays';

        if (numOfStays) {
            if (numOfStays <= 12) {
                num = numOfStays;
            }
            else {
                num = '12+';
            }

            if (numOfStays === 1) {
                word = 'stay';
            }
        }
        return  (`${num} ${word}`)
    }

    return (
        <div className='title-and-status'>
            <h1>Stays in Finland</h1>
            <p>{content()}</p>
        </div>
    )
}
