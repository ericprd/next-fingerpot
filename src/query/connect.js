import { createClient } from "@supabase/supabase-js";

const sqlite3 = require("sqlite3").verbose();

export const db = new sqlite3.Database(
  "./data.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    // Error handling for connection
    if (err) {
      return console.error(err.message);
    } else {
      // Success message for successful connection
      console.log("Connected to the SQLite database.");
    }
  }
);

// Serialize runs to ensure sequential execution
db.serialize(() => {
  // Run SQL command to create table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL
    )
  `)

db.run(`
    CREATE TABLE IF NOT EXISTS fingers (
      finger_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      finger_data TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `)
})

export const supabaseCl = createClient('https://ildakvuloleysrlkdajr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZGFrdnVsb2xleXNybGtkYWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5ODE3MzYsImV4cCI6MjA2MjU1NzczNn0.M__oghbs-LsAe76nyNQb50mKt4hNJHKKIyYZ9Nae7JI')