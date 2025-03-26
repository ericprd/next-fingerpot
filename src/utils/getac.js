import { device } from "@/conf/device";

// get uru4500 device detail by account and serial number
export const getDeviceByAcSn = () => {
    return [
      {
        ac: device.AC,
        sn: device.SN,
        vkey: device.VKEY,
      },
    ];
  };
  
// get uru4500 device detail by serial number
export  const getDeviceBySn = () => {
    return [
      {
        ac: device.AC,
        vkey: device.VKEY,
        vc: device.VC,
      },
    ];
  };