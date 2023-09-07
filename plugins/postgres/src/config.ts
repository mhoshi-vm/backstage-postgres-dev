import { Config } from '@backstage/config';

/** @public */
export class WavefrontConfig {
    constructor(
        public readonly uri: string,
    ) {}

    static fromConfig(config: Config): WavefrontConfig {
        const wfConfig = config.getConfig('wavefront');

        return new WavefrontConfig(
            wfConfig.getString('uri'),
        );
    }
}