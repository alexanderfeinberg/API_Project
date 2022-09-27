const { validationResult } = require("express-validator");

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);
  console.log(validationErrors);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);
    const err = Error("Bad request.");
    err.message = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }

  next();
};

module.exports = {
  handleValidationErrors,
};