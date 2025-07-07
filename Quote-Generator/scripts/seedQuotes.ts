// scripts/seedQuotes.ts
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })
import mongoose from "mongoose"
import { Quote } from "@/models/Quote"


const MONGODB_URI = process.env.MONGODB_URI!
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in environment")

const quotes = [
  { topic: "Success", text: "Success is not final, failure is not fatal: It is the courage to continue that counts." },
  { topic: "Failure", text: "Don't be afraid to fail. Be afraid not to try." },
  { topic: "Courage", text: "Courage doesn't always roar." },
  { topic: "Discipline", text: "Discipline is the bridge between goals and accomplishment." },
  { topic: "Leadership", text: "A leader is one who knows the way, goes the way, and shows the way." },
  { topic: "Persistence", text: "Energy and persistence conquer all things." },
  { topic: "Focus", text: "Starve your distractions, feed your focus." },
  { topic: "Motivation", text: "Push yourself, because no one else is going to do it for you." },
  { topic: "Time", text: "Lost time is never found again." },
  { topic: "Growth", text: "Strength and growth come only through continuous effort and struggle." },
  { topic: "Change", text: "Be the change that you wish to see in the world." },
  { topic: "Hard Work", text: "There are no shortcuts to any place worth going." },
  { topic: "Determination", text: "The future belongs to those who believe in the beauty of their dreams." },
  { topic: "Learning", text: "Live as if you were to die tomorrow. Learn as if you were to live forever." },
  { topic: "Mindset", text: "Whether you think you can or you think you can't, you're right." },
  { topic: "Creativity", text: "Creativity is intelligence having fun." },
  { topic: "Confidence", text: "Believe you can and you're halfway there." },
  { topic: "Patience", text: "Great things take time. Be patient." },
  { topic: "Responsibility", text: "Accountability breeds response-ability." },
  { topic: "Vision", text: "Chase the vision, not the money." },
]

async function seedQuotes() {
  try {
    await mongoose.connect(MONGODB_URI)
    await Quote.deleteMany()
    await Quote.insertMany(quotes)
    console.log("Quotes inserted successfully!")
    process.exit(0)
  } catch (err) {
    console.error("Error inserting quotes:", err)
    process.exit(1)
  }
}

seedQuotes()
