const path = require('path')
const express = require('express')
const app = express()
const port = 7000

app.get('/api/test', (req, res) => {
  res.send('Hello World!')
})

// Look in ./public for anything not matching /api/
app.use(/^\/(?!api\/)/, express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
