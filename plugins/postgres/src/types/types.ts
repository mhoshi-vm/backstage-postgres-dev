export interface Cluster {
  name: string;
  postgres: Postgres[];
  error: string;
}

export interface Postgres {
  apiVersion: string;
  kind: string;
  serviceBinding: string;
  wavefrontUri: string;
  metadata: {
    name: string;
    namespace: string;
  };
  spec: {
    storageSize: string;
  };
  status: {
    currentState: string;
    dbVersion: string;
  };
}
export interface Condition {
  reason: string;
  type: string;
  status: string;
  message: string;
}

export interface ServiceBinding {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
  };
  spec: {
    service: {
      apiVersion: string;
      kind: string;
      name: string;
    };
    workload: {
      apiVersion: string;
      kind: string;
      name: string;
    };
  };
}