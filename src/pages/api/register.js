export default async function handler(req, res) {
    const securityKey = 'helloWorld'
    const time_limit = 15
    const baseUrl = req.headers.host
    try {
        const { user_id } = req.query
  
        if (!user_id) return res.status(400).send("Missing user_id parameter")
    
        const base_path = `${baseUrl}`
    
        // this response will be used by fingerspot
        // the format will be
        // <id user>;<the security key for hashing>;<time limit to get finger data>;<route to process finger data from fingerspot>;<route to get device detail>
        const response = `${user_id};${securityKey};${time_limit};${base_path}/api/process-register;${base_path}/api/getac`
    
        // send it as response and the fingerspot will access it automatically
        res.send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
}