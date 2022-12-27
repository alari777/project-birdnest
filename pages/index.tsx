import { useState, useEffect } from 'react';
import { FetchResultPilotsType, ViolatorType } from '../types/violators.type';
import TableViolators from '../components/TableViolators';
import { formatTime } from '../utils/formatTime/formatTime';

const Home = () => {
  const [violators, setViolators] = useState<ViolatorType[]>([]);
  const [snapshotTimestamp, setSnapshotTimestamp] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [extendedView, setExtendedView] = useState<boolean>(false);

  const fetchData = (): void => {
    const idSetTimeout = setTimeout(async () => {
      try {
        const response = await fetch('/api/drones/');
        if (response.status === 200) {
          const result: FetchResultPilotsType = await response.json();
          const { pilots, atr_snapshotTimestamp } = result;
          if (pilots.length !== 0) {
            const normalDate = formatTime(atr_snapshotTimestamp);

            setViolators(pilots);
            setSnapshotTimestamp(normalDate);
          }
          setIsLoaded(true);
        }
      } catch (err) {
        setIsLoaded(false);
      } finally {
        clearInterval(idSetTimeout);
        fetchData();
      }
    }, 2000);
  }
  /*const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch('/api/drones/');
      if (response.status === 200) {
        const result: FetchResultPilotsType = await response.json();
        const { pilots, atr_snapshotTimestamp } = result;
        if (pilots.length !== 0) {
          const normalDate = formatTime(atr_snapshotTimestamp);

          setViolators(pilots);
          setSnapshotTimestamp(normalDate);
        }
        setIsLoaded(true);
      }
    } catch (err) {
      // setSnapshotTimestamp(String(new Date()));
      setIsLoaded(false);
    }
  }*/

  useEffect(() => {
    fetchData();
    // fetchData().then();
    // const id = setInterval(() => {
    //   fetchData().then();
    // }, 5000);

    // return () => clearInterval(id);
  }, []);

  const handleExtendedViewChange = () => {
    setExtendedView(!extendedView);
  }

  if (!isLoaded) {
    return <h2>Wait a little bit, please. Data are loading ...</h2>
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
          <h3 data-testid='snapshot-time'>Current snapshot time: {snapshotTimestamp}</h3>
          <TableViolators
              violators={violators}
              extendedView={extendedView}
          />
        </>
      )}
    </div>
  )
}

export default Home;
