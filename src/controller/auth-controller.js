import authServices from "../services/auth-services.js";
import mosqueServices from "../services/mosque-services.js";

const register = async (req, res) => {
    try {
        const { data, destination } = req.body;
        data.data.isJamaah = true;
        data.data.isAdmin = false;

        const tokenResponse = await authServices.registerToken(data.data);

        if(destination === "masjid" && tokenResponse.ok) {
          const response = await mosqueServices.create(data.mosqueData);
          data.data.mosque_id = response.id;
          data.data.isAdmin = true;
        }
        
        if(tokenResponse.ok){
          data.data.token = tokenResponse.token;
          const userResponse = await authServices.register(data.data);
          return res.status(userResponse.status).json({
              ...userResponse
          });
        } else {
          throw new ResponseError(500, "Gagal membuat akun!");
        }
        
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
}

const login = async (req, res) => {
    try {
      const user = await authServices.login(req.body.data);
    
      if (user) {
        return res.status(200).json({
          message: "Login berhasil dilakukan",
          user
        });
      } else {
        return res.status(401).json({ message: "email tidak ditemukan atau password yang anda tambahkan salah" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
}

const verify = async (req, res) => {
  try {
    const user = await authServices.verifyAccount(req.body);
    if (user) {
      return res.status(user.status).json({  message: user.message });
    } else {
      return res.status(401).json({ message: "Token tidak valid" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

const findEmail = async (req, res) => {
  try {
    const user = await authServices.findEmail(req.body.data);
    if (user) {
      return res.status(user.status).json({  message: user.message });
    } else {
      return res.status(401).json({ message: "Email tidak ditemukan" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.message });
  }
}

const verifyEmail = async (req, res) => {
  try {
    const user = await authServices.verifyEmail(req.body.data);
    if (user) {
      return res.status(user.status).json({  message: user.message });
    } else {
      return res.status(401).json({ message: "Token tidak valid" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.message });
  }
}

const resetPassword = async (req, res) => {
  try {
    const user = await authServices.resetPassword(req.body.data);
    if (user) {
      return res.status(user.status).json({  message: user.message });
    } else {
      return res.status(401).json({ message: "Reset Password gagal dilakukan. Coba lagi" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.message });
  }
}

const verifyLogin = async (req, res) => {
  try {
    const user = await authServices.verifyLogin(req.body);
    return res.status(user.status).json(user.user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.message });
  }
}

export default {
    register,
    login,
    verify,
    findEmail,
    verifyEmail,
    resetPassword,
    verifyLogin
}