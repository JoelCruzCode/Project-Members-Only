const { body, validationResult } = require("express-validator");

// register form
// first_name, last_name, username, password, confirm_password

// login form
// username, password

// Error messages
const alphaError = "must only contain letters";
const passwordError = "must include one number & one special character";
const confirmPWError = "input must match password field";

function LengthError(min, max) {
  return `must be between ${min} and ${max} characters`;
}

// Validations
const registerValidation = [
  body("first_name")
    .trim()
    .isAlpha()
    .withMessage(`First name: ${alphaError}`)
    .isLength({ min: 3, max: 20 })
    .withMessage(`First name: ${lengthError(3, 20)}`),

  body("last_name")
    .trim()
    .isAlpha()
    .withMessage(`Last name: ${alphaError}`)
    .isLength({ min: 3, max: 20 })
    .withMessage(`Last name: ${lengthError(3, 20)}`),

  body("username")
    .trim()
    .isAlpha()
    .withMessage(`Username: ${alphaError}`)
    .isLength({ min: 3, max: 20 })
    .withMessage(`Username: ${lengthError(3, 20)}`),

  body("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage(`Password: ${lengthError(6, 20)}`)
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character"),

  body("confirm_password")
    .trim()
    .custom((value, { req }) => {
      if (!value === req.body.password) {
        throw new Error(`Confirm Password: ${confirmPWError}`);
      }
      return true;
    })
    .withMessage(`Confirm Password: ${confirmPWError}`),
];

const loginValidation = [
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("password").trim().notEmpty().withMessage("Password is required"),
];

const messageValidation = [
  body("title")
    .trim()
    .isAlpha()
    .withMessage(`${alphaError}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`Title: ${LengthError(1, 30)}`),

  body("text")
    .isLength({ min: 1, max: 300 })
    .withMessage(`Text: ${LengthError(1, 300)}`),
];

const handleValidationErrors = (view) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render(view, {
        errors: errors.array(),
        ...req.body,
      });
    }

    next();
  };
};
module.exports = {
  registerValidation,
  loginValidation,
  messageValidation,
  handleValidationErrors,
};
