# Server sent Event

### Usage

```bash
// (Sent) start server [listen on port 6001]
node ./server-sent-event/server.js

// (Receive) start api receive sse from server [listen on port 6002]
node ./server-sent-event/api-receive.js

// (Receive) web receive sse from server
open web on localhost:6001
```

### Limitation

- limit connection tab [[ref issue](https://stackoverflow.com/questions/18584525/server-sent-events-and-browser-limits)]
    - chrome 6 tab
    - firefox 9 tab

### Ref

- https://javascript.info/server-sent-events
- http://blog.bayn.es/real-time-web-applications-with-server-sent-events-pt-1/
- http://blog.bayn.es/real-time-web-apps-with-server-sent-events-pt-2/
- https://apifriends.com/api-streaming/server-sent-events/
 