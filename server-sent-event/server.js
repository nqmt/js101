const express = require('express');
const fs = require('fs');
const app = express();

app.get('/event', async function (req, res) {
  console.info('client connect event', new Date());

  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  // [Note] for set default retry
  // res.write('retry: 50000\n\n');

  let i = 0
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (i === 10) {
      // [Note] Note use this method for stop connection or check specific data by parser
      res.write(`event: stop\n`);
      res.write(`data: stop\n`);
      res.write(`id: ${i}\n\n`);

      i++;
      continue;
    }

    // set retry 3s
    res.write(`retry: 3000\n\n`);
    res.write(`data: ${i} ${new Date()}\n`);
    res.write(`id: ${i}\n\n`);

    i++
  }
});

const index = fs.readFileSync('server-sent-event/web-receive.html', 'utf8');
app.get('/', (req, res) => res.send(index));

const port = 6001;
app.listen(port, () => {
  console.info(`server running on port ${port}.`);
});