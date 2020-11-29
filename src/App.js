import {useEffect, useState} from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {TitleAndStatus} from './components/TitleAndStatus/TitleAndStatus';
import {SearchPanelBig} from './components/SearchPanelBig/SearchPanelBig';
import {HostCard} from './components/HostCard/HostCard';

function App() {

  // Data
  const [data, setData] = useState(false);
  const [filtredData, setFiltredData] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Visible
  const [visibleBigSearchPanel, setVisibleBigSearchPanel] = useState(false);

  // Filters
  const [filterCity, setFilterCity] = useState('Helsinki');
  const [filterCountry, setFilterCountry] = useState('Finland');
  //const [guestAdultCounter, setGuestAdultCounter] = useState(0);
  //const [guestChildrenCounter, setGuestChildrenCounter] = useState(0);
  //const [guestCounter, setGuestCounter] = useState(0);

  const [filterNumOfGuest, setFilterNumOfGuest] = useState(0);



    useEffect(() => {
      fetch("./stays.json")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setData(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, []);

    useEffect(() => {
      if (data) {  
        console.log(data);
      let arrData = [];
        data.forEach((item) => {
          if (item.city === filterCity && item.maxGuests >= filterNumOfGuest) {
            arrData.push(item);
          }
        });
        setFiltredData(() => arrData);
        
      }
    }, [filterCity, filterNumOfGuest])

  const showBigSearchPanel = (e) => {
    e.preventDefault();
    setVisibleBigSearchPanel(() => !visibleBigSearchPanel)
  };

  
  const filters = {
    city: filterCity,
    country: filterCountry,
    numOfGuest: filterNumOfGuest
  }

  const getFilters = (filters) => {
    setFilterCity(() => filters.city);
    setFilterCountry(() => filters.country);
    setFilterNumOfGuest(() => filters.numOfGuest);
  };



  return (
    <div className='container'>
      {visibleBigSearchPanel ? <SearchPanelBig getFilters={getFilters} showBigSearchPanel={showBigSearchPanel}/> : ''}
      <Header filters={filters} showBigSearchPanel={showBigSearchPanel}/>
      <TitleAndStatus  />
      <section className='host-cards'>
        {
        filtredData ? filtredData.map((item, i) => <HostCard key={i} title={item.title} photo={item.photo}/>) : ''
        }
      </section>
    </div>
  );
}

export default App;
