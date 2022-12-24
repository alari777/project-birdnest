import { useState, useEffect } from 'react';
import { FetchResultPilotsType, ViolatorType } from '../types/violators.type';
import TableViolators from '../components/TableViolators';

const Home = () => {
  const [violators, setViolators] = useState<ViolatorType[]>([]);
  const [snapshotTimestamp, setSnapshotTimestamp] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [extendedView, setExtendedView] = useState<boolean>(false);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/drones/`);
      if (response.status === 200) {
        const result: FetchResultPilotsType = await response.json();
        const { pilots, atr_snapshotTimestamp } = result;
        const normalDate = formatTime(atr_snapshotTimestamp);

        setViolators(pilots);
        setSnapshotTimestamp(normalDate);
        setIsLoaded(true);
      }
    } catch (err) {
      setSnapshotTimestamp(String(new Date()));
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
    if (dateTime === '') return '';
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
    return <h1 style={{ color: 'red' }}>Loading ...</h1>
  }

  return (
    <div>
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
    </div>
  )
}

export default Home;
