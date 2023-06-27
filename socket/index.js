const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push(userId, socketId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (reciverId) => {
  return users.find((user) => user.userId === reciverId);
};

// Define message object with a seen property
const createMessage = ({ senderId, reciverId, text, images }) => ({
  senderId,
  reciverId,
  text,
  images,
  seen: false,
});

io.on("connection", (socket) => {
  console.log("user is connected");

  //take userid and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send and get messages
  const messages = {}; //Object to track messages send to user

  socket.on("sendMessage", ({ senderId, reciverId, text, images }) => {
    const message = createMessage({ senderId, reciverId, text, images });

    const user = getUser(reciverId);

    //Store messages in object

    if (!messages[reciverId]) {
      messages[reciverId] = [message];
    } else {
      messages[reciverId].push(message);
    }

    //send messaage to reciver
    io.to(user?.socketId).emit("getMessage", message);
  });

  socket.on("messageSeen", ({ senderId, reciverId, messageId }) => {
    const user = getUser(senderId);

    //update seen flag for message
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) => message.reciverId === reciverId && message.id === messageId
      );
      if (message) {
        message.seen = true;

        // send a message seen event to the sender
        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          reciverId,
          messageId,
        });
      }
    }
  });

  // update and get last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessageId,
    });
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log("Socket server running on port ", process.env.PORT);
});
