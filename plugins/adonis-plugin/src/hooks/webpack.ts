import { join } from 'path';
import { readJSON, existsSync } from 'fs-extra';
import { ConfigurationContext, WebpackContext } from '@malagu/cli-service/lib/context/context-protocol';
import { PathUtil } from '@malagu/cli-common/lib/utils/path-util';
import { resolve } from 'path';

export default async (context: WebpackContext) => {
    const { configurations } = context;

    const config = ConfigurationContext.getBackendConfiguration(
        configurations
    );

    if (config) {
        const patterns = [];
        let distDir = 'build';

        const tsconfig = join(process.cwd(), 'tsconfig.json')
        if (existsSync(tsconfig)) {
            const config = await readJSON(tsconfig)
            const outDir = config?.compilerOptions?.outDir
            if (outDir) {
                distDir = outDir
            }
        }

        const backendProjectDistPath = PathUtil.getBackendProjectDistPath();
        
        patterns.push({
            from: resolve(process.cwd(), distDir),
            to: resolve(backendProjectDistPath)
        });

        const CopyPlugin = require('copy-webpack-plugin');
        config
            .plugin('copyAdonis')
            .use(CopyPlugin, [{ patterns }]);
    }
};
