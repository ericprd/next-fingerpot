import { useEffect, useState } from "react"

export default function Users() {
    const [users, setUsers] = useState([])

    function clickHandler(userID) {
        const baseUrl = window.location.host
        console.log(baseUrl)
        const registrationUrl = btoa(`${baseUrl}/api/register?user_id=${userID}`)
    
        // finspot is used to spawn fingerspot app
        // FingerspotReg is the function to register fingerprint in finspot
        const fingerspotUrl = `finspot:FingerspotReg;${registrationUrl}`
    
        try {
            // after the fingerspotUrl is valid, then redirect it to the url
            window.location.href = fingerspotUrl
        } catch (error) {
            console.log(error)
        }
      }

    function clickHandler(userID) {
        const baseUrl = window.location.host
        const verificationUrl = btoa(`${baseUrl}/api/verification?user_id=${userID}`)
    
        // finspot is used to spawn fingerspot app
        // FingerspotReg is the function to register fingerprint in finspot
        const fingerspotUrl = `finspot:FingerspotVer;${verificationUrl}`
    
        try {
            // after the fingerspotUrl is valid, then redirect it to the url
            window.location.href = fingerspotUrl
        } catch (error) {
            console.log(error)
        }
      }

    async function getUsers() {
        try {
            const data = await fetch('/api/get-users', {
                method: 'GET'
            })
            const usersData = await data.json()

            setUsers(usersData?.data)
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        getUsers()
    }, [])

    console.log(users)

    return (
        <table className="border-separate table-auto border-spacing-5">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Register Fingerprint</th>
                    <th>Login</th>
                </tr>
            </thead>

            <tbody>
                {users?.map((user) => (
                    <tr key={user.id} className="border">
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>
                            <button className="cursor border rounded p-1 text-xs" onClick={() => clickHandler(user.id)}>Scan</button>
                        </td>
                        <td>
                            <button className="cursor border rounded p-1 text-xs" onClick={() => clickHandler(user.id)}>Login</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}