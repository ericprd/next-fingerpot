import { db } from "@/query/connect";
import { getFromDB } from "@/query/get";

export default async function handler(req, res) {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "username is empty" });
    }

    const user = await getFromDB("SELECT username FROM users WHERE username=?", [
        username,
    ]);

    if (user) {
        return res.status(429).json({ message: "username already exist" });
    }

    const stmt = db.prepare("INSERT INTO users (username) VALUES(?)");
    stmt.run(username, (err) => {
        if (err) {
        res.status(400).json({ message: `register failed: ${err}` });
        } else {
        res.status(201).json({ message: "user registered" });
        }
    });
}