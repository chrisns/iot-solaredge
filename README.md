# Bind SolarEdge to aws iot
[![](https://images.microbadger.com/badges/image/chrisns/iot-solaredge.svg)](https://microbadger.com/images/chrisns/iot-solaredge "Get your own image badge on microbadger.com")
[![](https://images.microbadger.com/badges/version/chrisns/iot-solaredge.svg)](https://microbadger.com/images/chrisns/iot-solaredge "Get your own version badge on microbadger.com")
[![](https://images.microbadger.com/badges/commit/chrisns/iot-solaredge.svg)](https://microbadger.com/images/chrisns/iot-solaredge "Get your own commit badge on microbadger.com")


To start either:
```bash
npm install
export AWS_ACCESS_KEY_ID=xxx
export AWS_REGION=xxx
export AWS_SECRET_ACCESS_KEY=xxx
export AWS_IOT_ENDPOINT_HOST=xxx
export SOLAREDGE_ENDPOINT=xxx
export INTERVAL=30
npm start
```

Or to use Docker:
```bash
docker run \
  --rm \
  --net host \
  -e AWS_ACCESS_KEY_ID=xxx \
  -e AWS_REGION=xxx \
  -e AWS_SECRET_ACCESS_KEY=xxx \
  -e AWS_IOT_ENDPOINT_HOST=xxx \
  -e SOLAREDGE_ENDPOINT=xxx \
  -e INTERVAL=30 \
  chrisns/iot-solaredge
```

Or to use Docker stack:
```bash
docker node update [NAME OF MACHINE/S WITH BLUETOOTH STICK] --label-add bluetooth=true
export AWS_ACCESS_KEY_ID=xxx
export AWS_REGION=xxx
export AWS_SECRET_ACCESS_KEY=xxx
export AWS_IOT_ENDPOINT_HOST=xxx
export SOLAREDGE_ENDPOINT=xxx
export INTERVAL=30
docker deploy --compose-file docker-compose.yml ble
```