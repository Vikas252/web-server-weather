const path = require("path")
const express = require("express")
const hbs = require("hbs")
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")
//const request = require("postman-request")

console.log(__dirname)
console.log(path.join(__dirname, "../public"))

const app = express()
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
)
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
)
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
)

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Vikas MD",
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Vikas MD",
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Vikas MD",
    helpText: "This is some help text",
  })
})

// app.get("/weather", (req, res) => {
//   if (!req.query.address) {
//     return res.send({
//       error: "You must provide a address",
//     })
//   }

//   geocode(
//     req.query.address,
//     (error, { latitude, longitude, location } = {}) => {
//       if (error) {
//         return res.send({ error })
//       }
//       forecast(latitude, longitude, (error, forecastdata) => {
//         if (error) {
//           return res.send({ error })
//         }
//         res.send({
//           forecast: forecastdata,
//           location,
//           address: req.query.address,
//         })
//       })
//     }
//   )
// })
// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide a search term",
//     })
//   }
//   console.log(req.query.search)
//   res.send({
//     products: [],
//   })
// })

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    })
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error })
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        })
      })
    }
  )
  //module.exports = req.query.address
})

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Vikas MD",
    errorMessage: "Help article not found",
  })
})

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Vikas MD",
    errorMessage: "Page not found",
  })
})

app.listen(3000, () => console.log(`Example app listening on port 3000`))
