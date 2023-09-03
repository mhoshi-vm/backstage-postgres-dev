import { postgresPlugin } from './plugin';

describe('postgres-plugin', () => {
  it('should export plugin', () => {
    expect(postgresPlugin).toBeDefined();
  });
});
