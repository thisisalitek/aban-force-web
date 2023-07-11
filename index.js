require('dotenv').config()

const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

app.all('/', (req, res) => {
  res.json('Welcome to Aban Forcing Web API')
})

app.listen(PORT, () => {
  console.log(`Aban Service running on ${PORT}`)
  console.log(`http://localhost:${PORT}`)
  getLinks('https://acunstore.com.tr')
})

app.get('/force', (req, res) => {})
var total = 0
function getLinks(targetUrl, title = '') {
  total++
  console.log(
    `[${new Date().toISOString().split('.')[0].replace('T', ' ')}] `,
    total,
    title,
    targetUrl
  )
  axios
    .get(targetUrl)
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)
      const resp = []
      $(`a`, html).each(function () {
          const title = $(this).text()
          const href = $(this).attr('href')
          //resp.push({ title, href })
          if (href != targetUrl && href.includes('acunstore.com.tr')) {
            setTimeout(() => getLinks(href, title), 500)
          }
      })
    })
    .catch(console.error)
}
