const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("./users");


const router = express.Router();

router.use(express.json());
router.use("/users", users);

// router.use(async function (req, res, next) {
//   try {
//     const bearer_signature = req.headers.authorization.substring(0, 7);
//     if (bearer_signature != "Bearer ") {
//       return res.status(400).json({ error: "Invalid token" });
//     }
//     const token = req.headers.authorization.substring(7);
//     let decoded_value = await jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded_value.role != "admin" && decoded_value.role != "editor")
//       return res
//         .status(401)
//         .json({ message: "Invalid Token,Unauthorized access" });
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid Token,Unauthorized access" });
//   }
// });



module.exports = router;
