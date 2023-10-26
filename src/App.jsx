import React, { useState, useEffect } from "react";

// Messages data
const initialMessages = [
  {
    id: 1,
    name: "Mark Webber",
    image: "/avatar-mark-webber.webp",
    text: "reacted to your recent post",
    post: "My first tournament today!",
    timeAgo: "1m",
    status: "unread",
  },
  {
    id: 2,
    name: "Angela Gray",
    image: "/avatar-angela-gray.webp",
    text: "followed you",
    timeAgo: "5m",
    status: "unread",
  },
  {
    id: 3,
    name: "Jacob Thompson",
    image: "/avatar-jacob-thompson.webp",
    text: "has joined your group",
    group: "Chess Club",
    timeAgo: "1 day",
    status: "unread",
  },
  {
    id: 4,
    name: "Rizky Hasanuddin",
    image: "/avatar-rizky-hasanuddin.webp",
    text: "sent you a private message",
    pvtMsg:
      "Hello, thanks for setting up the chess club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
    timeAgo: "5 days",
    status: "read",
  },
  {
    id: 5,
    name: "Kimberly Smith",
    image: "/avatar-kimberly-smith.webp",
    text: "commented on your picture",
    msgImg: "/image-chess.webp",
    timeAgo: "1 week",
    status: "read",
  },
  {
    id: 6,
    name: "Nathan Peterson",
    image: "/avatar-nathan-peterson.webp",
    text: "reacted to your recent post",
    post: "5 end-game strategies to increase your wi rate",
    timeAgo: "2 weeks",
    status: "read",
  },
  {
    id: 7,
    name: "Ana Kim",
    image: "/avatar-anna-kim.webp",
    text: "left the group",
    group: "Chess Club",
    timeAgo: "2 weeks",
    status: "read",
  },
];

function Notifications({ unreadCount }) {
  return (
    <section>
      <h2 className='font-bold text-2xl'>
        Notifications{" "}
        <span className='bg-blue-700 text-white px-3 rounded-lg'>
          {unreadCount}
        </span>{" "}
      </h2>
    </section>
  );
}

function MarkAllAsRead({ markAllAsRead }) {
  return (
    <button
      className='text-gray-400 hover:text-blue-500'
      onClick={markAllAsRead}
    >
      Mark All as Read
    </button>
  );
}

function Messages({ messages, markAsRead, markAsUnread }) {
  return (
    <section>
      <ul>
        {messages.map((message) => (
          <li
            key={message.id}
            onClick={() => {
              if (message.status === "unread") {
                markAsRead(message.id);
              } else {
                markAsUnread(message.id);
              }
            }}
            className={`p-4 rounded-md m-4 cursor-pointer flex gap-4 ${
              message.status === "unread" ? "bg-gray-100" : "bg-white"
            } `}
          >
            <span>
              <img src={message.image} alt='person' className='max-w-[60px]' />
            </span>
            <section>
              <span className='font-bold text-xl'>{message.name}</span>{" "}
              <span className='text-lg font-light'>{message.text}</span>{" "}
              <span className='text-gray-500 font-semibold'>
                {message.post}
              </span>
              <span className='text-blue-700 font-extrabold'>
                {message.group}
              </span>{" "}
              {message.status === "unread" && (
                <span className='w-2 h-2 bg-red-500 rounded-full inline-block mr-2'></span>
              )}
              <p className='text-gray-400'>{message.timeAgo} ago</p>
              {message.pvtMsg ? (
                <p className='p-4 border rounded-2xl mt-2 hover:bg-sky-100'>
                  {message.pvtMsg}
                </p>
              ) : null}
            </section>
            {message.msgImg ? (
              <img src={message.msgImg} alt='chess board' className='max-w-[60px] max-h-[60px]' />
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function App() {
  const [messages, setMessages] = useState(initialMessages);
  const [unreadCount, setUnreadCount] = useState(3);

  const markAllAsRead = () => {
    const updatedMessages = messages.map((message) => ({
      ...message,
      status: "read",
    }));
    setMessages(updatedMessages);
    setUnreadCount(0);
  };

  const markAsRead = (messageId) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === messageId) {
        return { ...message, status: "read" };
      }
      return message;
    });
    setMessages(updatedMessages);
    setUnreadCount(unreadCount - 1);
  };

  const markAsUnread = (messageId) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === messageId) {
        return { ...message, status: "unread" };
      }
      return message;
    });
    setMessages(updatedMessages);
    setUnreadCount(unreadCount + 1);
  };

  useEffect(() => {
    setUnreadCount(
      messages.filter((message) => message.status === "unread").length
    );
  }, [messages]);

  return (
    <article className='max-w-[768px] m-auto bg-white md:p-8 md:rounded-3xl '>
      <section className='flex justify-between m-6'>
        <Notifications unreadCount={unreadCount} />
        <MarkAllAsRead markAllAsRead={markAllAsRead} />
      </section>

      <Messages
        messages={messages}
        markAsRead={markAsRead}
        markAsUnread={markAsUnread}
      />
    </article>
  );
}

export default App;
