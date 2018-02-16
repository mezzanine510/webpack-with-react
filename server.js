const express = require('express');
const path = require('path');

const app = express();

// add additional routes ** ABOVE ** webpack configurations
app.get('/hello', (req, res) => res.send({ hi: 'there' }));

if (process.env.NODE_ENV !== 'production') {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}

// make sure to include process.env.PORT in case provider supplies it
app.listen(process.env.PORT || 3050, () => console.log('Listening...'));