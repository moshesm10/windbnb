import React from 'react';
import './HostCard.css'

export const HostCard = (props) => {

    const {title, photo, superHost, rating, type, beds} = props;

    return (
        <div className='host-card'>
            <img className='host-card__img' alt={`image ${title}`} src={photo}></img>
            <div className='host-card__status'>
                {superHost ? <div className='host-card__status-super-host'>Super host</div> : ''}
                <div className='host-card__status-type-and-beds'>{type}{beds ? <span> . {beds} beds</span> : ''}</div>
                <div className='host-card__status-rating'>
                    <svg width="15" height="15" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.00007 14.27L13.1501 16.78C13.9101 17.24 14.8401 16.56 14.6401 15.7L13.5401 10.98L17.2101 7.80001C17.8801 7.22001 17.5201 6.12001 16.6401 6.05001L11.8101 5.64001L9.92007 1.18001C9.58007 0.37001 8.42007 0.37001 8.08007 1.18001L6.19007 5.63001L1.36007 6.04001C0.480073 6.11001 0.120073 7.21001 0.790073 7.79001L4.46007 10.97L3.36007 15.69C3.16007 16.55 4.09007 17.23 4.85007 16.77L9.00007 14.27V14.27Z" fill="#EB5757"/>
                    </svg>
                    <p><span>{rating}</span></p>
                </div>
            </div>
            <h3>{title}</h3>
        </div>
    )
}
