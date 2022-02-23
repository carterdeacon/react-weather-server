const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors');
app.use(cors())

// using environment variables
const port = process.env.PORT || 3001;

app.use(express.static('public'))

app.use(express.json());

app.get('/api', async (req, res) => {
    const location = req.query.lattlong;
    const getWoeID = async location => {
        const {data} = await axios.get(`https://www.metaweather.com/api/location/search/?lattlong=${location}`);
        if (data.length === 0) {
            return;
        }
        return data
    }
    const getForecast = async locationid => {
        const { data } = await axios.get(`https://www.metaweather.com/api/location/${locationid}/`);
        if (data.length === 0) {
            return;
        }
        return data;
    }
    const response = await getWoeID(location);
    const weather = await getForecast(response[0].woeid)
    res.json(weather);
})


app.listen(port, () => {
  console.log(`server listening on port ${port}`);
})
