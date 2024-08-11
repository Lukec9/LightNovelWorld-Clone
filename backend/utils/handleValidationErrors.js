import { validationResult } from "express-validator";

// Custom error formatter to only return the error message
const errorFormatter = ({ msg }) => {
  return msg;
};

// Function to handle validation results with custom error formatting
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

export default handleValidationErrors;
