import {
  LinkButton,
} from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PostgresComponent } from './components/PostgresDashboard';

export const isPostgresAvailable = () => Boolean("true");

export const Router = (props: { refreshIntervalMs?: number }) => {
  const { entity } = useEntity();

  const postgresAnnotationValue = "true";

  if (
      postgresAnnotationValue
  ) {
    return (

        <Routes>
          <Route
            path="/"
            element={
              <PostgresComponent
                entity={entity}
                refreshIntervalMs={props.refreshIntervalMs}
              />
            }
          />
        </Routes>

    );
  }

  return (
    <>
      <LinkButton
        variant="contained"
        color="primary"
        href="https://github.com/jquad-group/backstage-jquad"
        to=""
      >
        Read Tekton Pipelines Plugin Docs
      </LinkButton>
    </>
  );
};
