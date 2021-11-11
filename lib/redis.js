import Redis from 'ioredis'

const redis = new Redis({ port: 6378 })

export default redis
