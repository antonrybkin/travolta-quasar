const express = require('express');
const path = require('path');

const app = express();

const staticFileMiddleware = express.static(path.join(__dirname + '/dist/pwa'));

app.use(staticFileMiddleware);

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/dist/pwa/index.html'));
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});