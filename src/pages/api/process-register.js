import { db } from "@/query/connect";
import { getFromDB } from "@/query/get"
import { getDeviceBySn } from "@/utils/getac"
import { hash } from "@/utils/hash"

export default async function handler(req, res) {
    const { RegTemp } = req.body;

    if (!RegTemp) return res.status(400).send("missing RegTemp parameter")

    // split the RegTemp by ';'
    // the index 0 will be vStamp
    // index 1 is the device serial number
    // index 2 is the user id
    // and index 3 is the finger data
   try {
    const data = RegTemp.split(";")
    const vStamp = data[0];
    const sn = data[1];
    const user_id = data[2];
    const regTemp = data[3];

    // get device by serial number
    const device = getDeviceBySn()

    if (!device || device.length === 0)
        return res.status(404).send("Device not found")

    // hash it, this is will be the data that we stored in our DB
    const salt = hash(device[0].ac + device[0].vkey + regTemp + sn + user_id)

    // check if the hashed value is equal to vStamp
    if (vStamp?.toUpperCase() === salt.toUpperCase()) {
        // check the finger id that registered to the user
        const { fid } = await getFromDB(
            "SELECT MAX(finger_id) as fid FROM fingers WHERE user_id=?",
            [user_id],
        )

        // if the finger id is empty then the user has not registered their finger
        if (fid === 0 || !fid) {
            const stmt = db.prepare(
                "INSERT INTO fingers (user_id, finger_data) VALUES(?,?)",
            )
            stmt.run(user_id, regTemp, (err) => {
                if (err) {
                    res.send("error")
                } else {
                    res.send("success")
                }
            })
        } else {
            res.status(429).json({ message: "Template already exist" })
        }
    }
   } catch (error) {
    console.log(error)
   }
}