export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || '91caa1be-41ca-4878-afd1-e3fc265c7d76'
}
