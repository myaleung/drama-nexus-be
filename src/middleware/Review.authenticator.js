import * as expressValidator from "express-validator";

export default class ReviewValidator {
  static validate = () => {
    try {
      return [
        expressValidator.body("stars")
          .notEmpty()
          .withMessage("A valid star rating should be provided")
          .isNumeric()
          .isInt({ min: 1, max: 10 })
          .withMessage('Only a value of 1-10 is allowed')
          .trim(),
        expressValidator.body("title")
          .notEmpty()
          .isString()
          .trim()
          .withMessage("Please provide a title for the review"),
        expressValidator.body("description")
          .optional()
          .isString()
          .trim()
          .matches(/^[a-zA-Z0-9\s\.\,\'\!\?\-]+$/)
          .withMessage("Review must contain only letters, numbers, spaces, and punctuation marks")
          .isLength({ min: 5, max: 300 })
          .withMessage("Review must be between 5 and 300 characters"),
        ReviewValidator.handleValidationErrors,
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