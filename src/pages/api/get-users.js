import { supabaseCl } from "@/query/connect"

export default async function handler(req, res) {
    const method = req.method
    if (method?.toLowerCase() === 'get') {
        try {
            // const users = await getAllFromDB('select * from users')
            const { data: users } = await supabaseCl.from('users').select('*')

            res.setHeader('Cache-Control', 'no-store, max-age=0')
            res.setHeader('Content-Type', 'application/json')

            // console.log(users)
    
            return res.status(200).json({ data: users })
          } catch (error) {
            console.log(error)
            res.status(500).send("Server Error")
          }
    }
  }
  