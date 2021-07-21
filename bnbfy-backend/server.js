const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')

const app = express()
const http = require('http').createServer(app)

const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})
// Express App Config
app.use(express.json())
app.use(session)
// process.env.NODE_ENV = 'production'
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
    // process.env.PORT = 80
} else {
    const corsOptions = {
        origin: ['*'],
        credentials: true
    }
    app.use(cors(corsOptions))
}
console.log('process.env.NODE_ENV :', process.env.NODE_ENV )

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const orderRoutes = require('./api/order/order.routes')
const stayRoutes = require('./api/stay/stay.routes')
const { connectSockets } = require('./services/socket.service')

// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

// TODO: check with app.use
app.get('/api/setup-session', (req, res) =>{
    req.session.connectedAt = Date.now()
    console.log('setup-session:', req.sessionID);
    res.end()
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/stay', stayRoutes)
connectSockets(http, session)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')

const port = process.env.PORT || 3030
console.log('port:', port)
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
    console.log('process.env.NODE_ENV :', process.env.NODE_ENV )
    
})

console.log('I am Here!, am I??')



