import { getAllFromDB } from "./get-all"

export const getUserFingers = async (user_id) => {
    const data = await getAllFromDB("SELECT * FROM fingers WHERE user_id=?", [
      user_id,
    ])
  
    return data
}