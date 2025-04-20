import userServices from "../services/user-services.js";

export const treasuryMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if(!token) {
    return res.status(401).json({
      message: "Akses illegal!"
    });
  }

  const user = await userServices.getUserBasedHashID(token);

  if(!user) {
    return res.status(401).json({
      message: "Akses illegal!"
    });
  }

  if(!user.admin.status) {
    return res.status(401).json({
      message: "Akses illegal!"
    });
  }
  
  if(user.admin.role !== "Bendahara") {
    return res.status(401).json({
      message: "Akses illegal! Anda bukan Bendahara"
    });
  }

  next();
}