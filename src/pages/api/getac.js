import { getDeviceByAcSn } from "@/utils/getac";

export default function handler(_req, res) {
    try {
        // get the device detail by account and serial number
        const data = getDeviceByAcSn()
        if (data.length > 0) res.send(`${data[0].ac}${data[0].sn}`)
        else res.status(404).send("No Data Found")
      } catch (error) {
        res.status(500).send("Server Error")
      }
  }
  