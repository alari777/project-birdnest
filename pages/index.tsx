import { useState, useEffect } from 'react';
import { FetchResultPilotesType, ViolotarType } from '../types/violators.type';
import TableViolators from '../components/TableViolators';

const Home = () => {
  const [violators, violatorsSet] = useState<ViolotarType[]>([]);
  const [snapshotTimestamp, snapshotTimestampSet] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [extendedView, setExtendedView] = useState<boolean>(false);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/drones/`);
      if (response.status === 200) {
        const result: FetchResultPilotesType = await response.json();
        const { pilots, atr_snapshotTimestamp } = result;
        const normalDate = formatTime(atr_snapshotTimestamp);

        violatorsSet([...pilots, ...violators]);
        snapshotTimestampSet(normalDate);
        setIsLoaded(true);
      }
    } catch (err) {
      violatorsSet([]);
      snapshotTimestampSet(String(new Date()));
      setIsLoaded(false);
    }
  }

  useEffect(() => {
    fetchData().then();
    const id = setInterval(() => {
      fetchData().then();
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

  const handleExtendedViewChange = () => {
    setExtendedView(!extendedView);
  }

  if (!snapshotTimestamp && !violators) {
    return <h1>Loading ...</h1>
  }

  return (
    <>
      <label>
        <input
            type='checkbox'
            id='extendedView'
            data-testid='test-extendedView'
            name='extendedView'
            onChange={handleExtendedViewChange}
        />
        Extended View
      </label>
      {isLoaded && (
        <>
          <h3>Current snapshot time: {snapshotTimestamp}</h3>
          <TableViolators
              violators={violators}
              extendedView={extendedView}
              formatTime={formatTime}
          />
        </>
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
