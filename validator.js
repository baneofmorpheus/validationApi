const { body, validationResult } = require("express-validator");
const payLoadValidator = () => {
  console.log("payload");
  return [
    body("rule")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("rule is required.")
      .not()
      .isArray()
      .withMessage("rule should be an object.")
      .not()
      .isString()
      .withMessage("rule should be an object.")
      .not()
      .isNumeric()
      .withMessage("rule should be an object."),

    body("rule.field")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("rule.field is required.")
      .isAlphanumeric()
      .withMessage("rule.field should be a string or number."),

    body("rule.condition")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("rule.condition is required.")
      .isString()
      .withMessage("rule.condition should be a string."),

    body("rule.condition_value")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("rule.condition_value is required.")
      .isAlphanumeric()
      .withMessage("rule.condition_value should be a string or number."),

    body("data")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("data is required.")
      .not()
      .isNumeric()
      .withMessage("data should be an object,array or string."),
  ];
};
const dataValidator = (rule, data) => {
  if (data[rule.field] == undefined) {
    return "MISSING_DATA_FIELD";
  }
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
      return "INVALID_CONDITION_TYPE";
  }
};
const checkForValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res
    .status(400)
    .json({ message: errors.errors[0].msg, status: "error", data: null });
};
const sendValidationResponse = (res, rule, data, validationResult) => {
  switch (validationResult) {
    case true:
      return res.status(200).json({
        message: `field ${rule.field} successfully validated.`,
        status: "success",
        data: {
          validation: {
            error: false,
            field: rule.field,
            field_value: data[rule.field],
            condition: rule.condition,
            condition_value: rule.condition_value,
          },
        },
      });

    case false:
      return res.status(400).json({
        message: `field ${rule.field} failed validation.`,
        status: "error",
        data: {
          validation: {
            error: true,
            field: rule.field,
            field_value: data[rule.field],
            condition: rule.condition,
            condition_value: rule.condition_value,
          },
        },
      });
    case "MISSING_DATA_FIELD":
      return res.status(400).json({
        message: `field ${rule.field} is missing from data.`,
        status: "error",
        data: null,
      });
    case "INVALID_CONDITION_TYPE":
      return res.status(400).json({
        message: `invalid condition type, accepted values are 'gt','gte','contains','eq' and 'neq'`,
        status: "error",
        data: null,
      });
  }
};
module.exports = {
  payLoadValidator,
  checkForValidationErrors,
  dataValidator,
  sendValidationResponse,
};
