import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import '../index.css'
import { optimizePrompt, fetchHistory } from '../services/api'


function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [history, setHistory] = useState([])
  const textareaRef = useRef(null)

  useEffect(() => {
    async function loadHistory() {
      const rows = await fetchHistory()
      setHistory(rows)
    }
    loadHistory()
  }, [])

  async function handleSubmit() {
    const result = await optimizePrompt(input)
    setOutput(result)
  }
  function handleInput(e) {
    setInput(e.target.value)

    const el = textareaRef.current
    el.style.height = 'auto'        // reset first so it can shrink back down
    el.style.height = el.scrollHeight + 'px'  // then grow to fit content
  }

  return (
    <div className="bg-black h-screen flex text-[#33ff33]"> {/* Main background  */}

      {/* Left Sidebar - History */}
      <aside className="w-64 bg-black border-r border-gray-800 p-4 overflow-y-auto flex flex-col gap-2">
        <h2 className="text-sm font-bold text-[#33ff33] mb-2 uppercase tracking-tighter opacity-70">
          System History
        </h2>
        {history.map((item, index) => (
          <div key={index} className="border border-gray-900 rounded p-2 text-xs hover:border-[#33ff33] hover:text-[#33ff33] transition-colors cursor-pointer">
            {item.user_input}
          </div>
        ))}
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col p-8 gap-4 bg-black">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#33ff33] drop-shadow-[0_0_8px_#33ff33] uppercase tracking-widest">
            Prompt Optimizer
          </h1>
          <button className="border border-[#33ff33] text-[#33ff33] px-4 py-1 rounded text-xs uppercase hover:bg-[#33ff33] hover:text-black transition-all">
            Login
          </button>
        </div>

        {/* Output Area */}
        {output && (
          <div className="bg-black border border-[#33ff33]/30 rounded p-4 text-[#33ff33] whitespace-pre-wrap font-mono text-sm shadow-[inset_0_0_10px_rgba(51,255,51,0.1)]">
            {output}
          </div>
        )}

        {/* Input Area (Pinned to bottom) */}
        <div className="mt-auto flex items-center justify-center gap-3 w-full pb-4">
          <textarea
            className="w-1/2 h-10 bg-black text-[#33ff33] rounded-full px-6 py-2 resize-none outline-none border border-[#33ff33]/50 focus:border-[#33ff33] font-mono text-sm shadow-[0_0_5px_rgba(51,255,51,0.2)] overflow-hidden"
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInput}
            placeholder="ENTER COMMAND..."
          />
          <button
            onClick={handleSubmit}
            className="bg-[#33ff33] text-black px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-[#28cc28]"
          >
            Optimize
          </button>
        </div>
      </main>
    </div>
  )
}

export default App


