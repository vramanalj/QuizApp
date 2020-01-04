const webpackConfig = require('../node_modules/@ionic/app-scripts/config/webpack.config');
const webpack = require('webpack');

const ENV = process.env.IONIC_ENV;
const envConfigFile = require(`./config-${ENV}.json`);
const cloudantConfig = envConfigFile.CLOUDANTDB_CONFIG;
const workboxPlugin = require('workbox-webpack-plugin');
let path=webpackConfig.dev.output.path;
// console.log(path);
// console.log(cloudantConfig);
webpackConfig.dev.plugins.push(
    new webpack.DefinePlugin({
        webpackGlobalVars: {
            CLOUDANTDB: JSON.stringify(cloudantConfig),
        }
    })
);
webpackConfig.prod.plugins.push(
    new webpack.DefinePlugin({
        webpackGlobalVars: {
            CLOUDANTDB: JSON.stringify(cloudantConfig),
        }
    })
);