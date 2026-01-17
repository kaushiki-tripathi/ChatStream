const chats=[
  {
    isGroupChat:false,
    users:[
      {
        name:"Kaushiki Tripathi",
        email:"kaush@gmail.com",
      },
      {
        name:"Amit",
        email:"amit@gmail.com",
      }
    ],
    _id:"617a077e18c25468bc7c4dd4",
    chatName:"Kaushiki Tripathi",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Guest User",
        email: "guest@example.com",
      },
      {
        name: "Palak",
        email: "palak@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Guest User",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Alok",
        email: "alok@example.com",
      },
      {
        name: "Palak",
        email: "palak@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Alok",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Amit",
        email: "amit@gmail.com",
      },
      {
        name: "Palak",
        email: "palak@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Amit",
        email: "amit@gmail.com",
      },
      {
        name: "Palak",
        email: "palak@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Amit",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Amit",
        email: "amit@gmail.com",
      },
      {
        name: "Palak",
        email: "palak@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Close Friends",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
]


module.exports={chats};