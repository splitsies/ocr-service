import type { AWS } from '@serverless/typescript';

import tesseractConfig from "./src/config/tesseract.config.json";

import hello from '@functions/hello';
import process from "@functions/images/process";

const serverlessConfiguration: AWS = {
  service: 'ocr-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',

        // TODO: Make these configurable from serverless dashboard
        // CDN URLs are not allowed in creating a tesseract worker, the files have been locally downloaded via npm
        // These paths are relative to the respective handler.js file in the built output
        ...tesseractConfig,
    },
  },
  // import the function via paths
  functions: { hello, process },
    package: {
        individually: true,
        include: [
            './src/tesseract/lang/**/*',
            './node_modules/tesseract.js/node_modules/**',
            './node_modules/tesseract.js/scripts/**',
            './node_modules/tesseract.js/src/**',
            './node_modules/tesseract.js-core/tesseract*'
        ]
    },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
