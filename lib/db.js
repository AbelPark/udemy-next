import { MongoClient } from "mongodb";

const connectingString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster_name}.3wdls1w.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

export async function connectToDatabase() {
  const client = await MongoClient.connect(connectingString);
  return client;
}
