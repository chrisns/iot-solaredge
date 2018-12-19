const SolarEdgeModbusClient = require('solaredge-modbus-client')
const AWS = require("aws-sdk")
const { AWS_IOT_ENDPOINT_HOST, DEBUG, SOLAREDGE_ENDPOINT, INTERVAL, METERS } = process.env

const iot = new AWS.Iot({
  debug: DEBUG
})

const iotdata = new AWS.IotData({
  endpoint: AWS_IOT_ENDPOINT_HOST,
  debug: DEBUG
})

const solar = new SolarEdgeModbusClient({
  host: SOLAREDGE_ENDPOINT,
  port: 502,
  meters: METERS || 0
})
const interval = INTERVAL * 1000

let lastPayload = {}
let thingName = ''

const getAndUpdateTheDifference = results => {
  thingName = `SolarEdge-${results['40053-C_SerialNumber']}`
  let lp = lastPayload
  lastPayload = Object.assign({}, results)
  Object.entries(results).forEach(([key, value]) => {
    if (lp[key] === value) {
      delete results[key]
    }
  })
  return results
}

const formatValue = v => v == null ? null : v.replace(/\0.*$/g, '')

const formatResult = data => {
  let results = {}
  data.forEach(result =>
    results[`${result.id}-${result.name}`] = formatValue(result.value)
  )
  return results
}

const update_thing = async (thingName, payload) => iotdata.updateThingShadow({
  thingName: thingName,
  payload: JSON.stringify({ state: { reported: payload } })
}).promise()

const sendToAWS = async results => {
  console.log("send to aws", results)
  // first run
  if (results['40053-C_SerialNumber']) {
    let params = {
      thingName: thingName,
      thingTypeName: "SolarEdge"
    }
    try {
      await iot.updateThing(params).promise()
    } catch (error) {
      await iot.createThing(params).promise()
    }
  }
  await update_thing(thingName, results)
}

const run = () => solar.getData()
  .then(formatResult)
  .then(getAndUpdateTheDifference)
  .then(sendToAWS)

setInterval(run, interval);
