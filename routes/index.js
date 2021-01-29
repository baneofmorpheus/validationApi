const express = require("express");
const users = require("./users");

const router = express.Router();

router.use(express.json());
router.use("/", async (req, res) => {
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
router.post("/validate-rule", async (req, res) => {
  const { rule, data } = req.body;
  switch (rule.condition) {
    case "eq":
      return data[rule.field] === rule.condition_value;

    case "neq":
      return data[rule.field] !== rule.condition_value;

    case "gt":
      return data[rule.field] > rule.condition_value;

    case "gte":
      return data[rule.field] >= rule.condition_value;

    case "contains":
      return data[rule.field].includes(rule.condition_value);

    default:
      return res.status(400).json({
        message: "condition doesn't match any known type.",
        status: "error",
        data: null,
      });
  }
});

module.exports = router;
