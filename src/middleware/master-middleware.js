import userServices from "../services/user-services.js";

export const masterMiddleware = async (req, res, next) => {
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

  if(!user.master.status) {
    return res.status(401).json({
      message: "Akses illegal!"
    });
  }

  next();
}