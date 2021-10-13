module.exports = {
    devServer: {
        
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/widget-note-version2/'
    : '/'
}