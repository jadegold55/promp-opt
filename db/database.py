import sqlite3





def init_db():
    sql_file = "db/schema.sql"
    with open(sql_file, 'r') as File:
        sql_script = File.read()
    conn = get_db()
    cursor = conn.cursor()
    cursor.executescript(sql_script)
    conn.commit()
    conn.close()

def get_db():
    conn = sqlite3.connect("database.db")
    return conn

def save_history(user_input,optimized_prompt):
    sql = "INSERT INTO history (user_input, optimized_prompt) VALUES (?, ?)"
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(sql,(user_input,optimized_prompt))
    conn.commit()
    conn.close()

def get_history():

    conn = get_db()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    query = "SELECT * FROM history"
    cursor.execute(query)
    rows = [dict(row) for row in cursor.fetchall()]

    return rows
    
    




    
