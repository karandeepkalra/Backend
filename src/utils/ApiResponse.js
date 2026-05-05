class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        // statusCode → HTTP status code (200, 201, 400, 500, etc.)
        this.statusCode = statusCode;

        // data → actual response data you want to send (user, list, object, etc.)
        this.data = data;

        // message → optional message (default = "Success" if not provided)
        this.message = message;

        // success → boolean flag
        // If statusCode < 400 → success = true
        // If statusCode >= 400 → success = false
        this.success = statusCode < 400;
    }
}

export { ApiResponse };