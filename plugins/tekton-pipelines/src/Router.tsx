import {
  LinkButton,
  MissingAnnotationEmptyState,
} from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TektonDashboardComponent } from './components/TektonDashboard';

export const TEKTON_PIPELINES_ANNOTATION = 'tektonci/enabled';

export const isTektonCiAvailable = () =>
  Boolean("true");

export const Router = (props: { refreshIntervalMs?: number }) => {
  const { entity } = useEntity();

  const tektonPipelinesAnnotationValue =
    "true";

  if (
    tektonPipelinesAnnotationValue
  ) {
    return (
   
        <Routes>
          <Route
            path="/"
            element={
              <TektonDashboardComponent
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
      <MissingAnnotationEmptyState
        annotation={TEKTON_PIPELINES_ANNOTATION}
      />

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
