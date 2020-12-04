const express = require('express');
const app = express();

const router = require('./router');

const PUBLIC_FOLDER = process.env.NODE_ENV === 'production' ?
    path.join(__dirname, 'public')
    : path.join(__dirname, 'client', 'build');

app.use(express.json());
app.use('/api', router);

app.use('/flags', express.static(path.join(PUBLIC_FOLDER, 'flags')));
app.use('/', express.static(PUBLIC_FOLDER));
app.get('/*', function (req, res) {
    res.sendFile(path.join(PUBLIC_FOLDER, 'index.html'));
});

module.exports = app;