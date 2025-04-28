import { db } from "@/query/connect";
import { getFromDB } from "@/query/get";
import { pool } from "@/query/pg-connect";

export default async function handler(req, res) {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "username is empty" });
    }

    // const user = await getFromDB("SELECT username FROM users WHERE username=?", [
    //     username,
    // ]);

    const user = await pool.query('select username from users where username=$1', [username]);
    
    const existUser = user?.rows[0];

    if (existUser) {
        return res.status(429).json({ message: "username already exist" });
    }

    const id = crypto.randomUUID()

    await pool.query('insert into users (id, username) values($1,$2)', [id, username], (err) => {
        if (err) {
            res.status(400).json({ message: `register failed: ${err}` });
            } else {
            res.status(201).json({ message: "user registered" });
            }
    })

    // const stmt = db.prepare("INSERT INTO users (username) VALUES(?)");
    // stmt.run(username, (err) => {
    //     if (err) {
    //     res.status(400).json({ message: `register failed: ${err}` });
    //     } else {
    //     res.status(201).json({ message: "user registered" });
    //     }
    // });
}