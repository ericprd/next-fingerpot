import { getAllFromDB } from "@/query/get-all"
import { pool } from "@/query/pg-connect"

export default async function handler(req, res) {
    const method = req.method
    if (method?.toLowerCase() === 'get') {
        try {
            // const users = await getAllFromDB('select * from users')
            const users = await pool.query('select * from users')

            res.setHeader('Cache-Control', 'no-store, max-age=0')
            res.setHeader('Content-Type', 'application/json')
    
            return res.status(200).json({ data: users?.rows })
          } catch (error) {
            console.log(error)
            res.status(500).send("Server Error")
          }
    }
  }
  