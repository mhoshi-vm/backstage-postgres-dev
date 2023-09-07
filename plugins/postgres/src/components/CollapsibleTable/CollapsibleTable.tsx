import React from 'react';
// eslint-disable-next-line  no-restricted-imports
import { Table, TableContainer, TableBody, TableRow, TableCell, TableHead, TablePagination, TableFooter } from '@material-ui/core';
/* ignore lint error for internal dependencies */
/* eslint-disable */
import { Postgres } from '../../types';
/* eslint-enable */
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { CollapsibleTableRow } from '../CollapsibleTableRow';

type PostgresProps = {
  clusterName?: string;
  postgres?: Postgres[];
};

export const CollapsibleTable = ({ clusterName, postgres }: PostgresProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let emptyRows: number;
  // Avoid a layout jump when reaching the last page with empty rows.
  if (postgres !== undefined) {
    emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - postgres.length) : 0;
  } else {
    emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage) : 0;
  }

  const handleChangePage = (
      _event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
      <TableContainer data-testid="collapsible-table-container">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Cluster</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Namespace</TableCell>
              <TableCell>DB</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Bind Workload</TableCell>
              <TableCell>Monitoring Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(postgres !== undefined) && (clusterName !== undefined) && (rowsPerPage > 0
                    ? postgres.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : postgres
            ).map((_postgres) => (
                <CollapsibleTableRow key={_postgres.metadata.name} clusterName={clusterName} postgres={_postgres}/>
            ))}

            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
            )}
          </TableBody>
          <TableFooter>
            { postgres !== undefined && <TableRow>
              <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={7}
                  count={postgres.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
              />
            </TableRow>
            }
          </TableFooter>
        </Table>
      </TableContainer>
  );
}