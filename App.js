const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//const store_data = require('./routes/backend-routes')
const teaestateowner_details = require('./routes/backend-routes')

app.use('/api/sdgp_database', teaestateowner_details)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})