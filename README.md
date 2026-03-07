# Prompt Optimizer

A full-stack app that turns rough user instructions into cleaner, structured AI prompts and stores a prompt history.

- **Backend:** Flask API + SQLite
- **Frontend:** React (Vite)
- **LLM provider:** Groq API (`llama-3.3-70b-versatile`)

## Features

- Optimize a raw prompt via `POST /optimize`
- Persist every optimized prompt to SQLite
- View previous prompts via `GET /history`
- Simple React UI for submit + history viewing

## Project Structure

```text
.
├── app/
│   ├── __init__.py
│   ├── promp_builder.py
│   └── routes.py
├── db/
│   ├── database.py
│   └── schema.sql
├── frontend/
│   └── ... (React + Vite app)
├── tests/
│   └── test_routes.py
├── run.py
└── requirements.txt
```

## Prerequisites

- Python 3.10+
- Node.js 18+
- A Groq API key

## Backend Setup (Flask)

1. Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
pip install groq
```

> `groq` is used by `app/promp_builder.py`. If it is missing from `requirements.txt`, install it manually as shown above.

3. Add environment variables in a `.env` file at the project root:

```env
GROQ_API_KEY=your_groq_api_key
```

4. Run the backend:

```bash
python run.py
```

The API will be available at `http://localhost:5000`.

## Frontend Setup (React)

From the `frontend/` directory:

```bash
npm install
npm run dev
```

By default, Vite runs on `http://localhost:5173`.

## API Endpoints

### `POST /optimize`

Request body:

```json
{
  "user_input": "write me a cover letter for a software internship"
}
```

Success response:

```json
{
  "optimized_prompt": "..."
}
```

Validation errors:

- `400` when JSON is missing
- `400` when `user_input` is empty/missing

### `GET /history`

Response:

```json
{
  "rows": [
    {
      "id": 1,
      "user_input": "...",
      "optimized_prompt": "...",
      "uploaded_at": "..."
    }
  ]
}
```

## Running Tests

```bash
pytest -q
```

## Notes

- The SQLite file is created as `database.db` in the project root.
- Database schema is initialized when running `python run.py`.
