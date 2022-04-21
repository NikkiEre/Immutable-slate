const {
    override,
    addWebpackPlugin
} = require('customize-cra');

const addNodePolyfillPlugin =
    (options = {}) =>
        config => {
            const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

            const plugin = new NodePolyfillPlugin({
                excludeAliases: ['console']
            });

            return addWebpackPlugin(plugin)(config);
        };

        const webpack = override(
            addNodePolyfillPlugin(),
        );
        
        module.exports = webpack;