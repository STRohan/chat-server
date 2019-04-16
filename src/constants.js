 let user = [{
     id: 'head@gmail.com.1',
     name: 'head',
     email: 'head@gmail.com',
     password: 'Qwerty@123'
 },
 {
    id: 'head2@gmail.com.2',
     name: 'head2',
     email: 'head2@gmail.com',
     password: 'Qwerty@1234',
},
{
    id: 'head3@gmail.com.3',
    name: 'head3',
    email: 'head3@gmail.com',
    password: 'Qwerty@12345',
}]

let chat = [{
    id: '1234567890',
    senderId: 'head@gmail.com.1',
    receiverId: 'head2@gmail.com.2',
    sender: 'head',
    receiver: 'head2',
    message: 'message successfully sent1 ',
},
{
    id: '12345678901234567890',
    senderId: 'head2@gmail.com.2',
    receiverId: 'head@gmail.com.1',
    sender: 'head2',
    receiver: 'head',
    message: 'message successfully sent2 ',
},
{
    id: '123456789012345678901234567890',
    senderId: 'head2@gmail.com.2',
    receiverId: 'head3@gmail.com',
    sender: 'head2',
    receiver: 'head3',
    message: 'message successfully sent ',
},
]
module.exports = {user, chat};