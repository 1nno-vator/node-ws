const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("클라이언트로부터 받은 메시지 ->");
    console.log(msg);
  });
});

app.get("/", (req, res) => {
  res.json({ text: "Hello World!" });
});

app.post("/sendTest", (req, res) => {
  console.log(req.body.msg);
  io.emit("chat message", req.body.msg);
  return res.json({ text: "send!" });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
