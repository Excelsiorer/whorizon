const path = require("path");

module.exports = {
    outputDir: 'dist',
    filenameHashing: false,
    assetsDir: 'wp-content/themes/whorizon/assets',
    indexPath: 'index.php',
    configureWebpack: {
        resolve: {
            alias: {
                "c@": path.join(__dirname, 'src/components'),
                "images@": path.join(__dirname, 'src/assets/img'),
            }
        },
    },
}