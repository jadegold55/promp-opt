import { useState } from 'react'
import { useEffect } from 'react'
import './index.css'


function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [history, setHistory] = useState([])

  useEffect(() => {
    async function fetchHistory() {
      const response = await fetch('http://localhost:5000/history')
      const data = await response.json();
      setHistory(data.rows);
    }
    fetchHistory();
  }, []);

  async function handleSubmit() {
    //send request to API
    const optimized_prompt = await fetch('http://localhost:5000/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ user_input: input }),
    })
    const data = await optimized_prompt.json();
    setOutput(data.optimized_prompt);




  } return (
    <div className="bg-gray-900 h-screen flex">

      {/* Left Sidebar - History */}
      <aside className="w-64 bg-gray-800 p-4 overflow-y-auto flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-300 mb-2">History</h2>
        {history.map((item, index) => (
          <div key={index} className="bg-gray-700 rounded p-2 text-sm text-gray-300 cursor-pointer hover:bg-gray-600">
            {item.user_input}
          </div>
        ))}
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col p-8 gap-4">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Prompt Optimizer</h1>
          <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">Login</button>
        </div>

        {/* Input */}
        <textarea
          className="w-full bg-gray-800 text-white rounded p-3 resize-none outline-none border border-gray-700 focus:border-blue-500"
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe what you want your prompt to do..."
        />
        <button
          onClick={handleSubmit}
          className="self-start bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-semibold"
        >
          Optimize
        </button>

        {/* Output */}
        {output && (
          <div className="bg-gray-800 border border-gray-700 rounded p-4 text-gray-200 whitespace-pre-wrap">
            {output}
          </div>
        )}

      </main>
    </div>
  )
}

export default App


