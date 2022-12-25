import { FC } from "react";
import { ViolatorType } from "../types/violators.type";
import { formatTime } from '../pages/utils/formatTime/formatTime';

type TableViolatorsProps = {
    violators: ViolatorType[];
    extendedView: boolean;
}

const TableViolators: FC<TableViolatorsProps> = ({
        violators,
        extendedView
}) => {
    return (
        <table id='listViolators'>
            <thead>
            {extendedView && (
                <>
                    <th data-testid='test-th1'>Time</th>
                    <th data-testid='test-td2'>Pilot id</th>
                </>
            )}
            <th>First Name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Closed distance (in metres)</th>
            {extendedView && (
                <>
                    <th data-testid='test-th3'>Previous closest distance</th>
                </>
            )}
            </thead>
            <tbody>
            {violators.map(violator => <tr key={violator.pilotId}>
                    {extendedView && (
                        <>
                            <td align="center">{formatTime(violator.atr_snapshotTimestamp)}</td>
                            <td align="center">{violator.pilotId}</td>
                        </>
                    )}
                    <td align="center">{violator.firstName}</td>
                    <td align="center">{violator.email}</td>
                    <td align="center">{violator.phoneNumber}</td>
                    <td align="center">{violator.distance}</td>
                    {extendedView && (
                        <>
                            <td align="center">{violator.status} {violator.previousDistance}</td>
                        </>
                    )}
                </tr>
            )}
            </tbody>
        </table>
    )
}

export default TableViolators;
