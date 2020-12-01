import React, {useEffect} from 'react';
import './SearchPanelBig.css';
import {FilterCity} from '../FilterCity/FilterCity';
import {FilterGuest} from '../FilterGuest/FilterGuest';

export const SearchPanelBig = (props) => {

    const {city, country, guestAdultCounter, guestChildrenCounter,  guestCounter} = props.filters,
          {setFilterCity, setFilterCountry, setGuestCounter, setGuestAdultCounter, setGuestChildrenCounter, showBigSearchPanel} = props,
          {visibleLocationSelector, visibleGuestsSelector, setVisibleLocationSelector, setVisibleGuestsSelector} = props;


    // == location filter styling ==
    const onChecked = (e) => {
        const labels = document.querySelectorAll('label');
        labels.forEach(item => {
            item.classList.remove('checked');
        });

        const input = e.target;
        input.parentNode.classList.add('checked');
        setFilterCity(input.value.split(',')[0]);
        setFilterCountry(input.value.split(',')[1].replace(' ', ''));
    }

    // == guests filter ==

    // guests filter / data logic
    const detectCurrentCounter = (title, operator) => {
        if (operator === 'increment') {
            if (title === 'Adults') {
                setGuestAdultCounter(() => guestAdultCounter + 1);
                setGuestCounter(() => guestCounter + 1);
            }
            if (title === 'Children') {
                setGuestChildrenCounter(() => guestChildrenCounter + 1);
                setGuestCounter(() => guestCounter + 1);
            }
        }
        if (operator === 'decrement') {
            if (title === 'Adults' && guestAdultCounter > 0) {
                setGuestAdultCounter(() => guestAdultCounter - 1);
                setGuestCounter(() => guestCounter - 1);
            }
            if (title === 'Children' && guestChildrenCounter > 0) {
                setGuestChildrenCounter(() => guestChildrenCounter - 1);
                setGuestCounter(() => guestCounter - 1);
            }
        }
    }

    // guests filter / onClick functions
    const incrementGuestCounter = (e) => {
            e.preventDefault();
            detectCurrentCounter(e.target.parentNode.dataset.title, 'increment');
    }
    const decrementGuestCounter = (e) => {
        e.preventDefault();
        if (guestCounter > 0) {
            detectCurrentCounter(e.target.parentNode.dataset.title, 'decrement');
        }
    }

    // == set and display location filter ==
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

    // == onClick show/hide functions ==

    // onClick show/hide functions / showBigSearchPanel and update state
    const onClickHandler = (e) => {
        showBigSearchPanel(e);
        setGuestCounter(() => guestCounter);
    }

    // onClick show/hide functions / show active inputs and update visible state
    const setActiveInput = (e) => {
        if (e.target.name === 'location') {
            setVisibleGuestsSelector(false);
            setVisibleLocationSelector(true);
        } 

        if (e.target.name === 'guests') {
            setVisibleLocationSelector(false);
            setVisibleGuestsSelector(true);
        } 

        document.querySelectorAll('input[type="text"]').forEach(item => {
            item.classList.remove('active-input');
        });
        e.target.classList.add('active-input');
    };

    // onClick show/hide functions / show FilterGuest component
    const guestsContent = () => {
        if (visibleGuestsSelector) {
            return (
                <>
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
                </>
            );
        } else {
            return '';
        }
    } 

    // == show active input on loaded ==
    useEffect(() => {
        if (visibleLocationSelector) {
            document.querySelector('input[name="location"]').classList.add('active-input');
        }
        if (visibleGuestsSelector) {
            document.querySelector('input[name="guests"]').classList.add('active-input');
        }
    }); 

    return (
        <form id='filter-form'>
            <div className='search-panel-big'>
                <div className='input-wrapper'>
                    <div className='mobile-description'>
                        <div>Edit your search</div>
                        <div className='close-button' onClick={onClickHandler}>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.1875 1.74688L10.4406 0L6.09375 4.34687L1.74688 0L0 1.74688L4.34687 6.09375L0 10.4406L1.74688 12.1875L6.09375 7.84062L10.4406 12.1875L12.1875 10.4406L7.84062 6.09375L12.1875 1.74688Z" fill="#4D5357"/>
                            </svg>
                        </div>
                    </div>
                    <div className='search-panel-big__location'>
                        <label className='search-panel-big__location-label'>location</label>
                        <input name='location' onClick={setActiveInput} readOnly type='text' className='search-panel-big__location-input' value={city || country ? `${city}, ${country}` : 'Add location'} />
                    </div>
                    <div className='search-panel-big__guests'>
                        <label className='search-panel-big__guests-label'>Guests</label>
                        <input name='guests' onClick={setActiveInput} readOnly type='text' className='search-panel-big__guests-input' value={guestCounter < 1 ? 'Add guest' : guestCounter} />
                    </div>
                    <div className='button-wrapper'>
                        <button 
                        onClick={(e) => onClickHandler(e)} 
                        type="button" 
                        className='search-panel-big__button'>
                            <svg width="17" height="17" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 11H11.71L11.43 10.73C12.4439 9.55402 13.0011 8.0527 13 6.5C13 5.21442 12.6188 3.95772 11.9046 2.8888C11.1903 1.81988 10.1752 0.986756 8.98744 0.494786C7.79973 0.00281635 6.49279 -0.125905 5.23192 0.124899C3.97104 0.375703 2.81285 0.994767 1.90381 1.90381C0.994767 2.81285 0.375703 3.97104 0.124899 5.23192C-0.125905 6.49279 0.00281635 7.79973 0.494786 8.98744C0.986756 10.1752 1.81988 11.1903 2.8888 11.9046C3.95772 12.6188 5.21442 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11V11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#ffffff"/>
                            </svg>
                            Search
                        </button>
                    </div>
                </div>
                <div className='selector-wrapper'>
                    <div className='search-panel-big__location'>
                        {visibleLocationSelector ? arr : <div className='filter-city'></div>}
                    </div>
                    <div className='search-panel-big__guests'>
                        {guestsContent()}
                    </div>
                </div>
            </div>
        </form>
        
    )
}
