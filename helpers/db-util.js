import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://udemy-test:dgoJkT4NEaFb6YJO@cluster0.3wdls1w.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort, find) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(find)
    .sort(sort)
    .toArray();
  return documents;
}
