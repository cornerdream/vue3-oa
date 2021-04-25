const webpack = require('webpack');
module.exports = {
    configureWebpack:{
        plugins:[
            new webpack.ProvidePlugin({
                $:'jquery',
                jquery:'jquery',
                "window.jquery":'jquery'
            })
        ]
    }
}