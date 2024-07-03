import * as expressValidator from "express-validator";

export default class ProfileValidator {
  static validate = () => {
    try {
      return [
        expressValidator.body("oldPassword")
          .notEmpty()
          .isString()
          .withMessage("Please provide your current password"),
        expressValidator.body("newPassword")
          .optional({ checkFalsy: true })
          .isString()
          .trim()
          .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
          .withMessage("A valid new password should be provided"),
        expressValidator.body("profileImage")
          .optional()
          .isString()
          .trim()
          .withMessage("A valid image URL should be provided"),
        expressValidator.body("bio")
          .optional()
          .isString()
          .trim()
          .matches(/^[a-zA-Z0-9\s\.\,\!\?\-]+$/)
          .isLength({ min: 5, max: 300 })
          .withMessage("A valid bio should be provided"),
        ProfileValidator.handleValidationErrors,
      ];
    } catch (e) {
      throw new Error(e.message);
    }
  };

  static handleValidationErrors = (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
}