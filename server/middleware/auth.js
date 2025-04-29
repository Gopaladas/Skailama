import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "unauthorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
    } else {
      return res.json({ success: false, message: "Id not present" });
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default auth;
