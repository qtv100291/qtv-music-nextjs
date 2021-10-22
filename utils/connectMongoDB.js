import { MongoClient } from 'mongodb'

export default async function connectMongoDB(databaseName){
  // const user = process.env.NEXT_PUBLIC_MONGODB_USER
  const password = process.env.NEXT_PUBLIC_MONGODB_PASSWORD
  // const url = `mongodb+srv://qtvSub:${password}@cluster0.upom7.mongodb.net/${databaseName}?retryWrites=true&w=majority`
  const url = `mongodb+srv://qtvmusicadmin:${password}@cluster0.bjfuk.mongodb.net/${databaseName}?retryWrites=true&w=majority`
  // console.log(url)
  const client = new MongoClient(url)
  await client.connect()
  return client
}