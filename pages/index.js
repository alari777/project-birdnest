import { useState, useEffect } from 'react';

const Home = () => {  
  const [violators, violatorsSet] = useState([]);
  const [snapshotTimestamp, snapshotTimestampSet] = useState()

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch('/api/drone');
      response = await response.json();

      const { pilots, atr_snapshotTimestamp } = response;

      const newViolators = violators.filter(violator => {
        if (!pilots.includes(violator)) {
          return violator;
        }
      });

      violatorsSet([...pilots, ...violators]);
      snapshotTimestampSet(atr_snapshotTimestamp);
    }

    fetchData();

    const id = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(id);
  }, [])

  return (    
    <div>
      <h3>Current snapshot time: {snapshotTimestamp}</h3>
      <ul>
        {violators.map(violator => 
          <li key={violator.pilotId}>{violator.pilotId} : {violator.firstName} {violator.lastName} {violator.atr_snapshotTimestamp}</li>
        )}
      </ul>
    </div>
  )
}

export default Home;
