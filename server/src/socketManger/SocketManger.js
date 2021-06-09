
var users = require('./users');
const socketToRoom = {};

const SocketManger = (io) => {
    io.on('connection', (socket) => {

        socket.on("join", subdomain => {
            if (users[subdomain]) {
                users[subdomain].push(socket.id);
            } else {
                users[subdomain] = [socket.id];
            }
            socketToRoom[socket.id] = subdomain;

        });




        socket.on('disconnect_user', () => {
            const subdomain = socketToRoom[socket.id];
            let domainUsers = users[subdomain];
            console.log(domainUsers, 'disconnect')
            if (domainUsers) {
                domainUsers = domainUsers.filter(id => id !== socket.id);
                users[subdomain] = domainUsers;
            }

        });

        socket.on('disconnect', () => {
            const subdomain = socketToRoom[socket.id];
            let domainUsers = users[subdomain];
            if (domainUsers) {
                domainUsers = domainUsers.filter(id => id !== socket.id);
                users[subdomain] = domainUsers;
            }

        });



    });
}
module.exports = SocketManger;