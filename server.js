const express = require("express");
const app = express();
const socket = require("socket.io");
//const cors = require("cors");
const { get_Current_User, user_Disconnect, join_User } = require("./dummyuser");

app.use(express());

const port = 4000;

//app.use(cors({origin:"*"}));

var server = app.listen(
  port,
  console.log(`Server is running on the port no: ${port}`)
);

const io = socket(server,{cors:{origin:"http://localhost:3000"}});
let user_obj = [];
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("user join", (data) => {
    data.socketId=socket.id
    user_obj.push(data);
    console.log("user joined server",data.id, user_obj);
   // socket.emit("user joined",data);
    socket.broadcast.emit("someone joined",data);
    console.log("user_obj",user_obj);
    io.emit("get users",user_obj);
  });

  socket.on("chat", (data) => {
    console.log("chat in mess server",data.messageTo,data);
    io.to(data.messageTo).emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("disconnect in",user_obj);
    user_obj = user_obj.filter((user) => user.socketId !== socket.id);
    console.log(user_obj, "a del");
    socket.broadcast.emit("remove users",user_obj);
  });
});
