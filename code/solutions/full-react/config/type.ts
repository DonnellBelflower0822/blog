import 'webpack-dev-server'

declare module "webpack" {
    interface Configuration {
        env?: Record<string, string>;
        // proxy?: 
    }
}