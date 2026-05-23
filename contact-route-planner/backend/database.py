import sqlite3

DB_NAME = "contacts.db"


def get_connection():
    return sqlite3.connect(DB_NAME)


def create_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            street TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip TEXT NOT NULL,
            latitude REAL,
            longitude REAL,
            group_id INTEGER
        )
    """)

    conn.commit()
    conn.close()


def add_contact(name, street, city, state, zip_code, latitude=None, longitude=None, group_id=None):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO contacts (name, street, city, state, zip, latitude, longitude, group_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (name, street, city, state, zip_code, latitude, longitude, group_id))

    conn.commit()
    conn.close()


def get_all_contacts():
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM contacts")
    rows = cursor.fetchall()

    contacts = [dict(row) for row in rows]

    conn.close()
    return contacts