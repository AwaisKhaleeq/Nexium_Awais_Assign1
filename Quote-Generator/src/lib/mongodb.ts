import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in environment")

export async function connectToDB() {
  if (mongoose.connection.readyState === 1) return
  return mongoose.connect(MONGODB_URI)
}
