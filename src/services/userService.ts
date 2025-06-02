import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function findUserByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection("users").findOne({ email });
}

export async function createUser({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name?: string;
}) {
  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hash(password, 10);

  const newUser = {
    email,
    password: hashedPassword,
    name: name || null,
    createdAt: new Date(),
  };

  const result = await db.collection("users").insertOne(newUser);
  return result.insertedId;
}
