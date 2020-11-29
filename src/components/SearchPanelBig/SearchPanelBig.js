import React, { useState } from 'react';
import './SearchPanelBig.css';
import {FilterCity} from '../FilterCity/FilterCity';
import {FilterGuest} from '../FilterGuest/FilterGuest';

export const SearchPanelBig = (props) => {
    
    const [location, setLocation] = useState('Helsinki, Finland');
    const [guestCounter, setGuestCounter] = useState(0);
    const [guestAdultCounter, setGuestAdultCounter] = useState(0);
    const [guestChildrenCounter, setGuestChildrenCounter] = useState(0);

    //const {city, country, guestAdultCounter, guestChildrenCounter, guestCounter} = props.filters

    
    const filters = {
        city: location.split(',')[0],
        country: location.split(',')[1],
        numOfGuest: guestCounter
    }
    

    const onChecked = (e) => {
        //e.target.setAttribute('checked', true);
        setLocation(e.target.value);
    }

    const detectCurrentCounter = (title, operator) => {
        if (operator === 'increment') {
            if (title === 'Adults') {
                setGuestAdultCounter(() => guestAdultCounter + 1);
            }
            if (title === 'Children') {
                setGuestChildrenCounter(() => guestChildrenCounter + 1);
            }
        }
        if (operator === 'decrement') {
            if (title === 'Adults' && guestAdultCounter > 0) {
                setGuestAdultCounter(() => guestAdultCounter - 1);
            }
            if (title === 'Children' && guestChildrenCounter > 0) {
                setGuestChildrenCounter(() => guestChildrenCounter - 1);
            }
        }
    }

    const incrementGuestCounter = (e) => {
            e.preventDefault();
            detectCurrentCounter(e.target.parentNode.dataset.title, 'increment');
            setGuestCounter(() => guestCounter + 1);
    }
    const decrementGuestCounter = (e) => {
        e.preventDefault();
        if (guestCounter > 0) {
            detectCurrentCounter(e.target.parentNode.dataset.title, 'decrement');
            setGuestCounter(() => guestCounter - 1);
        }
    }

    const arr = [];
    const data = [
        {
            city: 'Helsinki',
            country: 'Finland'
        },
        {
            city: 'Vaasa',
            country: 'Finland'
        },
        {
            city: 'Oulu',
            country: 'Finland'
        },
        {
            city: 'Turku',
            country: 'Finland'
        }
    ];

    data.forEach((item, i) => {
        arr.push(<FilterCity city={item.city} country={item.country} key={i} checked={onChecked} />)
    });

    const onClickHandler = (e) => {
        props.showBigSearchPanel(e);
        props.getFilters(filters);
    }

    return (
        <form id='filter-form'>
            <div className='search-panel-big'>
                <div className='search-panel-big__location'>
                    <label className='search-panel-big__location-label'>location</label>
                    <input readOnly type='text' className='search-panel-big__location-input' value={location} />
                    {arr}
                </div>
                <div className='search-panel-big__guests'>
                    <label className='search-panel-big__guests-label'>Guests</label>
                    <input readOnly type='text' name='guests' className='search-panel-big__guests-input' value={guestCounter < 1 ? 'Add guest' : guestCounter} />
                    <FilterGuest 
                        title='Adults' 
                        subTitle='Ages 13 or above'
                        increment={incrementGuestCounter}
                        decrement={decrementGuestCounter}
                        guestCounter={guestAdultCounter}/>
                    <FilterGuest 
                        title='Children' 
                        subTitle='Ages 2-12'
                        increment={incrementGuestCounter}
                        decrement={decrementGuestCounter}
                        guestCounter={guestChildrenCounter}/>
                </div>
                <div className='button-wrapper'>
                    <button 
                    onClick={(e) => onClickHandler(e)} 
                    type="button" className='search-panel-big__button'>
                        <svg width="17" height="17" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 11H11.71L11.43 10.73C12.4439 9.55402 13.0011 8.0527 13 6.5C13 5.21442 12.6188 3.95772 11.9046 2.8888C11.1903 1.81988 10.1752 0.986756 8.98744 0.494786C7.79973 0.00281635 6.49279 -0.125905 5.23192 0.124899C3.97104 0.375703 2.81285 0.994767 1.90381 1.90381C0.994767 2.81285 0.375703 3.97104 0.124899 5.23192C-0.125905 6.49279 0.00281635 7.79973 0.494786 8.98744C0.986756 10.1752 1.81988 11.1903 2.8888 11.9046C3.95772 12.6188 5.21442 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11V11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#ffffff"/>
                        </svg>
                        Search
                    </button>
                </div>
            </div>
        </form>
        
    )
}
