/**
 * Middleware to render a view with success and error messages from flash.
 *
 * This middleware retrieves any success or error messages stored in the session using `req.flash()`
 * and passes them to the rendered view. If there are no messages, empty arrays are passed.
 * The function is designed to be used for rendering pages after handling form submissions or other actions.
 *
 * @param {string} view - The name of the view to render.
 * @returns {Function} A middleware function that handles the request and response.
 *
 * @example
 * app.get('/somepage', renderFlashMiddleware('somepage'));
 */
const renderFlashMiddleware = (view) => {
  return (req, res) => {
    const successMessages = req.flash("success");
    const errorMessages = req.flash("error");
    res.render(view, {
      success: successMessages || [],
      error: errorMessages || [],
    });
  };
};

module.exports = renderFlashMiddleware;
