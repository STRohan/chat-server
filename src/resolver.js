// import * as jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken')
var user = require('./constants');

// const key = process.env.KEY;
const key = 'qwertyuiopasdfghjklzxcvbnm123456';
console.log('::::::', key)


console.log('hi::',user)
const resolvers = {
    Query: {
        GetUsers: () => {
            console.log('oooooooooooo', user);
            return user
        }
        
    },
    Mutation: {
        AddUser : async (parent, {name, email, password}) => {
        let count = user.length;
        let check = 0;
        user.forEach(item => {
            if(item.email === email)
            check++;
        }) 
        console.log('::', check)
        if (check !== 0)
        {
        return 'user already exist';
        }
        else{
        const newUser={
                id: `${email}.${count+1}`,
                name,            
                email,
                password,
            }
            user.push(newUser)
            const token = await jwt.sign(newUser, key);
            console.log('--', token);
            return `user added  and your token is :  ${token}`;
        }}
    }
  };

  module.exports = resolvers;