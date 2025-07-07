// app/api/quotes/route.ts
import { connectToDB } from "@/lib/mongodb"
import { Quote } from "@/models/Quote"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  await connectToDB()
  const quotes = await Quote.find().limit(3)
  return NextResponse.json(quotes)
}

export async function POST(req: NextRequest) {
  const { text, topic } = await req.json()
  if (!text || !topic) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  await connectToDB()
  const newQuote = await Quote.create({ text, topic })
  return NextResponse.json(newQuote)
}
