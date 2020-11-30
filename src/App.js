import {useEffect, useState} from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {TitleAndStatus} from './components/TitleAndStatus/TitleAndStatus';
import {SearchPanelBig} from './components/SearchPanelBig/SearchPanelBig';
import {HostCard} from './components/HostCard/HostCard';

function App() {

  // == States ==

  // Data states
  const [data, setData] = useState(false),
        [filtredData, setFiltredData] = useState(false);

  // Visible states
  const [visibleBigSearchPanel, setVisibleBigSearchPanel] = useState(false),
        [visibleLocationSelector, setVisibleLocationSelector] = useState(false),
        [visibleGuestsSelector, setVisibleGuestsSelector] = useState(false);
  

  // Filters states
  const [filterCity, setFilterCity] = useState(''),
        [filterCountry, setFilterCountry] = useState(''),
        [guestAdultCounter, setGuestAdultCounter] = useState(0),
        [guestChildrenCounter, setGuestChildrenCounter] = useState(0),
        [guestCounter, setGuestCounter] = useState(0);


  // == Download data ==
  useEffect(() => {
    fetch("./stays.json")
      .then(res => res.json())
      .then(
        (result) => {
          setData(result);
          setFiltredData(result);
        },
        (error) => {
          alert(error);
        }
      )
  }, []);

  // == Set filtered data ==
  useEffect(() => {
    if (data) {  
      let arrData = [];

      data.forEach((item) => {
        if (item.city === filterCity && item.maxGuests >= guestCounter) {
          arrData.push(item);
        }
      });

      setFiltredData(() => arrData);
      
       if (arrData.length < 1) {
        setFiltredData(() => false);
      }
    }
  }, [filterCity, guestCounter]); 

  // == OnClick show/hide function ==
  const showBigSearchPanel = (e) => {
    e.preventDefault();
    let overflow = document.querySelector('body');
    if (overflow.style.overflow === 'hidden') {
      overflow.style.overflow = '';
    } else {
      overflow.style.overflow = 'hidden';
    }
    setVisibleBigSearchPanel(() => !visibleBigSearchPanel)
  };

  /*
  const statusMessage = () => {
    if (error) {
      return error;
    }
    if (filtredData < 1) {
      return '';
    }
    if (isLoaded === false) {
      return 'Loading...';
    }
  }
  */
 
  // == Filter object  ==
  const filters = {
    city: filterCity,
    country: filterCountry,
    guestCounter: guestCounter,
    guestAdultCounter: guestAdultCounter,
    guestChildrenCounter: guestChildrenCounter
  }

  return (
    <>
      {visibleBigSearchPanel ? 
        <div className='form-wrapper'>
          <SearchPanelBig 
            filters={filters} 
            setFilterCity={setFilterCity}
            setFilterCountry={setFilterCountry}
            setGuestCounter={setGuestCounter}
            setGuestAdultCounter={setGuestAdultCounter}
            setGuestChildrenCounter={setGuestChildrenCounter}
            showBigSearchPanel={showBigSearchPanel}
            visibleLocationSelector={visibleLocationSelector}
            visibleGuestsSelector={visibleGuestsSelector}
            setVisibleLocationSelector={setVisibleLocationSelector}
            setVisibleGuestsSelector={setVisibleGuestsSelector}/> 
        </div> : ''}
      <div className='container'>
        <Header filters={filters} setVisibleLocationSelector={setVisibleLocationSelector} setVisibleGuestsSelector={setVisibleGuestsSelector} showBigSearchPanel={showBigSearchPanel} />
        <TitleAndStatus numOfStays={filtredData.length} />
        <section className='host-cards'>
          {filtredData ? filtredData.map((item, i) => <HostCard key={i} title={item.title} photo={item.photo}superHost={item.superHost}rating={item.rating}type={item.type}beds={item.beds}/>) : <h1 style={{margin: '25vh auto', color: '#dddddd'}}>No such data exist</h1>}
        </section>
      </div>
    </>
  );
}

export default App;
