"use client"

import { useState } from "react"

type Quote = {
  _id: string
  text: string
  topic: string
}

export default function Home() {
  const [topic, setTopic] = useState("")
  const [quotes, setQuotes] = useState<Quote[]>([])

  const fetchQuotes = async () => {
    if (!topic.trim()) return
    const res = await fetch(`/api/quotes?topic=${encodeURIComponent(topic)}`)
    const data = await res.json()
    setQuotes(data)
  }

  return (
    <div
      className="min-h-screen p-8 flex items-center justify-center"
      style={{
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        color: "#e0e0e0"
      }}
    >
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-white drop-shadow-lg">
          Motivational Quote Generator
        </h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter a topic (e.g. time, courage)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="input input-bordered w-full text-black"
          />
          <button
            onClick={fetchQuotes}
            className="px-4 py-2 rounded font-semibold shadow"
            style={{
              backgroundColor: "#39ff14",
              color: "#000",
              border: "2px solid #00ff88"
            }}
          >
            Search
          </button>
        </div>

        <ul className="space-y-4">
          {quotes.map((quote) => (
            <li
              key={quote._id}
              className="p-4 rounded shadow-lg"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#ccc"
              }}
            >
              <p className="text-lg font-medium">{quote.text}</p>
              <span className="text-sm text-gray-400">Topic: {quote.topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
