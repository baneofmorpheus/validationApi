const { body } = require("express-validator");
const payLoadValidator = () => {
  return [
    body("rule")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("rule is required."),
    body("rule.field")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("rule.field is required.")
      .isAlphanumeric()("rule.field should be a string or number."),
    body("rule.condition")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("rule.condition is required.")
      .isString()("rule.condition should be a string."),
    body("rule.condition_value")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("rule.condition_value is required.")
      .isAlphanumeric()("rule.condition_value should be a string or number."),
  ];
};
