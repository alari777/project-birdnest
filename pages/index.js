import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { useState, useEffect } from 'react';
// const testFetch = async () => await (await fetch('http://localhost:3000/api/hello')).json();

const Home = () => {  
  /*
  const { data } = useQuery('arrtest', testFetch, { refetchInterval: 2000 });

  if (!data && data.violators.length > 0) {
    return (
      <div>No data!</div>
    )
  }
  */

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

      /*
      const newNewViolators = newViolators.filter(violator => {
        const subtractDatetime = (new Date() - new Date(violator.atr_snapshotTimestamp)) / 1000 / 60;
        if (subtractDatetime < 10) {
          return violator;
        }
      });
      */

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

/*
export async function getServerSideProps(context) {
  const queryClient = new QueryClient();

  const result = await queryClient.prefetchQuery('arrtest', testFetch);

  console.log('hello');

  return {
    props: { dehydratedState: dehydrate(queryClient) }
  } 
}
*/

/*
export async function getStaticProps(context) {
  const response = await fetch('https://assignments.reaktor.com/birdnest/drones');
  const result = await response.text();

  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: 'atr_',
  };

  const parser = new XMLParser(options);
  const drones = parser.parse(result);

  let violators = [];
  // if (jObj.report.capture.drone.lenght > 0) {
  console.log(drones.report.capture.atr_snapshotTimestamp);

  violators = drones.report.capture.drone.filter((dron) => {
    const hypot = Math.sqrt(
      Math.pow(250 * 100 * 10 - dron.positionX, 2) +
        Math.pow(250 * 100 * 10 - dron.positionY, 2),
    );
    if (hypot < 100 * 100 * 10) {
      return dron;
    }
  });
  // console.log(violators);
  return {
    props: { violators }, // will be passed to the page component as props
  }
}
*/