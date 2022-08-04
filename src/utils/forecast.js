const request = require("request")

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d2f8216b35edb5f8bc7637be6b0382e5&query=" +
    latitude +
    "," +
    longitude +
    "&units=f"

  request({ url, json: true }, (error, { body } = {}) => {
    //console.log(response.body.current)
    if (error) {
      callback("Unable to connect to weather server:" + error.errno, undefined)
    } else if (body.error) {
      //callback("Please check the location")
      callback(body.error.info, undefined)
    } else {
      callback(
        undefined,
        "Description: " +
          body.current.weather_descriptions[0] +
          ", Tempreature: " +
          body.current.temperature +
          ", FeelsLike: " +
          body.current.feelslike
      )
    }
  })
}

module.exports = forecast
