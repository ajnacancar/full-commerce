import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { WEBSOCKET_ENDPOINT, backend_url, server } from "../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../styles/styles";

const socketId = socketIO(WEBSOCKET_ENDPOINT, { transports: ["websocket"] });

function UserInboxPage() {
  const { user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState(null);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [shopInfo, setShopInfo] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    axios
      .get(`${server}/conversation/get-all-conversation-user/${user._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  // get online users
  useEffect(() => {
    if (user) {
      const userId = user._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find(
      (onlineUser) => onlineUser.userId === chatMembers
    );

    // setActiveStatus(online ? true : false);

    return online ? true : false;
  };

  //get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const respnse = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(respnse.data.messages);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentChat) {
      getMessage();
    }
  }, [currentChat]);

  // create new message
  const sendMessageHandler = (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const reciverId = currentChat.members.find(
      (member) => member.id !== user._id
    );
    socketId.emit("sendMessage", {
      senderId: user._id,
      reciverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        axios
          .post(`${server}/message/create-new-message`, message, {
            withCredentials: true,
          })
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
      })
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full">
      <Header />

      <h1 className="text-center text-3xl py-3 font-Poppins">All Messages</h1>
      {!open && (
        <>
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                key={index}
                data={item}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={user._id}
                shopInfo={shopInfo}
                setShopInfo={setShopInfo}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}

      {open && (
        <ShopInbox
          open={open}
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          userId={user._id}
          shopInfo={shopInfo}
          setShopInfo={setShopInfo}
          activeStatus={activeStatus}
        />
      )}
    </div>
  );
}

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  shopInfo,
  setShopInfo,
  online,
  setActiveStatus,
}) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`?id=${data._id}`);
    setOpen(true);
  };

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user != me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);

        setShopInfo(res.data.shop);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [me, data]);

  return (
    <div className="w-full">
      {shopInfo && (
        <div
          className={`w-full flex p-3 border-b-2 border-slate-200  cursor-pointer ${
            active === index ? "bg-zinc-100" : "bg-transparent"
          }`}
          onClick={() =>
            setActive(index) || handleClick() || setCurrentChat(data)
          }
        >
          <div className="relative">
            <img
              src={`${backend_url}/${shopInfo.avatar}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full"
            />
            {online ? (
              <div className="w-4 h-4 bg-green-400 rounded-full absolute bottom-1" />
            ) : (
              <div className="w-4 h-4 bg-slate-200 rounded-full absolute bottom-1" />
            )}
          </div>

          <div className="pl-3">
            <h1 className="text-lg">{shopInfo?.name}</h1>
            <p className="text-base text-gray-600 ">
              {data.lastMessageId !== shopInfo._id
                ? "You: "
                : shopInfo.name.split(" ")[0] + ": "}{" "}
              {data.lastMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const ShopInbox = ({
  open,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  userId,
  shopInfo,
  setShopInfo,
  activeStatus,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between ">
      {/* messsage header */}
      {shopInfo && (
        <div className="w-full flex items-center justify-between p-3 bg-slate-100">
          <div className="flex">
            <img
              src={`${backend_url}/${shopInfo.avatar}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full"
            />

            <div className="pl-3">
              <h1 className="text-lg font-semibold">{shopInfo.name}</h1>
              <h1>{activeStatus && "Active now"}</h1>
            </div>
          </div>
          <AiOutlineArrowRight
            size={20}
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        </div>
      )}

      {/* messages */}

      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        {messages &&
          messages.map((item, index) => (
            <>
              <div
                className={`flex w-full my-2 ${
                  item.sender === userId ? "justify-end" : "justify-start"
                }`}
              >
                {item.sender !== userId && (
                  <img
                    src="http://localhost:8000/electronics-icons-icon-metal-icon-laser-machine-icon-XH7CbZLw-removebg-preview-1687425245612-403305594.png"
                    alt=""
                    className="w-10 h-10 rounded-full mr-3"
                  />
                )}
                <div
                  className={`w-max rounded p-2  text-white h-min ${
                    item.sender === userId ? "bg-blue-500" : "bg-green-500"
                  }`}
                >
                  <p>{item.text}</p>
                  <div className="w-full flex justify-end">
                    <p className="text-[12px] text-slate-300">
                      {format(item.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>

      {/* send messsage input */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[3%]">
          <TfiGallery size={20} className="cursor-pointer" />
        </div>
        <div className="w-[97%]">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-4 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default UserInboxPage;
