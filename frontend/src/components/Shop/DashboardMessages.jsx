import React, { useEffect, useState } from "react";
import axios from "axios";
import { WEBSOCKET_ENDPOINT, backend_url, server } from "../../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
import { format } from "timeago.js";

const socketId = socketIO(WEBSOCKET_ENDPOINT, { transports: ["websocket"] });

function DashboardMessages() {
  const { shop } = useSelector((state) => state.shop);
  const { user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState(null);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
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
      .get(`${server}/conversation/get-all-conversation-shop/${shop._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [shop]);

  // get online users
  useEffect(() => {
    if (shop) {
      const userId = shop._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [shop]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== shop?._id);
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
      sender: shop._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const reciverId = currentChat.members.find(
      (member) => member.id !== shop._id
    );
    socketId.emit("sendMessage", {
      senderId: shop._id,
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
      lastMessageId: shop._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: shop._id,
      })
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full bg-white h-[85vh] overflow-y-scroll rounded mx-5">
      {/* all messages list */}
      {!open && (
        <>
          <h1 className="text-center text-3xl py-3 font-Poppins">
            All Messages
          </h1>
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                key={index}
                data={item}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={shop._id}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
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
          shopId={shop._id}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
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
  userInfo,
  setUserInfo,
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
        const res = await axios.get(`${server}/user/get-user-info/${userId}`);

        setUserInfo(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [me, data]);

  return (
    <>
      {userInfo && (
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
              src={`${backend_url}/${userInfo.avatar}`}
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
            <h1 className="text-lg">{userInfo?.name}</h1>
            <p className="text-base text-gray-600 ">
              {data.lastMessageId !== userInfo._id
                ? "You: "
                : userInfo.name.split(" ")[0] + ": "}{" "}
              {data.lastMessage}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const ShopInbox = ({
  open,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  shopId,
  userInfo,
  setUserInfo,
  activeStatus,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between ">
      {/* messsage header */}
      {userInfo && (
        <div className="w-full flex items-center justify-between p-3 bg-slate-100">
          <div className="flex">
            <img
              src={`${backend_url}/${userInfo.avatar}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full"
            />

            <div className="pl-3">
              <h1 className="text-lg font-semibold">{userInfo.name}</h1>
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
                  item.sender === shopId ? "justify-end" : "justify-start"
                }`}
              >
                {item.sender !== shopId && (
                  <img
                    src="http://localhost:8000/electronics-icons-icon-metal-icon-laser-machine-icon-XH7CbZLw-removebg-preview-1687425245612-403305594.png"
                    alt=""
                    className="w-10 h-10 rounded-full mr-3"
                  />
                )}
                <div
                  className={`w-max rounded p-2  text-white h-min ${
                    item.sender === shopId ? "bg-blue-500" : "bg-green-500"
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

export default DashboardMessages;
