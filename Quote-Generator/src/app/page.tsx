"use client"

import { useState, useEffect } from "react"

// ✅ Define the Quote type
type Quote = {
  _id?: string
  text: string
  topic: string
}

export default function Home() {
  const [topic, setTopic] = useState("")
  const [quotes, setQuotes] = useState<Quote[]>([])

  // 🔁 Load quotes on page load
  useEffect(() => {
    fetchQuotes()
  }, [])

  // 🔄 Fetch latest 3 quotes
  async function fetchQuotes() {
    const res = await fetch("/api/quotes")
    const data = await res.json()
    setQuotes(data)
  }

  // ➕ Submit a new quote with topic
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const quoteText = `Motivational quote about ${topic}`

    await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: quoteText, topic }),
    })

    setTopic("")
    fetchQuotes()
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🚀 Quote Generator</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Generate Quote
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">✨ Latest Quotes</h2>
        {quotes.length === 0 && <p>No quotes yet.</p>}
        {quotes.map((quote, idx) => (
          <div key={quote._id || idx} className="bg-base-200 p-4 rounded mb-4 shadow">
            <p className="text-lg font-medium">❝ {quote.text} ❞</p>
            <p className="text-sm text-gray-500 mt-2">Topic: {quote.topic}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
