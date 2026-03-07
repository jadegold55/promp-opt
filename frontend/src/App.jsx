import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'


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
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={async () => {
        await handleSubmit();

      }}>
        Submit
      </button>
      <div>
        <h2>Output</h2>
        <p>{output}</p>
      </div>
      <div>
        <h2>History</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item.user_input}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App


