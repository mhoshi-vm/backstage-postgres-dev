import {Entity} from '@backstage/catalog-model';
import {Content, Page, Progress, ResponseErrorPanel,} from '@backstage/core-components';

/* ignore lint error for internal dependencies */
/* eslint-disable */
import {Box, Grid} from '@material-ui/core';
import {useKubernetesObjects} from '@backstage/plugin-kubernetes';
import {FetchResponse} from '@backstage/plugin-kubernetes-common';
import {Cluster, Postgres, ServiceBinding} from '../../types';
import {CollapsibleTable} from '../CollapsibleTable';
import React, {useEffect, useState} from 'react';

type KubernetesContentProps = {
  entity: Entity;
  refreshIntervalMs?: number;
  children?: React.ReactNode;
};

export const PostgresComponent = ({
                                    entity,
                                    refreshIntervalMs,
                                  }: KubernetesContentProps) => {
  const { kubernetesObjects, error } = useKubernetesObjects(
      entity,
      refreshIntervalMs,
  );

  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    // This useEffect will run whenever kubernetesObjects changes
    // If kubernetesObjects is not undefined or null, setLoading to false
    if (kubernetesObjects !== undefined && kubernetesObjects !== null) {
      setLoading(false);
    }
  }, [kubernetesObjects]);

  let clusters = new Array<Cluster>();

  if (kubernetesObjects !== undefined) {
    for (let clusterCnt = 0; clusterCnt < kubernetesObjects.items.length; clusterCnt++) {
      let cluster = {} as Cluster;
      cluster.name = kubernetesObjects?.items[clusterCnt].cluster.name;
      // get only custom resource
      let customResources = kubernetesObjects?.items[clusterCnt].resources.filter(isCustomResource);

      // get postgres
      let postgresCRs = customResources?.map((r) => {
        return {...r, resources: r.resources.filter(isPostgres)}});

      // flatten object
      const flattenedPostgresAny = postgresCRs?.flatMap(({ resources }) =>
          [...resources]
      ) ?? [];

      let serviceBindingCRs = customResources?.map((r) => {
        return {...r, resources: r.resources.filter(isServiceBinding)}});

      // flatten object
      const flattenedServiceBindingAny = serviceBindingCRs?.flatMap(({ resources }) =>
          [...resources]
      ) ?? [];

      // cast objects to PipelineRun
      cluster.postgres = flattenedPostgresAny as Postgres[];
      cluster.servicebinding = flattenedServiceBindingAny as ServiceBinding[];
      clusters.push(cluster);
    }
  }

  return (
      <Page themeId="tool">
        <Content>
          {loading ? ( // Display progress bar while loading
              <div className="progress-bar-container">
                <Progress />
              </div>
          ) : (
              kubernetesObjects?.items !== undefined && clusters?.length > 0 && (
                  clusters.map((cluster) =>
                      <Grid container spacing={3} direction="column">
                        { cluster.postgres !== undefined && cluster.postgres !== null && cluster.postgres.length > 0 && (
                            <Grid item>
                              <CollapsibleTable clusterName={cluster.name} postgres={cluster.postgres} serviceBinding={cluster.servicebinding} />
                            </Grid>
                        )}
                        { cluster.error !== undefined && (
                            <Grid item>
                              <Box textAlign="center" fontSize="20px">{cluster.error}</Box>
                            </Grid>
                        )}
                      </Grid>
                  )
              )
          )}
          {error !== undefined &&
              <Grid container spacing={3} direction="column">
                <Grid item>
                  <ResponseErrorPanel error={(new Error(error))} />;
                </Grid>
              </Grid>
          }
        </Content>
      </Page>
  );

};

function isCustomResource(n:FetchResponse) {
  return n.type === 'customresources';
}

function isPostgres(n:any): n is Postgres {
  return n.kind === 'Postgres';
}

function isServiceBinding(n:any): n is ServiceBinding {
  return n.kind === 'ServiceBinding';
}