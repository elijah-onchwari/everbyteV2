const { composePlugins, withNx } = require('@nx/webpack');
const { resolve, basename } = require('path');
const glob = require('glob');

module.exports = composePlugins(
  withNx({
    outputFileName: 'main',
  }),
  (config, { options, context }) => {
    console.log('🚀 ~ config:before', config);

    const migrations = glob.sync(resolve('libs/workflow-data/src/migrations/migrations/*.m.ts')).reduce((entries, filename) => {
      const migrationName = basename(filename, '.ts');
      return Object.assign({}, entries, {
        [migrationName]: filename,
      });
    }, {});
    config.target = 'node';
    config.output.libraryTarget = 'umd';
    config.entry = { ...config.entry, ...migrations };
    config.externals = ['@nestjs/core', '@nestjs/common', 'typeorm', '@nestjs/mapped-types'];
    console.log('🚀 ~ config:', config);

    return config;
  }
);
