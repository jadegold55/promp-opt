const BASE_URL = 'http://localhost:5000'

export async function optimizePrompt(userInput) {
    const response = await fetch(`${BASE_URL}/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input: userInput }),
    })
    const data = await response.json()
    return data.optimized_prompt
}

export async function fetchHistory() {
    const response = await fetch(`${BASE_URL}/history`)
    const data = await response.json()
    return data.rows
}