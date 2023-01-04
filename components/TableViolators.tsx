import { FC } from 'react';
import { ViolatorType } from '../types/violators.type';
import { formatTime } from '../utils/formatTime/formatTime';

type TableViolatorsProps = {
  violators: ViolatorType[];
  extendedView: boolean;
};

const TableViolators: FC<TableViolatorsProps> = ({
  violators,
  extendedView,
}) => {
  return (
    <table id='listViolators'>
      <thead>
        <tr>
          {extendedView && (
            <>
              <th data-testid='test-th1'>#</th>
              <th data-testid='test-th2'>Time</th>
              <th data-testid='test-td3'>Pilot id</th>
            </>
          )}
          <th>First Name</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Closest distance (in meters)</th>
          {extendedView && (
            <>
              <th data-testid='test-th4'>Previous closest distance</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {violators.map((violator, index) => (
          <tr key={violator.pilotId}>
            {extendedView && (
              <>
                <td align='center'>{index + 1}</td>
                <td align='center'>
                  {formatTime(violator.atr_snapshotTimestamp)}
                </td>
                <td align='center'>{violator.pilotId}</td>
              </>
            )}
            <td align='center'>{violator.firstName}</td>
            <td align='center'>{violator.email}</td>
            <td align='center'>{violator.phoneNumber}</td>
            <td align='center'>{violator.distance}</td>
            {extendedView && (
              <>
                <td align='center'>
                  {violator.status} {violator.previousDistance}
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableViolators;
