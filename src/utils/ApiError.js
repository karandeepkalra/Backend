class ApiError extends Error {
    // This class extends the built-in JavaScript Error class
    // So it behaves like a normal error but with extra custom fields

    constructor(
        statusCode,                 // HTTP status code (e.g. 400, 404, 500)
        message = "Something went wrong", // Default error message
        errors = [],                // Optional: array of detailed errors (validation, etc.)
        stack = ""                  // Optional: custom stack trace
    ){
        super(message);
        // Calls parent (Error) constructor
        // This sets the basic error message internally

        this.statusCode = statusCode;
        // Stores HTTP status code for API response

        this.data = null;
        // Usually errors don’t return data → so set to null

        this.message = message;
        // Explicitly storing message (optional, but common practice)

        this.success = false;
        // Every error response is always false

        this.errors = errors;
        // Stores extra error details (like validation errors, multiple issues, etc.)

        if (stack) {
            // If a custom stack trace is provided
            this.stack = stack;
        } else {
            // Otherwise, capture stack trace automatically
            // This shows where the error occurred in your code
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };