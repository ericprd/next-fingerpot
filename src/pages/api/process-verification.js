import { pool } from "@/query/pg-connect";
import { getDeviceBySn } from "@/utils/getac";

export default async function handler() {
    const { VerPas } = req.body;

  try {
    if (!VerPas) return res.status(400).send("missing VerPas parameter");
    const data = VerPas.split(";");
    const user_id = data[0];
    const vStamp = data[1];
    const time = data[2];
    const sn = data[3];

    // const finger = await getUserFingers(user_id);
    const fingers = await pool.query('select * from fingers where user_id = $1', [user_id]);

    const finger = fingers.rows;

    const device = await getDeviceBySn();

    const salt = hash(
        sn +
        finger[0]?.finger_data +
        device[0].vc +
        time +
        user_id +
        device[0].vkey,
    );

    if (vStamp?.toUpperCase() === salt.toUpperCase()) {
        res.send(`berhasil`);
    } else {
        res.send(`failed`);
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Server Error")
  }
}