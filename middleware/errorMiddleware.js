const errorMiddleWare = (error, req, res, __) => {
  console.error(error.message);
  req.flash("error", `An error occured ${error.message}`);
  res.status(500);
  // might Redirect to a dedicated error page later on
  // res.redirect("/error")
};

module.exports = errorMiddleWare;
