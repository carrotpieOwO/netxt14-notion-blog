import { MongoClient, MongoClientOptions } from 'mongodb'

declare const global: any & { _mongo?: MongoClient };
const url = process.env.NEXT_APP_MONGODB_URL;
const options = {}

let connectDB: MongoClient | Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }