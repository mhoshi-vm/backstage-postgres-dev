import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { postgresPlugin, PostgresPage } from '../src/plugin';

createDevApp()
  .registerPlugin(postgresPlugin)
  .addPage({
    element: <PostgresPage />,
    title: 'Root Page',
    path: '/postgres'
  })
  .render();
