// AVAILABLE ENV VARIABLES
// PORT: integer for port to run the server
// LOG_INTERVAL: integer for number of seconds between logs of number of requests

const express = require("express");
const app = express();
const port = process.env.PORT ?? 3500;

let reqs = 0;

let dateFormatter = Intl.DateTimeFormat("en-us", {
  timeZone: "PST",
  dateStyle: "medium",
  timeStyle: "long",
});
setInterval(
  () => {
    console.log(
      `Time: ${dateFormatter.format(new Date())}\nNumber of requests: ${reqs}`
    );
  },
  process.env.LOG_INTERVAL ? parseInt(process.env.LOG_INTERVAL) * 1000 : 5000
);

app.get("/", (req, res) => {
  reqs++;
  if (req.query.sleep) {
    setTimeout(() => {
      res.end();
    }, parseInt(req.query.sleep) * 1000);
  } else {
    res.end();
  }
});

app.get("/current", (req, res) => {
  res.json({ current: reqs });
});

app.get("/healthz", (req, res) => {
  res.end();
});

app.get("/reset", (req, res) => {
  reqs = 0;
  res.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
