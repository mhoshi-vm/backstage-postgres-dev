import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const postgresPlugin = createPlugin({
  id: 'postgres',
  routes: {
    root: rootRouteRef,
  },
});

export type EntityPostgresContentProps = {
  /**
   * Sets the refresh interval in milliseconds. The default value is 10000 (10 seconds)
   */
  refreshIntervalMs?: number;
};

export const EntityPostgresContent: (
  props: EntityPostgresContentProps,
) => JSX.Element = postgresPlugin.provide(
  createRoutableExtension({
    name: 'EntityPostgresContent',
    component: () => import('./Router').then(m => m.Router),
    mountPoint: rootRouteRef,
  }),
);

