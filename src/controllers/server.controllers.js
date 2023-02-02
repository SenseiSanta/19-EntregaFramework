import session from 'express-session';
import connectMongo from 'connect-mongo'
import * as dotenv from 'dotenv'
dotenv.config();

const MongoStore = connectMongo.create({
  mongoUrl: process.env.MONGO_URL,
  ttl: 600,
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
})

const sessionMiddleware = (session({
    store: MongoStore,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
  }))

const wrap = (expressMiddleware) => (socket, next) => {
    expressMiddleware(socket.request, {}, next)
}

export { sessionMiddleware, wrap }