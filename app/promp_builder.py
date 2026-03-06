
import os
from dotenv import load_dotenv

load_dotenv()

from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))





def build_prompt(user_input: str) -> str:
    response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {"role": "system", "content": """You are an expert prompt engineer. 
            When a user gives you a rough description of what they want to accomplish, 
            your job is to rewrite it as a clear, optimized prompt they can paste into any AI assistant.

            A good prompt uses CO-STAR principles and has the following labeled sectoins:
            Context: background info 
            Objective: what the task is 
            Style: wrtiting style  
            Tone: attitude
            Audience: who is it for 
            Response format: how the output should look
        
        Each section should be filled in based on the user's input.

            Return ONLY the optimized prompt, nothing else. No explanation, no preamble."""},
        {"role": "user", "content": user_input}
    ]
)   
    print(response.choices[0].message.content)
    return response.choices[0].message.content

