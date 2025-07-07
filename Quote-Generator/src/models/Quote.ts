// models/Quote.ts
import mongoose from "mongoose"

const QuoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
})

export const Quote = mongoose.models.Quote || mongoose.model("Quote", QuoteSchema)
