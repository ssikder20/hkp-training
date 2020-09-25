const express = require('express')
const app = express()
const port = 3000

// Send response "Hello World" if GET request at root route
app.get('/', (req, res) => {
    res.send("Hello World!")
})

// Listen at port 3000 at root route
app.listen(port, () => {
    console.log("App listening at http://localhost:${port}")
})
