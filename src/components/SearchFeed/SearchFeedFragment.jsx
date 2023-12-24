import React, {useEffect} from 'react'
import SearchFeed from './SearchFeed';
import localforage from 'localforage';

export default function SearchFeedFragment() {

    useEffect(() => {
        const fetchUserData = async () => {
          const userData = await localforage.getItem('userData');
          if (userData) {
          }
        };
    
        fetchUserData();
      }, []);
  return (
    <div className='searchfeed-fragment-container'>
    <SearchFeed />
  </div>
  )
}
