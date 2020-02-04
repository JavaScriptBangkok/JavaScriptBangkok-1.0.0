const express = require('express')
const app = express()
app.use('/prototype', express.static('prototype'))
const port = +process.env.PORT || 2020
app.listen(port, () => {
  console.log('Server is listen on port', port)
})
