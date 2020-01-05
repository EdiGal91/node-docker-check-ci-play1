const express = require("express");
const redis = require("redis");

const app = express();
const redisClient = redis.createClient({
  host: "redis-server",
  port: 6379
});
redisClient.set("visits", 0);

app.get("/", (req, res, next) => {
  redisClient.get("visits", (err, visites) => {
    if (err) {
      res.send(`error:, ${err}`);
    } else {
      res.send(`Aloha visits: ${visites}`);
      redisClient.set("visits", ++visites);
    }
  });
});

const { PORT = 8080 } = process.env;
app.listen(PORT, console.log(`simple web is listen on port ${PORT}`));
