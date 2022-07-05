import * as webpack from 'webpack'
import './type'

const dev: webpack.Configuration = {
    env: {
        API_URL: 'http://dev.baidu.com'
    },
    devtool: 'source-map',
    devServer: {
        proxy: {}
    }
}

export default dev
