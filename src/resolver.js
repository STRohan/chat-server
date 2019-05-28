// import * as jwt from 'jsonwebtoken';
const jwt = require("jsonwebtoken");
var { user, chat } = require("./constants");
const uuidv4 = require("uuid/v4");
const {pubSub} = require("./server");
// const { find, filter } = require('lodash');

// const key = process.env.KEY;
const key = "qwertyuiopasdfghjklzxcvbnm123456";
console.log("::::::", key);

console.log("hi::", user);

const USER_ADDED = 'USER_ADDED';
const NEW_MESSAGE = 'NEW_MESSAGE';
const MESSAGE_SEND = 'MESSAGE_SEND';

const resolvers = {
  Query: {
    GetUsers: () => {
      console.log("oooooooooooo", user);
      return user;
    },
    AllChat: () => {
      console.log("oooooooooooo", chat);
      return chat;
    },
    GetChat: async (parent, { senderId, receiverId }) => {
      console.log("in get chat");

      const findChat = chat.filter(
        element =>
          (element.senderId === senderId &&
            element.receiverId === receiverId) ||
          (element.senderId === receiverId && element.receiverId === senderId)
      );
      console.log("chat message", findChat);
      return findChat;
    }
  },
  Mutation: {
    AddUser: async (parent, { name, email, password }) => {
      let check = 0;
      user.forEach(item => {
        if (item.email === email) check++;
      });
      if (check !== 0) {
        return { message: "user already exist" };
      } else {
        const newUser = {
          id: uuidv4(),
          name,
          email,
          password
        };
        user.push(newUser);
        const token = await jwt.sign(newUser, key);
        console.log("--", token);
        pubSub.publish(USER_ADDED, { newUser: newUser });
        return {
          message: "user added",
          name: `${newUser.name}`,
          email: `${newUser.email}`,
          token: `${token}`
        };
      }
    },

    AddChat: async  (parent, { message, senderId, receiverId }) => {
let errorMessage = [];

      const senderValid = await user.find(element => element.id === senderId);
      const receiverValid = await user.find(
        element => element.id === receiverId
      );

      if (senderValid === undefined)
        return { status: "the sender does not exist " };
      else if (receiverValid === undefined)
        return { status: "the receiver does not exist" };
      else {
        const newChat = {
          id: uuidv4(),
          senderId,
          receiverId,
          sender: `${senderValid.name}`,
          receiver: `${receiverValid.name}`,
          message
        };
        chat.push(newChat);
        pubSub.publish(NEW_MESSAGE, { newMessage: newChat });
        return {
          sender: newChat.sender,
          receiver: newChat.receiver,
          status: "Message sent successfully" || errorMessage
        };
      }
},
    DeleteChat: async (parent, { senderId, receiverId}) => {
        chat.filter(element => {
          element.senderId === senderId && element.receiverId === receiverId;
          chat.pop();
        });
      return { status: 'Chat Deleted Successfully'};
    },
    DeleteChatBothSide: async (parent, { senderId, receiverId}) => {
        chat.filter(element => {
          (element.senderId === senderId &&
            element.receiverId === receiverId) ||
            (element.senderId === receiverId &&
              element.receiverId === senderId);
          chat.pop();
        });
      return { status: 'Chat Deleted Successfully'};
    }
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubSub.asyncIterator(USER_ADDED),
    },

    messageSent: {
      subscribe: () => pubSub.asyncIterator(MESSAGE_SEND),
    },
  
}
};
module.exports = resolvers;
