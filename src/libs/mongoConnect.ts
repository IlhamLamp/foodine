import { MongoClient } from 'mongodb';

// Ensure DATABASE_URL environment variable is defined
if (!process.env.DATABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "DATABASE_URL"');
}

const uri = process.env.DATABASE_URL;
const options = {};

// Use a type for the client promise
type ClientPromise = Promise<MongoClient>;

let clientPromise: ClientPromise;

if (process.env.NODE_ENV === 'development') {
  // Use a global variable for HMR in development, but add typing for safety
  const globalMongoClientPromise = global as { _mongoClientPromise?: ClientPromise };

  if (!globalMongoClientPromise._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    globalMongoClientPromise._mongoClientPromise = client.connect();
  }

  clientPromise = globalMongoClientPromise._mongoClientPromise;
} else {
  // Instantiate client and connect in production
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;