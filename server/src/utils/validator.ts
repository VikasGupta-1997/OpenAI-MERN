import { body, ValidationChain, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations in parallel
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Collect errors after all validations are done
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Return all validation errors
    return res.status(422).json({ errors: errors.array() });
  };
};

export const signupValidator = [
    body("name").notEmpty().withMessage("Name cannot be empty"),
    body("email").trim().isEmail().withMessage("Email cannot be empty"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
]