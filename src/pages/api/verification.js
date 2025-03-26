import { getUserFingers } from "@/query/get-user-finger";

export default async function handler(req, res) {
    const securityKey = 'helloWorld'
    const time_limit = 15
    const baseUrl = req.headers.host

    try {
        const { user_id } = req.query

        if (!user_id) return res.status(400).send("Missing user_id parameter")
    
        const data = await getUserFingers(user_id)
        const resp = `${user_id};${data[0]?.finger_data};${securityKey};${time_limit};${baseUrl}/api/process-verification;${baseUrl}/api/getac;`
    
        res.send(resp)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}