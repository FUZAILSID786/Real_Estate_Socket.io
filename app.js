import {Server} from "socket.io"

const io = new Server({
    cors:{
        origin:"http://localhost:5173",
    }
})

let onlineUsers = []

const addUser = (userId,socketId) => {
    const userExists = onlineUsers.find(user => user.userId === userId);
    if(!userExists){
        onlineUsers.push({userId,socketId});
    }
}

const removeUser = (socketId) =>{
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
}

const getUser = (userId) =>{
    return onlineUser.find(user=>user.userid === userId); 
}

io.on("connection", (socket)=>{
    socket.on("newUser", (userId)=>{
        addUser(userId,socket.Id)
    })
})


io.on("sendMessage",({receiverId,data})=>{
    const receiver = getUser(receiverId);
    io.to(receiver.socketId).emit("getMessage",data);
})

io.on("disconnect",()=>{
    removeUser(socket.id);
})

io.listen(4000); 