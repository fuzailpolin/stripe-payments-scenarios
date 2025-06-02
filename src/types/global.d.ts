// src/types/global.d.ts

import { MongoClient } from "mongodb";

declare global {
  // Ensure MongoDB client can be globally reused
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export {};
