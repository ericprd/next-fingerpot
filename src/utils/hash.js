export const hash = (params) =>
    require("crypto").createHash("md5").update(params).digest("hex");