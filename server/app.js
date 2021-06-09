// *** Importing

const express = require('express')
require('./src/env')
const { webRoutes, adminRoutes } = require('./src/routes')
const path = require('path')
const compression = require('compression')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
// const { connectAllDb } = require('./src/dbConfig/connectionManger')
// const connectionResolver = require('./src/middlewares/connectionResolver')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// const { hasSubDomain } = require('./src/utils/subDomainManger');
// const fileUpload = require('express-fileupload');
// const socketIo = require('socket.io');

// *** App Config  

const PORT = process.env.PORT || 2000
const app = express()
const http = require('http');
const server = http.createServer(app);

// const io = socketIo(server, {
//   cors: {
//     origin: "*"
//   },
//   pingTimeout: 4000,
//   pingInterval: 12000
// });

// global.io = io;
// const SocketManger = require('./src/socketManger/SocketManger')(io);
// *** Middlewares
app.locals.domain = 'geeklone.com'

app.use(
  session({
    secret: 'HSEQ',
    saveUninitialized: true,
    resave: true,
  })
)

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    callback(null, true); // allow these domains
  }
}))

app.use(function (req, res, next) {
  res.locals.session = req.session
  next()
})

app.use(cookieParser())

app.use(flash())

app.use(
  bodyParser.json({
    extended: true,
    limit: '5mb',
  })
)


app.use(bodyParser.urlencoded({ extended: true }));
// app.set('subdomain offset', process.env.SUB_DOMAIN_OFFSETS)

app.use(compression())


app.use('/public', express.static('public'))

// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: '/tmp/'
// }));

// app.use(connectionResolver.resolve)

app.set('views', path.join(__dirname, 'src/views'))





app.engine(
  'hbs',
  handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: __dirname + '/src/views/partials/',
    helpers: {
    }
  })
)

app.set('view engine', 'hbs')

// *** DB Config

// connectAllDb()

// *** API Routes


// Web Routes
app.use('/v1/', webRoutes)
app.use('/v1/admin/', adminRoutes)

app.get('/v1/', (req, res) => {
  res.send('vfcd');
});

//DataBase Backup


// Sub Domains handler Routes
// app.get('*', (req, res) => {
//   if (hasSubDomain(req)) {
//     res.sendFile(path.join(__dirname, './build', 'index.html'))
//   } else {
//     res.redirect(`${process.env.DEFAULT_REDIRECT}`)
//   }
// })
// *** Listen
server.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
