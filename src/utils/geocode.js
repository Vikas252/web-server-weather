const request = require("request")
const query = require("D:/Node.js/web-server/src/app")

const geocode = (address, callback) => {
  const url =
    "http://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidmlrYXMzMjEiLCJhIjoiY2w1djAzMDJ4MDUyMjNkbHRjdGYwdjh0YSJ9.LWMmo0xqtnuNudIbds0K7g&limit=1"

  if (!query) {
    console.log("Please provide an address")
  } else {
    request({ url, json: true }, (error, { body } = {}) => {
      if (error) {
        callback("Unable to connect to location services", undefined)
      } else if (
        !body.features ||
        body.features.length === 0 ||
        body.query.length === 0
      ) {
        callback("Unable to find location. Try another serach", undefined)
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        })
      }
    })
  }
}

module.exports = geocode
