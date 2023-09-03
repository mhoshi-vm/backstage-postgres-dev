import React from 'react';
import {
    AppPluginInterface,
    AppRouteSurface,
} from '@tpb/core-frontend';
import { EntityPageSurface } from '@tpb/plugin-catalog';
import { EntityLayout } from '@backstage/plugin-catalog';
import {EntityPostgresContent} from "./plugin";


export const TanzuSQLPlugin: AppPluginInterface = () => context => {
    context.applyWithDependency(
        AppRouteSurface,
        EntityPageSurface,
        (_appRouteSurface, entityPageSurface) => {
            entityPageSurface.servicePage.addTab(
                <EntityLayout.Route path="/tanzu-sql" title="Databases">
                    <EntityPostgresContent refreshIntervalMs={5000}/>
                </EntityLayout.Route>,
            );
        },
    );
}