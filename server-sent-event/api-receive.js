const express = require('express');
const fs = require('fs');
const app = express();
const EventSource = require('eventsource')

app.get('/', async function (req, res) {
  console.log(EventSource)
  const eventSource = new EventSource('http://localhost:6001/event')

  eventSource.addEventListener('message', function (event) {
    console.log(event)
  })
  eventSource.addEventListener('stop', function (event) {
    console.log('stop', event)
    eventSource.close()
  })
  eventSource.addEventListener('error', function (err) {
    console.error(err);
    eventSource.close()
  })

  return res.status(200).send('success')
});

const port = 6002;
app.listen(port, () => {
  console.info(`server running on port ${port}.`);
});