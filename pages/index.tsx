import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { FetchResultPilotesType, ViolotarType } from '../types/violators.type';

const Home = () => {  
  const [violators, violatorsSet] = useState<ViolotarType[]>([]);
  const [snapshotTimestamp, snapshotTimestampSet] = useState<string>('');
  const [domLoaded, setDomLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/drones/`);
        if (response.status === 200) {
          const result: FetchResultPilotesType = await response.json();
          const { pilots, atr_snapshotTimestamp } = result;
          const normalDate = formatTime(atr_snapshotTimestamp);
          
          violatorsSet([...pilots, ...violators]);
          snapshotTimestampSet(normalDate);
          setDomLoaded(true);
        }
    }

    fetchData();

    const id = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(id);
  }, [])

  const formatTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    const day: string = date.getDate() < 10 ? `0${date.getDate()}` : String(date.getDate());
    const month: string = date.getMonth() < 10 ? `0${date.getMonth()}` : String(date.getMonth());
    const year: string = String(date.getFullYear());
    const hours: string = date.getHours() < 10 ? `0${date.getHours()}` : String(date.getHours());
    const minutes: string = date.getMinutes() < 10 ? `0${date.getMinutes()}` : String(date.getMinutes());
    const seconds: string = date.getSeconds() < 10 ? `0${date.getSeconds()}` : String(date.getSeconds());
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }

  if (!snapshotTimestamp && !violators) {
    return <h1>Loading ...</h1>
  }
  return (    
    <>
      {domLoaded && (
      <><h3>Current snapshot time: {snapshotTimestamp}</h3><table>
          <thead>
            <th>Time</th>
            <th>Pilot id</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Closed distance (in meteres)</th>
            <th>Previus closest distance</th>
          </thead>
          <tbody>
            {violators.map(violator => <tr key={violator.pilotId}>
              <td align="center">{formatTime(violator.atr_snapshotTimestamp)}</td>
              <td align="center">{violator.pilotId}</td>
              <td align="center">{violator.firstName}</td>
              <td align="center">{violator.email}</td>
              <td align="center">{violator.phoneNumber}</td>
              <td align="center">{violator.distance}</td>
              <td align="center">{violator.status} {violator.previusDistance}</td>
            </tr>
            )}
          </tbody>
        </table></>
      )}
    </>
  )
}

export default Home;
/*
    <>
      <h3>Current snapshot time: {snapshotTimestamp}</h3>
      <div className={styles.wrapper} id='wrapper'>
        <ul id='violatorsList'>
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
*/