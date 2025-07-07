import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

// Reuse connection if already connected
if (!mongoose.connection.readyState) {
  await mongoose.connect(MONGODB_URI)
}

// Define schema
const QuoteSchema = new mongoose.Schema({
  text: String,
  topic: String,
})

const Quote = mongoose.models.Quote || mongoose.model("Quote", QuoteSchema)

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic")?.toLowerCase()

  if (!topic) {
    return NextResponse.json({ error: "Topic query param is required" }, { status: 400 })
  }

  try {
    // Only fetch quotes that match the topic (case-insensitive)
    const quotes = await Quote.find({
      topic: { $regex: new RegExp(topic, "i") },
    })

    return NextResponse.json(quotes)
  } catch (err) {
    console.error("❌ Error fetching quotes:", err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
