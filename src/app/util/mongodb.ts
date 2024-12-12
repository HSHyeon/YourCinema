import { MongoClient, Db } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');
const dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // MongoDB 클라이언트 연결
  const client = await MongoClient.connect(process.env.MONGODB_URI || '');
  const db = client.db(dbName); // db의 타입을 Db로 지정

  // 클라이언트와 db 캐시
  cachedClient = client;
  cachedDb = db;

  return { client, db };
};
