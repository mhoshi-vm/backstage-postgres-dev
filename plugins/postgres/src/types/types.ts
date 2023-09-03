export interface Cluster {
    name: string;
    postgres: Postgres[];
    error: string;
  }
  
  export interface Postgres {
    apiVersion: string;
    kind: string;
    metadata: {
      name: string;
      namespace: string;
      labels: Record<string, string>;
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
  