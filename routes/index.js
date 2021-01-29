const express = require("express");
const {
  payLoadValidator,
  dataValidator,
  checkForValidationErrors,
  sendValidationResponse,
} = require("../validator");

const router = express.Router();

router.use(express.json());
router.get("/", async (req, res) => {
  res.status(200).json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Leon Chux",
      github: "@baneofmorpheus",
      email: "epicgenii18@gmail.com",
      mobile: "08101209762",
      twitter: "@mansa_morpheus",
    },
  });
});
router.post(
  "/validate-rule",
  payLoadValidator(),
  checkForValidationErrors,
  async (req, res) => {
    const { rule, data } = req.body;
    const validationResult = dataValidator(rule, data);
    sendValidationResponse(res, rule, data, validationResult);
  }
);
module.exports = router;
