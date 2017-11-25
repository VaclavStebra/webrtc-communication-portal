const express = require('express');

const PORT = process.env.PORT || 3000;
const DIST_DIR = 'dist';

const app = express();

app.use('/', express.static(DIST_DIR));

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));