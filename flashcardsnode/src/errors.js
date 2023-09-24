const HttpStatus = require("http-status-codes");

module.exports = VALIDATION_ERROR = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Some data submitted are invalid",
  name: "VALIDATION_ERROR",
};

module.exports = EMAIL_INVALID = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Invalid Email",
  name: "EMAIL_INVALID",
};

module.exports = EMAIL_USED = {
  statusCode: HttpStatus.CONFLICT,
  message: "Email is already used",
  name: "EMAIL_USED",
};

module.exports = SOCIAL_ACCOUNT_USED = {
  statusCode: HttpStatus.CONFLICT,
  message: "Social Account is already used",
  name: "SOCIAL_ACCOUNT_USED",
};

module.exports = ACCESS_UNAUTHORIZED = {
  statusCode: HttpStatus.UNAUTHORIZED,
  message: "Unauthorized access",
  name: "ACCESS_UNAUTHORIZED",
};

module.exports = USER_INACTIVE = {
  statusCode: HttpStatus.UNAUTHORIZED,
  message: "Inactive user",
  name: "USER_INACTIVE",
};

module.exports = CURRENT_PASSWORD_INVALID = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Current password provided is wrong",
  name: "CURRENT_PASSWORD_INVALID",
};

module.exports = OBJECT_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: "Requested resource not found",
  name: "OBJECT_NOT_FOUND",
};

module.exports = OFFICE_NAME_USED = {
  statusCode: HttpStatus.CONFLICT,
  message: "Name is already used",
  name: "OFFICE_NAME_USED",
};

module.exports = COUPON_OR_ALIAS_NAME_USED = {
  statusCode: HttpStatus.CONFLICT,
  message: "Coupon or alias name is already used",
  name: "COUPON_OR_ALIAS_NAME_USED",
};

module.exports = PROPERTY_NAME_USED = {
  statusCode: HttpStatus.CONFLICT,
  message: "Name is already Used",
  name: "PROPERTY_NAME_USED",
};

module.exports = NO_PROPERTY_ASSIGNED = {
  statusCode: HttpStatus.NOT_FOUND,
  message: "No assigned property is found",
  name: "NO_PROPERTY_ASSIGNED",
};

module.exports = NAME_INVALID = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Invalid Name",
  name: "NAME_INVALID",
};

module.exports = NOT_ALLOWED_DEACTIVATION = {
  statusCode: HttpStatus.FORBIDDEN,
  message: "Self Deactivation Not Allowed",
  name: "NOT_ALLOWED_DEACTIVATION",
};

module.exports = NO_KEY_RELEASE_SIGNED = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Key release has not signed",
  name: "NO_KEY_RELEASE_SIGNED",
};

module.exports = COUPON_INVALID = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Invalid",
  name: "COUPON_INVALID",
};

module.exports = COUPON_EXPIRED = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Expired",
  name: "COUPON_EXPIRED",
};
module.exports = COUPON_USES_EXCEEDED = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Number of uses exceeded",
  name: "COUPON_USES_EXCEEDED",
};

module.exports = PAYMENT_ALREADY_PROCESSED = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Payment has already processed",
  name: "PAYMENT_ALREADY_PROCESSED",
};

module.exports = PAYMENT_ALREADY_REFUNDED = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Payment has already refunded",
  name: "PAYMENT_ALREADY_REFUNDED",
};

module.exports = BOOKING_ALREADY_CANCELED = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Booking is already canceled",
  name: "BOOKING_ALREADY_CANCELED",
};

module.exports = NO_PAYMENT_OPTION = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "User has not setup payment option",
  name: "NO_PAYMENT_OPTION",
};

module.exports = OPERATION_INVALID = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Invalid operation",
  name: "OPERATION_INVALID",
};

module.exports = RECURRING_BOOKING_ALREADY_EXISTS = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: "Recurring booking has already exists",
  name: "RECURRING_BOOKING_ALREADY_EXISTS",
};
