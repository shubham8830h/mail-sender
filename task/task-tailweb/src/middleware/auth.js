const jwt = require("jsonwebtoken");
const loginModel = require("../model/adminModel");

//authentication
const authentication = async function (req, res, next) {
  try {
    token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(400)
        .send({ status: false, message: "Token is missing" });
    }
    decodedToken = jwt.verify(
      token,
      "Admin-student-login-panel",
      (err, decode) => {
        if (err) {
          return res
            .status(400)
            .send({ status: false, message: "Token is not correct!" });
        }
        req.decode = decode;

        next();
      }
    );
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Authorisation

const Authorisation = async function (req, res, next) {
  try {
    let adminId = req.decode.adminId;
    let checkingAdmin = await loginModel.findOne({ _id: adminId });
    if (!checkingAdmin) {
      return res
        .status(404)
        .send({ status: false, message: "this admin is not found" });
    }
    if (checkingAdmin._id != req.decode.adminId) {
      return res
        .status(403)
        .send({ status: false, message: "you are not Authorized person" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { authentication, Authorisation };
