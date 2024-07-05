
const express = require('express');
const passport = require('./src/config/passport');
const routes = require('./src/api/routers');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()
require('./src/api/helpers/connections_mongdb')


app.use(express.json());
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    {
        console.log(`server listen port ${PORT}`)
    }
})
