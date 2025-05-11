import { db, supabaseCl } from "@/query/connect";
import { getFromDB } from "@/query/get";

export default async function handler(req, res) {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "username is empty" });
    }

    // const user = await getFromDB("SELECT username FROM users WHERE username=?", [
    //     username,
    // ]);
    const { data: user } = await supabaseCl.from('users').select('username').eq('username', username)

    if (user.length > 0) {
        return res.status(429).json({ message: "username already exist" });
    }

    const {error} = await supabaseCl.from('users').insert({ username: username })

    if (error) {
        res.status(400).json({ message: `register failed: ${error?.message}` });
        } else {
        res.status(201).json({ message: "user registered" });
        }
    // const stmt = db.prepare("INSERT INTO users (username) VALUES(?)");
    // stmt.run(username, (err) => {
    //     if (err) {
    //     res.status(400).json({ message: `register failed: ${err}` });
    //     } else {
    //     res.status(201).json({ message: "user registered" });
    //     }
    // });
}