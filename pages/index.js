import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const formatTime = (dateTime) => {
  const date = new Date(dateTime);
  const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

const Index = () => {  
  const [violators, violatorsSet] = useState([]);
  const [snapshotTimestamp, snapshotTimestampSet] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/drones/`);
      const result = await response.json();

      const { pilots, atr_snapshotTimestamp } = result;

      const newViolators = violators.filter(violator => {
        if (!pilots.includes(violator)) {
          return violator;
        }
      });

      violatorsSet([...pilots, ...violators]);
      const normalDate = formatTime(atr_snapshotTimestamp);
      snapshotTimestampSet(normalDate);
    }

    fetchData();

    const id = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(id);
  }, [])

  return (    
    <>
    <h3>Current snapshot time: {snapshotTimestamp}</h3>
    <div className={styles.wrapper}>
      <ul>
        {violators.map(violator => 
          <li key={violator.pilotId}>
            <ul className={styles.listViolators}>
              <li className={styles.firstName}>{violator.pilotId}: {violator.firstName} ({formatTime(violator.atr_snapshotTimestamp)}); 
              {violator.email}; 
              {violator.phoneNumber}; 
              Closest confirmed distance to the nest is {violator.distance} metres <sup>{violator.status} {violator.previusDistance}</sup></li>
            </ul>
          </li>    
        )}
      </ul>
    </div>
    </>
  )
}

export default Index;
