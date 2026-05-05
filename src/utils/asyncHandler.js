const asyncHandler = (requestHandler) => {
    // This is a higher-order function
    // It takes your route handler function (requestHandler) as input

    return (req, res, next) => {
        // This returned function is the actual middleware
        // Express will call THIS function when a request comes

        // Call your original function (requestHandler)
        // It may be async, so it might return a Promise
        const result = requestHandler(req, res, next);

        // Wrap the result inside Promise.resolve()
        // This ensures:
        // - If result is already a Promise → keep it as is
        // - If it's a normal function → convert it into a Promise
        Promise
            .resolve(result)

            // If everything works fine (no error)
            .then(() => {
                // Nothing to do here
                // Your response (res.send / res.json) is already handled inside requestHandler
            })

            // If any error happens (async error / rejected promise)
            .catch((err) => {
                // Pass the error to Express error handling middleware
                // next(err) tells Express:
                // "An error occurred, skip normal flow and go to error handler"
                next(err);
            });
    };
};

export { asyncHandler };