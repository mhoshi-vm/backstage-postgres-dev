import React from 'react';
import { StatusError, StatusOK, StatusPending, StatusRunning } from '@backstage/core-components';
// eslint-disable-next-line  no-restricted-imports
import { TableRow, TableCell } from '@material-ui/core';
/* ignore lint error for internal dependencies */
/* eslint-disable */
import {Postgres, ServiceBinding} from '../../types';

/* eslint-enable */


function StatusComponent(props: { currentState: string; }): JSX.Element {
  if (props.currentState !== undefined) {
    if (props.currentState === 'Created') {
      return <StatusPending />;
    } else
    if (props.currentState === 'Running') {
      return <StatusRunning />;
    } else
    if (props.currentState === 'Completed') {
      return <StatusOK />;
    } else
    if (props.currentState === 'Succeeded') {
      return <StatusOK />;
    } else
    if (props.currentState === 'Failed') {
      return <StatusError />;
    } else
    if (props.currentState === 'Error') {
      return <StatusError />;
    }
  } else {
    return <StatusPending />;
  }
  return <StatusPending />;

}



export function CollapsibleTableRow(props: { clusterName: string, postgres: Postgres, serviceBinding: ServiceBinding }) {
  const { clusterName , postgres } = props;

  return (
      <React.Fragment>
        <TableRow>
          <TableCell component="th" scope="row">
            {clusterName}
          </TableCell>
          <TableCell component="th" scope="row">
            {postgres.metadata.name}
          </TableCell>
          <TableCell>{postgres.metadata.namespace}</TableCell>
          <TableCell component="th" scope="row">
            {postgres.kind}
          </TableCell>
          <TableCell component="th" scope="row">
            {postgres.status.dbVersion}
          </TableCell>
          <TableCell component="th" scope="row">
            {postgres.spec.storageSize}
          </TableCell>
          { postgres.status.currentState !== undefined && (
              <TableCell>
                <StatusComponent currentState={postgres.status.currentState} />{postgres.status.currentState}</TableCell>
          )}
          { postgres.status.currentState === undefined && (
              <TableCell><StatusComponent currentState={postgres.status.currentState} />Pending</TableCell>
          )}
          <TableCell component="th" scope="row">
            {

            }
          </TableCell>
          <TableCell component="th" scope="row">

          </TableCell>
        </TableRow>
      </React.Fragment>
  );
}
