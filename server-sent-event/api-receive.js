const express = require('express');
const fs = require('fs');
const app = express();
const EventSource = require('eventsource')
const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");

client.on("error", console.error);
client.set("key", "redis state", redis.print);

const getAsync = promisify(client.get).bind(client);

app.get('/', async function (req, res) {
  const eventSource = new EventSource('http://localhost:6001/event')

  eventSource.addEventListener('message', async function (event) {
    const state = await getAsync('key')
    console.log(state, event)
  })
  eventSource.addEventListener('stop', function (event) {
    console.log('stop', event)
    eventSource.close()
  })
  eventSource.addEventListener('error', function (err) {
    // default retry every 1 second
    console.error(err, new Date());

    // for not require retry
    // eventSource.close()
  })

  return res.status(200).send('success')
});

const port = 6002;
app.listen(port, () => {
  console.info(`server running on port ${port}.`);
});